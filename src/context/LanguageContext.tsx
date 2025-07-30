import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translations
const translations = {
  id: {
    // Header
    'app.title': 'UMKM Mate',
    'app.subtitle': 'Platform Peluang Ekspor AI',
    'language.switch': 'Switch Language',
    
    // HomePage
    'home.hero.title': 'Buka Pasar Global untuk',
    'home.hero.title.highlight': 'Produk Lokal Anda',
    'home.hero.subtitle': 'Temukan peluang ekspor yang didukung AI. Dapatkan wawasan personal, tren pasar, dan regulasi untuk produk unik Anda.',
    'home.search.placeholder': 'Masukkan nama produk yang ingin diekspor...',
    'home.search.button': 'Jelajahi Peluang',
    'home.search.button.loading': 'Menganalisis...',
    'home.suggestions.title': 'Saran Produk:',
    'home.suggestions.loading': 'Mencari saran...',
    'home.suggestions.empty': 'Tidak ada saran tersedia',
    'home.features.destinations.title': 'Destinasi Ekspor',
    'home.features.destinations.desc': 'Temukan negara dan pasar terbaik untuk produk Anda',
    'home.features.trends.title': 'Tren Pasar',
    'home.features.trends.desc': 'Akses tren impor real-time dan pola permintaan',
    'home.features.compliance.title': 'Panduan Kepatuhan',
    'home.features.compliance.desc': 'Dapatkan regulasi dan standar produk yang detail',
    
    // ResultsPage
    'results.title': 'Peluang Ekspor untuk',
    'results.subtitle': 'Wawasan berbasis AI untuk membantu Anda sukses di pasar global',
    'results.insights.title': 'Wawasan Pasar AI',
    'results.destinations.title': 'Destinasi Ekspor yang Direkomendasikan',
    'results.destinations.demand': 'Permintaan',
    'results.destinations.growth': 'Pertumbuhan',
    'results.destinations.marketSize': 'Ukuran Pasar',
    'results.destinations.barriers': 'Hambatan Masuk',
    'results.trends.title': 'Tren Impor Global',
    'results.trends.importGrowth': 'Pertumbuhan Impor',
    'results.trends.insight': 'Wawasan Pasar',
    'results.trends.insight.text': 'Analisis AI menunjukkan peluang menjanjikan untuk {product} di pasar global dengan tren permintaan yang kuat.',
    'results.regulations.title': 'Regulasi Spesifik Negara',
    'results.regulations.documents': 'Dokumen yang Diperlukan',
    'results.regulations.processingTime': 'Waktu Pemrosesan',
    'results.regulations.cost': 'Biaya Perkiraan',
    'results.action.title': 'Siap Memulai Ekspor?',
    'results.action.subtitle': 'Konsultan ekspor kami dapat membantu Anda menavigasi kompleksitas perdagangan internasional dan memaksimalkan kesuksesan Anda.',
    'results.action.button': 'Cari Produk Lain',
    'results.back.button': 'Kembali ke Pencarian',
    
    // Loading
    'loading.analyzing': 'Menganalisis peluang ekspor untuk {product}...',
    'loading.suggestions': 'Mendapatkan saran AI...',
    
    // Error
    'error.analysis.failed': 'Analisis Gagal',
    'error.no.analysis': 'Tidak Ada Analisis Tersedia',
    'error.no.analysis.desc': 'Silakan cari produk untuk memulai.',
    'error.try.again': 'Coba Lagi',
    'error.go.search': 'Pergi ke Pencarian',
    
    // AI Service
    'ai.insights.base': 'Berdasarkan analisis pasar, {product} menunjukkan potensi ekspor yang kuat dengan permintaan yang tumbuh di pasar utama. Fokus pada standar kualitas dan dokumentasi yang tepat untuk keberhasilan masuk pasar.',
    'ai.market.insights': 'Analisis pasar untuk {product} di {country} menunjukkan peluang menjanjikan. Fokus pada standar kualitas dan dokumentasi yang tepat untuk keberhasilan masuk pasar.',
    
    // Demand levels
    'demand.very.high': 'Sangat Tinggi',
    'demand.high': 'Tinggi',
    'demand.medium': 'Sedang',
    'demand.low': 'Rendah',
    
    // Barrier levels
    'barriers.high': 'Tinggi',
    'barriers.medium': 'Sedang',
    'barriers.low': 'Rendah',
    
    // Competition levels
    'competition.high': 'Tinggi',
    'competition.medium': 'Sedang',
    'competition.low': 'Rendah',
  },
  en: {
    // Header
    'app.title': 'UMKM Mate',
    'app.subtitle': 'AI Export Opportunities Platform',
    'language.switch': 'Switch Language',
    
    // HomePage
    'home.hero.title': 'Unlock Global Markets for Your',
    'home.hero.title.highlight': 'Local Products',
    'home.hero.subtitle': 'Discover export opportunities powered by AI. Get personalized insights, market trends, and regulations for your unique products.',
    'home.search.placeholder': 'Enter the name of the product you want to export...',
    'home.search.button': 'Explore Opportunities',
    'home.search.button.loading': 'Analyzing...',
    'home.suggestions.title': 'Product Suggestions:',
    'home.suggestions.loading': 'Finding suggestions...',
    'home.suggestions.empty': 'No suggestions available',
    'home.features.destinations.title': 'Export Destinations',
    'home.features.destinations.desc': 'Discover the best countries and markets for your products',
    'home.features.trends.title': 'Market Trends',
    'home.features.trends.desc': 'Access real-time import trends and demand patterns',
    'home.features.compliance.title': 'Compliance Guide',
    'home.features.compliance.desc': 'Get detailed regulations and product standards',
    
    // ResultsPage
    'results.title': 'Export Opportunities for',
    'results.subtitle': 'AI-powered insights to help you succeed in global markets',
    'results.insights.title': 'AI Market Insights',
    'results.destinations.title': 'Recommended Export Destinations',
    'results.destinations.demand': 'Demand',
    'results.destinations.growth': 'Growth',
    'results.destinations.marketSize': 'Market Size',
    'results.destinations.barriers': 'Entry Barriers',
    'results.trends.title': 'Global Import Trends',
    'results.trends.importGrowth': 'Import Growth',
    'results.trends.insight': 'Market Insight',
    'results.trends.insight.text': 'AI analysis shows promising opportunities for {product} in global markets with strong demand trends.',
    'results.regulations.title': 'Country-Specific Regulations',
    'results.regulations.documents': 'Required Documents',
    'results.regulations.processingTime': 'Processing Time',
    'results.regulations.cost': 'Est. Cost',
    'results.action.title': 'Ready to Start Exporting?',
    'results.action.subtitle': 'Our export consultants can help you navigate the complexities of international trade and maximize your success.',
    'results.action.button': 'Search Another Product',
    'results.back.button': 'Back to Search',
    
    // Loading
    'loading.analyzing': 'Analyzing export opportunities for {product}...',
    'loading.suggestions': 'Getting AI suggestions...',
    
    // Error
    'error.analysis.failed': 'Analysis Failed',
    'error.no.analysis': 'No Analysis Available',
    'error.no.analysis.desc': 'Please search for a product to get started.',
    'error.try.again': 'Try Again',
    'error.go.search': 'Go to Search',
    
    // AI Service
    'ai.insights.base': 'Based on market analysis, {product} shows strong export potential with growing demand in key markets. Focus on quality standards and proper documentation for successful market entry.',
    'ai.market.insights': 'Market analysis for {product} in {country} shows promising opportunities. Focus on quality standards and proper documentation for successful market entry.',
    
    // Demand levels
    'demand.very.high': 'Very High',
    'demand.high': 'High',
    'demand.medium': 'Medium',
    'demand.low': 'Low',
    
    // Barrier levels
    'barriers.high': 'High',
    'barriers.medium': 'Medium',
    'barriers.low': 'Low',
    
    // Competition levels
    'competition.high': 'High',
    'competition.medium': 'Medium',
    'competition.low': 'Low',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: string, params?: Record<string, string>): string => {
    const translation = (translations[language] as Record<string, string>)[key] || key;
    
    if (params) {
      return Object.entries(params).reduce((text, [param, value]) => {
        return text.replace(`{${param}}`, value);
      }, translation);
    }
    
    return translation;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 