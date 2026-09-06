package com.example.dto;

/** Optional external model result. The API key and raw provider response stay server-side. */
public record SecondOpinionDTO(
        String provider,
        boolean available,
        String diagnosis,
        double confidence,
        boolean agreesWithLocal) {
}