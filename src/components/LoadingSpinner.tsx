import React from 'react';
import { Loader2, Globe, Award } from 'lucide-react';
import CustomIcon from './CustomIcon';
import { useLanguage } from '../context/LanguageContext';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message 
}) => {
  const { t } = useLanguage();
  const defaultMessage = t('loading.analyzing', { product: 'your product' });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-mint-50">
      <div className="text-center animate-slide-up">
        {/* Animated Icons */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-r from-mint-200 to-sky-200 rounded-full animate-pulse-soft opacity-50"></div>
          </div>
          <div className="relative flex items-center justify-center space-x-4">
            <div className="bg-gradient-to-r from-mint-500 to-mint-400 p-4 rounded-xl animate-bounce">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-sky-500 to-sky-400 p-4 rounded-xl animate-bounce" style={{ animationDelay: '0.2s' }}>
              <CustomIcon className="w-8 h-8" size={32} />
            </div>
            <div className="bg-gradient-to-r from-mint-500 to-sky-500 p-4 rounded-xl animate-bounce" style={{ animationDelay: '0.4s' }}>
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            AI Analysis in Progress
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            {message || defaultMessage}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto mb-6">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-mint-500 to-sky-500 h-2 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading Steps */}
        <div className="space-y-3 text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-mint-500 rounded-full animate-pulse"></div>
            <span>Analyzing market trends...</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span>Identifying export destinations...</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-mint-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span>Checking regulations...</span>
          </div>
        </div>

        {/* Spinner */}
        <div className="mt-8">
          <Loader2 className="w-8 h-8 text-mint-500 animate-spin mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 