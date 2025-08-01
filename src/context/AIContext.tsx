import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AIService } from '../services/aiService';
import { ExportAnalysis } from '../services/aiService';

interface AIContextType {
  isLoading: boolean;
  error: string | null;
  analysis: ExportAnalysis | null;
  analyzeProduct: (product: string, language: 'id' | 'en') => Promise<void>;
  clearAnalysis: () => void;
  chatWithAI: (message: string, language: 'id' | 'en') => Promise<string>;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

interface AIProviderProps {
  children: ReactNode;
}

export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ExportAnalysis | null>(null);

  const analyzeProduct = async (product: string, language: 'id' | 'en') => {
    console.log('analyzeProduct called with:', product, language);
    setIsLoading(true);
    setError(null);
    
    try {
      const aiService = AIService.getInstance();
      const result = await aiService.analyzeExportOpportunities(product, language);
      setAnalysis(result);
      console.log('Analysis completed:', result);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Terjadi kesalahan saat menganalisis produk');
    } finally {
      setIsLoading(false);
    }
  };

  const clearAnalysis = () => {
    console.log('clearAnalysis called');
    setAnalysis(null);
    setError(null);
  };

  const chatWithAI = async (message: string, language: 'id' | 'en'): Promise<string> => {
    try {
      const aiService = AIService.getInstance();
      const response = await aiService.chatWithAI(message, language);
      return response;
    } catch (err: any) {
      console.error('Chat error:', err);
      throw new Error(err.message || 'Terjadi kesalahan saat chat dengan AI');
    }
  };

  return (
    <AIContext.Provider value={{ isLoading, error, analysis, analyzeProduct, clearAnalysis, chatWithAI }}>
      {children}
    </AIContext.Provider>
  );
}; 