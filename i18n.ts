export const translations = {
  en: {
    appName: 'BloomX',
    tagline: 'Visualizing Global Plant Blooming Events',
    hero: {
      title: 'Discover the Beauty of Global Blooms',
      subtitle: 'Powered by NASA Earth Observation Data & Citizen Science',
      cta: 'Explore Blooms',
    },
    nav: {
      globe: 'Global View',
      bangladesh: 'Bangladesh',
      timeline: 'Timeline',
      game: 'Predict & Play',
      data: 'Datasets',
      contribute: 'Contribute',
    },
    globe: {
      title: 'Interactive Global Bloom Map',
      description: 'Explore real-time and historical bloom events worldwide',
    },
    bangladesh: {
      title: 'Bangladesh Bloom Intensity',
      description: 'District-level phenology and agricultural insights',
    },
    timeline: {
      title: 'Seasonal Bloom Progression',
      description: 'Animated journey through blooming seasons',
    },
    game: {
      title: 'Predict the Bloom',
      description: 'Test your knowledge and compete globally',
      leaderboard: 'Leaderboard',
      yourScore: 'Your Score',
      predict: 'Make Prediction',
    },
    data: {
      title: 'NASA Earth Observation Data',
      modis: 'MODIS',
      landsat: 'Landsat 8/9',
      viirs: 'VIIRS',
      sentinel: 'Sentinel-2',
    },
    contribute: {
      title: 'Citizen Science Portal',
      upload: 'Upload Observation',
      species: 'Species Name',
      location: 'Location',
      date: 'Observation Date',
      intensity: 'Bloom Intensity',
      photo: 'Photo',
      submit: 'Submit Observation',
    },
  },
  bn: {
    appName: 'ব্লুমএক্স',
    tagline: 'বৈশ্বিক উদ্ভিদ ফুল ফোটা ঘটনা কল্পনা',
    hero: {
      title: 'বৈশ্বিক ফুলের সৌন্দর্য আবিষ্কার করুন',
      subtitle: 'নাসা আর্থ অবজারভেশন ডেটা এবং নাগরিক বিজ্ঞান দ্বারা চালিত',
      cta: 'ফুল অন্বেষণ করুন',
    },
    nav: {
      globe: 'বৈশ্বিক দৃশ্য',
      bangladesh: 'বাংলাদেশ',
      timeline: 'সময়রেখা',
      game: 'পূর্বাভাস এবং খেলুন',
      data: 'ডেটাসেট',
      contribute: 'অবদান রাখুন',
    },
    globe: {
      title: 'ইন্টারঅ্যাক্টিভ গ্লোবাল ব্লুম ম্যাপ',
      description: 'বিশ্বব্যাপী রিয়েল-টাইম এবং ঐতিহাসিক ফুল ফোটা ইভেন্ট অন্বেষণ করুন',
    },
    bangladesh: {
      title: 'বাংলাদেশ ব্লুম তীব্রতা',
      description: 'জেলা স্তরের ফেনোলজি এবং কৃষি অন্তর্দৃষ্টি',
    },
    timeline: {
      title: 'মৌসুমী ফুল অগ্রগতি',
      description: 'ফুল ফোটার ঋতুর মাধ্যমে অ্যানিমেটেড যাত্রা',
    },
    game: {
      title: 'ফুল ফোটার পূর্বাভাস দিন',
      description: 'আপনার জ্ঞান পরীক্ষা করুন এবং বিশ্বব্যাপী প্রতিযোগিতা করুন',
      leaderboard: 'লিডারবোর্ড',
      yourScore: 'আপনার স্কোর',
      predict: 'পূর্বাভাস করুন',
    },
    data: {
      title: 'নাসা আর্থ অবজারভেশন ডেটা',
      modis: 'মোডিস',
      landsat: 'ল্যান্ডস্যাট ৮/৯',
      viirs: 'ভিআইআইআরএস',
      sentinel: 'সেন্টিনেল-২',
    },
    contribute: {
      title: 'নাগরিক বিজ্ঞান পোর্টাল',
      upload: 'পর্যবেক্ষণ আপলোড করুন',
      species: 'প্রজাতির নাম',
      location: 'অবস্থান',
      date: 'পর্যবেক্ষণের তারিখ',
      intensity: 'ফুলের তীব্রতা',
      photo: 'ছবি',
      submit: 'পর্যবেক্ষণ জমা দিন',
    },
  },
};

export type Language = 'en' | 'bn';
export type TranslationKey = keyof typeof translations.en;