import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export interface ExportAnalysis {
  destinations: ExportDestination[];
  trends: MarketTrend[];
  regulations: Regulation[];
  insights: string;
}

export interface ExportDestination {
  country: string;
  flag: string;
  demand: 'Very High' | 'High' | 'Medium' | 'Low';
  growth: string;
  marketSize: string;
  competition: 'High' | 'Medium' | 'Low';
  barriers: 'High' | 'Medium' | 'Low';
  reasoning: string;
}

export interface MarketTrend {
  period: string;
  value: number;
  change: string;
  description: string;
}

export interface Regulation {
  country: string;
  requirements: string[];
  timeline: string;
  cost: string;
  notes: string;
}

// Fallback data when AI is not available
const getFallbackData = (product: string, language: 'id' | 'en'): ExportAnalysis => {
  const isIndonesian = language === 'id';
  
  return {
    destinations: [
      {
        country: 'United States',
        flag: '🇺🇸',
        demand: 'High',
        growth: '+15.2%',
        marketSize: '$2.1B',
        competition: 'Medium',
        barriers: 'Low',
        reasoning: isIndonesian 
          ? 'Permintaan kuat untuk produk Indonesia, hubungan perdagangan yang menguntungkan'
          : 'Strong demand for Indonesian products, favorable trade relations'
      },
      {
        country: 'Germany',
        flag: '🇩🇪',
        demand: 'Very High',
        growth: '+22.8%',
        marketSize: '$1.8B',
        competition: 'High',
        barriers: 'Medium',
        reasoning: isIndonesian
          ? 'Pasar premium dengan standar kualitas tinggi, cocok untuk produk kerajinan'
          : 'Premium market with high quality standards, good for artisanal products'
      },
      {
        country: 'Japan',
        flag: '🇯🇵',
        demand: 'High',
        growth: '+18.5%',
        marketSize: '$1.3B',
        competition: 'Medium',
        barriers: 'High',
        reasoning: isIndonesian
          ? 'Apresiasi terhadap kerajinan tradisional dan produk budaya yang unik'
          : 'Appreciation for traditional craftsmanship and unique cultural products'
      }
    ],
    trends: [
      {
        period: 'Q4 2024',
        value: 85,
        change: '+12%',
        description: isIndonesian ? 'Permintaan musim liburan yang kuat' : 'Strong holiday season demand'
      },
      {
        period: 'Q3 2024',
        value: 76,
        change: '+8%',
        description: isIndonesian ? 'Pertumbuhan perdagangan internasional yang stabil' : 'Steady growth in international trade'
      },
      {
        period: 'Q2 2024',
        value: 70,
        change: '+5%',
        description: isIndonesian ? 'Pemulihan dari fluktuasi musiman' : 'Recovery from seasonal fluctuations'
      }
    ],
    regulations: [
      {
        country: 'United States',
        requirements: isIndonesian 
          ? ['Registrasi FDA', 'Pelabelan Produk', 'Standar Keamanan']
          : ['FDA Registration', 'Product Labeling', 'Safety Standards'],
        timeline: '4-6 weeks',
        cost: '$500-1,200',
        notes: isIndonesian 
          ? 'Fokus pada keamanan pangan dan persyaratan pelabelan'
          : 'Focus on food safety and labeling requirements'
      },
      {
        country: 'Germany',
        requirements: isIndonesian
          ? ['Sertifikasi CE', 'Kepatuhan REACH', 'Lisensi Impor']
          : ['CE Marking', 'REACH Compliance', 'Import License'],
        timeline: '6-8 weeks',
        cost: '$800-2,000',
        notes: isIndonesian
          ? 'Standar kualitas ketat dan kepatuhan lingkungan'
          : 'Strict quality standards and environmental compliance'
      }
    ],
    insights: isIndonesian
      ? `Berdasarkan analisis pasar, ${product} menunjukkan potensi ekspor yang kuat dengan permintaan yang tumbuh di pasar utama. Fokus pada standar kualitas dan dokumentasi yang tepat untuk keberhasilan masuk pasar.`
      : `Based on market analysis, ${product} shows strong export potential with growing demand in key markets. Focus on quality standards and proper documentation for successful market entry.`
  };
};

// Helper function to extract JSON from markdown code blocks
const extractJSONFromMarkdown = (text: string): string | null => {
  // Try to find JSON in markdown code blocks first
  const codeBlockMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\}|\[[\s\S]*?\])\s*```/);
  if (codeBlockMatch) {
    return codeBlockMatch[1];
  }
  
  // If no code block, try to find JSON directly
  const jsonMatch = text.match(/(\{[\s\S]*?\}|\[[\s\S]*?\])/);
  if (jsonMatch) {
    return jsonMatch[1];
  }
  
  return null;
};

export class AIService {
  private static instance: AIService;
  private model: any;
  private useFallback: boolean = false;

  private constructor() {
    try {
      // Use the latest model name - gemini-2.0-flash
      this.model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    } catch (error) {
      console.warn('AI model not available, using fallback data');
      this.useFallback = true;
    }
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async analyzeExportOpportunities(product: string, language: 'id' | 'en' = 'en'): Promise<ExportAnalysis> {
    // If fallback is enabled, return fallback data
    if (this.useFallback) {
      return getFallbackData(product, language);
    }

    const isIndonesian = language === 'id';
    
    try {
      const prompt = isIndonesian ? `
        Analisis peluang ekspor untuk "${product}" dan berikan wawasan detail dalam format JSON berikut:
        
        {
          "destinations": [
            {
              "country": "Nama Negara",
              "flag": "Emoji Bendera Negara",
              "demand": "Sangat Tinggi/Tinggi/Sedang/Rendah",
              "growth": "Persentase pertumbuhan seperti +15.2%",
              "marketSize": "Ukuran pasar seperti $2.1B",
              "competition": "Tinggi/Sedang/Rendah",
              "barriers": "Tinggi/Sedang/Rendah",
              "reasoning": "Penjelasan singkat untuk rekomendasi ini"
            }
          ],
          "trends": [
            {
              "period": "Periode waktu seperti Q4 2024",
              "value": 85,
              "change": "Persentase perubahan seperti +12%",
              "description": "Deskripsi tren singkat"
            }
          ],
          "regulations": [
            {
              "country": "Nama Negara",
              "requirements": ["Persyaratan 1", "Persyaratan 2"],
              "timeline": "Waktu pemrosesan seperti 4-6 minggu",
              "cost": "Biaya perkiraan seperti $500-1,200",
              "notes": "Catatan tambahan tentang regulasi"
            }
          ],
          "insights": "Wawasan pasar secara keseluruhan dan rekomendasi untuk produk ini"
        }
        
        Fokus pada:
        1. 3 destinasi ekspor paling menjanjikan
        2. Tren pasar dan pola permintaan saat ini
        3. Persyaratan regulasi utama untuk setiap destinasi
        4. Wawasan praktis untuk UMKM Indonesia
        
        Berikan analisis yang realistis dan berbasis data yang cocok untuk usaha kecil dan menengah.
        Kembalikan hanya JSON yang valid tanpa teks tambahan atau format markdown.
      ` : `
        Analyze export opportunities for "${product}" and provide detailed insights in the following JSON format:
        
        {
          "destinations": [
            {
              "country": "Country Name",
              "flag": "Country Flag Emoji",
              "demand": "Very High/High/Medium/Low",
              "growth": "Growth percentage like +15.2%",
              "marketSize": "Market size like $2.1B",
              "competition": "High/Medium/Low",
              "barriers": "High/Medium/Low",
              "reasoning": "Brief explanation for this recommendation"
            }
          ],
          "trends": [
            {
              "period": "Time period like Q4 2024",
              "value": 85,
              "change": "Change percentage like +12%",
              "description": "Brief trend description"
            }
          ],
          "regulations": [
            {
              "country": "Country Name",
              "requirements": ["Requirement 1", "Requirement 2"],
              "timeline": "Processing time like 4-6 weeks",
              "cost": "Estimated cost like $500-1,200",
              "notes": "Additional notes about regulations"
            }
          ],
          "insights": "Overall market insights and recommendations for this product"
        }
        
        Focus on:
        1. Top 3 most promising export destinations
        2. Current market trends and demand patterns
        3. Key regulatory requirements for each destination
        4. Practical insights for Indonesian SMEs
        
        Provide realistic, data-driven analysis suitable for small to medium enterprises.
        Return only valid JSON without any additional text or markdown formatting.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response (handling markdown code blocks)
      const jsonString = extractJSONFromMarkdown(text);
      if (!jsonString) {
        throw new Error('Invalid AI response format - no JSON found');
      }
      
      try {
        const analysis = JSON.parse(jsonString);
        return analysis as ExportAnalysis;
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Raw response:', text);
        throw new Error('Invalid JSON response from AI');
      }
      
    } catch (error: any) {
      console.error('AI Analysis Error:', error);
      
      // Handle specific API errors
      if (error.message?.includes('models/gemini')) {
        console.warn('AI model not available, using fallback data');
        return getFallbackData(product, language);
      }
      
      if (error.message?.includes('API key')) {
        throw new Error('Invalid API key. Please check your configuration.');
      }
      
      if (error.message?.includes('quota')) {
        throw new Error('API quota exceeded. Please try again later.');
      }
      
      // If any other error, use fallback data
      console.warn('Using fallback data due to AI error');
      return getFallbackData(product, language);
    }
  }

  async getProductSuggestions(product: string, language: 'id' | 'en' = 'en'): Promise<string[]> {
    // If fallback is enabled, return basic suggestions
    if (this.useFallback) {
      return [
        `${product} premium`,
        `${product} organic`,
        `${product} handmade`,
        `${product} traditional`,
        `${product} modern`
      ];
    }

    const isIndonesian = language === 'id';
    
    try {
      const prompt = isIndonesian ? `
        Berdasarkan produk "${product}", sarankan 3-5 produk terkait atau variasi yang mungkin memiliki potensi ekspor yang baik.
        Kembalikan hanya array JSON string, seperti: ["produk 1", "produk 2", "produk 3"]
        
        Fokus pada:
        - Produk serupa dengan bahan atau gaya yang berbeda
        - Produk komplementer
        - Produk yang mungkin menarik untuk pasar yang sama
        - Produk tradisional Indonesia yang bisa dimodernisasi
        
        Kembalikan hanya array JSON yang valid tanpa teks tambahan atau format markdown.
      ` : `
        Based on the product "${product}", suggest 3-5 related products or variations that might have good export potential. 
        Return only a JSON array of strings, like: ["product 1", "product 2", "product 3"]
        
        Focus on:
        - Similar products with different materials or styles
        - Complementary products
        - Products that might appeal to the same markets
        - Traditional Indonesian products that could be modernized
        
        Return only valid JSON array without any additional text or markdown formatting.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response (handling markdown code blocks)
      const jsonString = extractJSONFromMarkdown(text);
      if (!jsonString) {
        return [];
      }
      
      try {
        return JSON.parse(jsonString);
      } catch (parseError) {
        console.error('JSON Parse Error for suggestions:', parseError);
        console.error('Raw response:', text);
        return [];
      }
      
    } catch (error: any) {
      console.error('Product Suggestions Error:', error);
      return [
        `${product} premium`,
        `${product} organic`,
        `${product} handmade`,
        `${product} traditional`,
        `${product} modern`
      ];
    }
  }

  async getMarketInsights(product: string, country: string, language: 'id' | 'en' = 'en'): Promise<string> {
    // If fallback is enabled, return basic insights
    if (this.useFallback) {
      const isIndonesian = language === 'id';
      return isIndonesian
        ? `Analisis pasar untuk ${product} di ${country} menunjukkan peluang menjanjikan. Fokus pada standar kualitas dan dokumentasi yang tepat untuk keberhasilan masuk pasar.`
        : `Market analysis for ${product} in ${country} shows promising opportunities. Focus on quality standards and proper documentation for successful market entry.`;
    }

    const isIndonesian = language === 'id';
    
    try {
      const prompt = isIndonesian ? `
        Berikan wawasan pasar spesifik untuk mengekspor "${product}" ke ${country}.
        Sertakan:
        - Tren permintaan saat ini
        - Pesaing utama
        - Strategi penetapan harga
        - Peluang pemasaran
        - Tantangan potensial
        
        Buat ringkas namun informatif untuk UMKM Indonesia.
      ` : `
        Provide specific market insights for exporting "${product}" to ${country}. 
        Include:
        - Current demand trends
        - Key competitors
        - Pricing strategies
        - Marketing opportunities
        - Potential challenges
        
        Keep it concise but informative for Indonesian SMEs.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
      
    } catch (error: any) {
      console.error('Market Insights Error:', error);
      const isIndonesian = language === 'id';
      return isIndonesian
        ? `Analisis pasar untuk ${product} di ${country} menunjukkan peluang menjanjikan. Fokus pada standar kualitas dan dokumentasi yang tepat untuk keberhasilan masuk pasar.`
        : `Market analysis for ${product} in ${country} shows promising opportunities. Focus on quality standards and proper documentation for successful market entry.`;
    }
  }
}

export default AIService; 