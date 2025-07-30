import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ResultsPage from './components/ResultsPage';
import FloatingConsultant from './components/FloatingConsultant';
import ApiKeySetup from './components/ApiKeySetup';
import { AIProvider } from './context/AIContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const isApiKeyConfigured = apiKey && apiKey !== 'your_gemini_api_key_here' && apiKey.trim() !== '';

  if (!isApiKeyConfigured) {
    return <ApiKeySetup />;
  }

  return (
    <LanguageProvider>
      <AIProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-mint-50">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/results" element={<ResultsPage />} />
            </Routes>
            <FloatingConsultant />
          </div>
        </Router>
      </AIProvider>
    </LanguageProvider>
  );
}

export default App;