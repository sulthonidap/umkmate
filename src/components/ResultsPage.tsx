import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, FileText, Award, MapPin, DollarSign, Users, Calendar, AlertCircle } from 'lucide-react';
import CustomIcon from './CustomIcon';
import { useAI } from '../context/AIContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import LoadingSpinner from './LoadingSpinner';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysis, isLoading, error, analyzeProduct } = useAI();
  const { t, language } = useLanguage();
  const product = location.state?.product || 'your product';

  useEffect(() => {
    // Jika tidak ada analysis tapi ada product di state, lakukan analisis
    if (!analysis && location.state?.product) {
      const productFromState = location.state.product;
      analyzeProduct(productFromState, language);
    }
  }, [analysis, location.state?.product, analyzeProduct, language]);

  if (isLoading) {
    return <LoadingSpinner message={t('loading.analyzing', { product })} />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-mint-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 p-6 rounded-2xl mb-6">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-800 mb-2">{t('error.analysis.failed')}</h2>
            <p className="text-red-600">{error}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-mint-500 to-sky-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-mint-600 hover:to-sky-600 transition-all duration-300"
          >
            {t('error.try.again')}
          </button>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-mint-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('error.no.analysis')}</h2>
          <p className="text-gray-600 mb-6">{t('error.no.analysis.desc')}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-mint-500 to-sky-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-mint-600 hover:to-sky-600 transition-all duration-300"
          >
            {t('error.go.search')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-mint-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-mint-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t('results.back.button')}</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-mint-500 to-sky-500 p-2 rounded-xl">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-mint-600 to-sky-600 bg-clip-text text-transparent">
                  {t('app.title')}
                </h1>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('results.title')}
            <span className="bg-gradient-to-r from-mint-500 to-sky-500 bg-clip-text text-transparent"> {product}</span>
          </h2>
          <p className="text-gray-600 text-lg">{t('results.subtitle')}</p>
        </div>

        {/* AI Insights */}
        {analysis.insights && (
          <section className="mb-12">
            <div className="bg-gradient-to-r from-mint-500 to-sky-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">{t('results.insights.title')}</h3>
              <p className="text-mint-100 leading-relaxed">{analysis.insights}</p>
            </div>
          </section>
        )}

        {/* Export Destinations */}
        <section className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-mint-500 to-mint-400 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{t('results.destinations.title')}</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {analysis.destinations.map((dest, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{dest.flag}</span>
                  <h4 className="text-xl font-semibold text-gray-800">{dest.country}</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('results.destinations.demand')}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      dest.demand === 'Very High' ? 'bg-mint-100 text-mint-700' :
                      dest.demand === 'High' ? 'bg-sky-100 text-sky-700' :
                      dest.demand === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {t(`demand.${dest.demand.toLowerCase().replace(' ', '.')}`)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('results.destinations.growth')}</span>
                    <span className="font-semibold text-mint-600">{dest.growth}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('results.destinations.marketSize')}</span>
                    <span className="font-semibold text-gray-800">{dest.marketSize}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('results.destinations.barriers')}</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      dest.barriers === 'Low' ? 'bg-mint-100 text-mint-700' :
                      dest.barriers === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {t(`barriers.${dest.barriers.toLowerCase()}`)}
                    </span>
                  </div>
                </div>

                {dest.reasoning && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{dest.reasoning}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Import Trends */}
        <section className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-sky-500 to-sky-400 p-2 rounded-lg">
              <CustomIcon className="w-5 h-5" size={20} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{t('results.trends.title')}</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="grid md:grid-cols-3 gap-6">
              {analysis.trends.map((trend, index) => (
                <div key={index} className="text-center p-4 bg-gradient-to-br from-mint-50 to-sky-50 rounded-xl">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 text-sm">{trend.period}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{trend.value}%</div>
                  <div className="text-mint-600 font-semibold text-sm">{t('results.trends.importGrowth')} {trend.change}</div>
                  {trend.description && (
                    <p className="text-xs text-gray-500 mt-2">{trend.description}</p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-mint-50 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-mint-600" />
                <span className="font-semibold text-mint-800">{t('results.trends.insight')}</span>
              </div>
              <p className="text-mint-700">
                {t('results.trends.insight.text', { product })}
              </p>
            </div>
          </div>
        </section>

        {/* Regulations & Standards */}
        <section className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-mint-500 to-sky-500 p-2 rounded-lg">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{t('results.regulations.title')}</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {analysis.regulations.map((reg, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">{reg.country}</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="w-4 h-4 text-mint-600" />
                      <span className="font-medium text-gray-700">{t('results.regulations.documents')}</span>
                    </div>
                    <ul className="space-y-1 ml-6">
                      {reg.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="text-gray-600 text-sm">• {req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-500">{t('results.regulations.processingTime')}</div>
                      <div className="font-semibold text-gray-800">{reg.timeline}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{t('results.regulations.cost')}</div>
                      <div className="font-semibold text-gray-800">{reg.cost}</div>
                    </div>
                  </div>

                  {reg.notes && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">{reg.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Action Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-mint-500 to-sky-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{t('results.action.title')}</h3>
            <p className="text-mint-100 mb-6 max-w-2xl mx-auto">
              {t('results.action.subtitle')}
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-white text-mint-600 px-8 py-3 rounded-xl font-semibold hover:bg-mint-50 transition-colors shadow-lg"
            >
              {t('results.action.button')}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResultsPage;