import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, Award, Sparkles, Loader2, TrendingUp } from 'lucide-react';
import CustomIcon from './CustomIcon';
import { useAI } from '../context/AIContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import AIService from '../services/aiService';
import Footer from './Footer';

const HomePage = () => {
  const [product, setProduct] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const navigate = useNavigate();
  const { analyzeProduct, isLoading, analysis } = useAI();
  const { t, language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product.trim()) {
      await analyzeProduct(product.trim(), language);
      navigate('/results', { state: { product: product.trim() } });
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    // Langsung analisis suggestion tanpa mengisi input
    await analyzeProduct(suggestion, language);
    navigate('/results', { state: { product: suggestion } });
  };

  const getAISuggestions = async (input: string) => {
    if (input.length < 2) return;

    setIsLoadingSuggestions(true);
    try {
      const aiService = AIService.getInstance();
      const suggestions = await aiService.getProductSuggestions(input, language);
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error getting suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (product.trim()) {
        getAISuggestions(product.trim());
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [product]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-mint-500 to-sky-500 p-1 rounded-xl">
                <CustomIcon className="w-6 h-6" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-mint-600 to-sky-600 bg-clip-text text-transparent">
                  {t('app.title')}
                </h1>
                <p className="text-sm text-gray-600">{t('app.subtitle')}</p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full text-center animate-slide-up">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="mb-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-24 h-24 text-mint-200 animate-pulse-soft" />
              </div>
              <div className="relative bg-gradient-to-r from-mint-500 to-sky-500  rounded-xl mx-auto w-32 h-32 flex items-center justify-center animate-float">
                <CustomIcon className="w-16 h-16" size={98} />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              {t('home.hero.title')}
              <span className="bg-gradient-to-r from-mint-500 to-sky-500 bg-clip-text text-transparent"> {t('home.hero.title.highlight')}</span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            {/* Desktop version - button inside input */}
            <div className="relative group hidden sm:block">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-6 h-6 text-gray-400 group-focus-within:text-mint-500 transition-colors" />
              </div>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder={t('home.search.placeholder')}
                className="w-full pl-14 pr-32 py-6 text-lg border-2 border-gray-200 rounded-2xl focus:border-mint-500 focus:ring-4 focus:ring-mint-100 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl"
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-2 bottom-2 px-8 bg-gradient-to-r from-mint-500 to-sky-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-sky-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t('tunggu sebentar ...')}</span>
                  </>
                ) : (
                  <span>{t('home.search.button')}</span>
                )}
              </button>
            </div>

            {/* Mobile version - button below input */}
            <div className="block sm:hidden">
              <div className="relative group mb-4">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400 group-focus-within:text-mint-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder={t('home.search.placeholder')}
                  className="w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:border-mint-500 focus:ring-4 focus:ring-mint-100 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl"
                  required
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-mint-500 to-sky-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-sky-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t('tunggu sebentar ...')}</span>
                  </>
                ) : (
                  <span>{t('home.search.button')}</span>
                )}
              </button>
            </div>
          </form>

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <div className="mb-8">
              <p className="text-gray-500 mb-4 flex items-center justify-center">
                <Sparkles className="w-4 h-4 mr-2 text-mint-500" />
                {t('home.suggestions.title')}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    disabled={isLoading}
                    className="px-4 py-2 bg-gradient-to-r from-mint-50 to-sky-50 border border-mint-200 rounded-full text-mint-700 hover:border-mint-400 hover:from-mint-100 hover:to-sky-100 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading Suggestions */}
          {isLoadingSuggestions && (
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-2 text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">{t('loading.suggestions')}</span>
              </div>
            </div>
          )}

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-r from-mint-500 to-mint-400 p-3 rounded-xl w-fit mb-4 mx-auto">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{t('home.features.destinations.title')}</h3>
              <p className="text-gray-600 text-sm">{t('home.features.destinations.desc')}</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">

              <div className="bg-gradient-to-r from-sky-500 to-sky-400 p-3 rounded-xl w-fit mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>

              <h3 className="font-semibold text-gray-800 mb-2">{t('home.features.trends.title')}</h3>
              <p className="text-gray-600 text-sm">{t('home.features.trends.desc')}</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-r from-mint-500 to-sky-500 p-3 rounded-xl w-fit mb-4 mx-auto">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{t('home.features.compliance.title')}</h3>
              <p className="text-gray-600 text-sm">{t('home.features.compliance.desc')}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;