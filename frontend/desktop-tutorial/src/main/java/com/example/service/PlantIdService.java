package com.example.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/** Optional Plant.id second opinion. It fails open to the local model. */
@Service
public class PlantIdService {

    private static final Logger LOGGER = LoggerFactory.getLogger(PlantIdService.class);
    private final RestClient client;
    private final String apiKey;

    public PlantIdService(RestClient.Builder builder,
                          @Value("${plant.id.api-key:}") String apiKey,
                          @Value("${plant.id.base-url:https://api.plant.id/v3}") String baseUrl) {
        this.apiKey = apiKey == null ? "" : apiKey.trim();
        this.client = builder.baseUrl(baseUrl).build();
    }

    public Optional<PlantIdOpinion> assess(MultipartFile image) {
        if (apiKey.isBlank()) return Optional.empty();
        try {
            String contentType = image.getContentType() == null ? MediaType.IMAGE_JPEG_VALUE : image.getContentType();
            String imageData = "data:" + contentType + ";base64," + Base64.getEncoder().encodeToString(image.getBytes());
            Map<String, Object> request = Map.of(
                    "images", List.of(imageData),
                    "similar_images", false);
            Map<?, ?> response = client.post()
                    .uri("/health_assessment")
                    .header("Api-Key", apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(request)
                    .retrieve()
                    .body(Map.class);
            return parseOpinion(response);
        } catch (IOException | RestClientException exception) {
            LOGGER.warn("Plant.id second opinion unavailable: {}", exception.getMessage());
            return Optional.empty();
        }
    }

    private Optional<PlantIdOpinion> parseOpinion(Map<?, ?> response) {
        if (response == null) return Optional.empty();
        Object resultValue = response.get("result");
        if (!(resultValue instanceof Map<?, ?> result)) return Optional.empty();
        Object diseaseValue = result.get("disease");
        if (!(diseaseValue instanceof Map<?, ?> disease)) return Optional.empty();
        Object suggestionsValue = disease.get("suggestions");
        if (!(suggestionsValue instanceof List<?> suggestions)) return Optional.empty();
        for (Object item : suggestions) {
            if (!(item instanceof Map<?, ?> suggestion)) continue;
            Object name = suggestion.get("name");
            Object probability = suggestion.get("probability");
            if (name instanceof String diagnosis && probability instanceof Number score) {
                return Optional.of(new PlantIdOpinion(diagnosis, Math.max(0.0, Math.min(1.0, score.doubleValue()))));
            }
        }
        return Optional.empty();
    }

    public record PlantIdOpinion(String diagnosis, double confidence) {
    }
}