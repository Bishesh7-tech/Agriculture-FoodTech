const cropLabels = {
  Rice: { bn: 'ধান', hi: 'धान' }, Potato: { bn: 'আলু', hi: 'आलू' }, Jute: { bn: 'পাট', hi: 'जूट' },
  Mustard: { bn: 'সরষে', hi: 'सरसों' }, Tea: { bn: 'চা', hi: 'चाय' }, Tomato: { bn: 'টমেটো', hi: 'टमाटर' },
  Brinjal: { bn: 'বেগুন', hi: 'बैंगन' }, Chilli: { bn: 'লঙ্কা', hi: 'मिर्च' }, Mango: { bn: 'আম', hi: 'आम' },
  Wheat: { bn: 'গম', hi: 'गेहूं' }, Maize: { bn: 'ভুট্টা', hi: 'मक्का' },
};

const districtLabels = {
  Alipurduar: { bn: 'আলিপুরদুয়ার', hi: 'अलीपुरद्वार' }, Bankura: { bn: 'বাঁকুড়া', hi: 'बांकुड़ा' }, Birbhum: { bn: 'বীরভূম', hi: 'बीरभूम' },
  'Cooch Behar': { bn: 'কোচবিহার', hi: 'कूचबिहार' }, 'Dakshin Dinajpur': { bn: 'দক্ষিণ দিনাজপুর', hi: 'दक्षिण दिनाजपुर' }, Darjeeling: { bn: 'দার্জিলিং', hi: 'दार्जिलिंग' },
  Hooghly: { bn: 'হুগলি', hi: 'हुगली' }, Howrah: { bn: 'হাওড়া', hi: 'हावड़ा' }, Jalpaiguri: { bn: 'জলপাইগুড়ি', hi: 'जलपाईगुड़ी' }, Jhargram: { bn: 'ঝাড়গ্রাম', hi: 'झाड़ग्राम' },
  Kalimpong: { bn: 'কালিম্পং', hi: 'कालिम्पोंग' }, Kolkata: { bn: 'কলকাতা', hi: 'कोलकाता' }, Malda: { bn: 'মালদা', hi: 'मालदा' }, Murshidabad: { bn: 'মুর্শিদাবাদ', hi: 'मुर्शिदाबाद' },
  Nadia: { bn: 'নদিয়া', hi: 'नदिया' }, 'North 24 Parganas': { bn: 'উত্তর ২৪ পরগনা', hi: 'उत्तर 24 परगना' }, 'Paschim Bardhaman': { bn: 'পশ্চিম বর্ধমান', hi: 'पश्चिम बर्धमान' },
  'Paschim Medinipur': { bn: 'পশ্চিম মেদিনীপুর', hi: 'पश्चिम मेदिनीपुर' }, 'Purba Bardhaman': { bn: 'পূর্ব বর্ধমান', hi: 'पूर्व बर्धमान' }, 'Purba Medinipur': { bn: 'পূর্ব মেদিনীপুর', hi: 'पूर्व मेदिनीपुर' },
  Purulia: { bn: 'পুরুলিয়া', hi: 'पुरुलिया' }, 'South 24 Parganas': { bn: 'দক্ষিণ ২৪ পরগনা', hi: 'दक्षिण 24 परगना' }, 'Uttar Dinajpur': { bn: 'উত্তর দিনাজপুর', hi: 'उत्तर दिनाजपुर' },
};

export const localizedCrop = (value, language) => cropLabels[value]?.[language] || value;
export const localizedDistrict = (value, language) => districtLabels[value]?.[language] || value;
export const localizedStage = (value, language) => {
  const stages = {
    Seedling: { bn: 'চারা', hi: 'पौधा' }, Vegetative: { bn: 'বৃদ্ধি পর্যায়', hi: 'वानस्पतिक' }, Flowering: { bn: 'ফুল ধরা', hi: 'फूल आना' }, Fruiting: { bn: 'ফল ধরা', hi: 'फल लगना' },
    Harvest: { bn: 'ফসল কাটা', hi: 'कटाई' }, Tillering: { bn: 'কুশি উৎপাদন', hi: 'कल्ले निकलना' }, 'Grain Filling': { bn: 'দানা ভরা', hi: 'दाना भरना' },
    tasseling: { bn: 'মোচা আসা', hi: 'बालियाँ निकलना' }, 'grain-filling': { bn: 'দানা ভরা', hi: 'दाना भरना' }, maturity: { bn: 'পরিপক্কতা', hi: 'परिपक्वता' },
  };
  return stages[value]?.[language] || value;
};