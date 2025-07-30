import React from 'react';
import { Globe, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleToggle = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2 hover:bg-white hover:border-mint-300 transition-all duration-300 group"
      title={t('language.switch')}
    >
      <div className="relative">
        <Globe className="w-4 h-4 text-gray-600 group-hover:text-mint-600 transition-colors" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-mint-500 rounded-full animate-pulse"></div>
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-mint-700 transition-colors">
        {language === 'id' ? 'ID' : 'EN'}
      </span>
      <Languages className="w-3 h-3 text-gray-400 group-hover:text-mint-500 transition-colors" />
    </button>
  );
};

export default LanguageToggle; 