import React, { useState } from 'react';
import { AlertCircle, Copy, Check, ExternalLink, Info } from 'lucide-react';

const ApiKeySetup: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-mint-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-yellow-100 p-4 rounded-full w-fit mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">API Key Required</h1>
          <p className="text-gray-600">
            To use the AI features, you need to set up your Gemini API key.
          </p>
        </div>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-mint-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
              Get Your API Key
            </h3>
            <p className="text-gray-600 mb-4">
              Visit Google AI Studio to get your free Gemini API key:
            </p>
            <a
              href="https://makersuite.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-mint-500 to-sky-500 text-white px-4 py-2 rounded-lg hover:from-mint-600 hover:to-sky-600 transition-all duration-300"
            >
              <span>Get API Key</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-mint-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
              Create Environment File
            </h3>
            <p className="text-gray-600 mb-4">
              Create a <code className="bg-gray-200 px-2 py-1 rounded text-sm">.env</code> file in your project root:
            </p>
            <div className="bg-gray-800 rounded-lg p-4 relative">
              <pre className="text-green-400 text-sm overflow-x-auto">
{`VITE_GEMINI_API_KEY=your_api_key_here`}
              </pre>
              <button
                onClick={() => copyToClipboard('VITE_GEMINI_API_KEY=your_api_key_here')}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-mint-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
              Restart Development Server
            </h3>
            <p className="text-gray-600 mb-4">
              Stop your current development server and restart it to load the environment variables:
            </p>
            <div className="bg-gray-800 rounded-lg p-4">
              <pre className="text-green-400 text-sm">
{`npm run dev`}
              </pre>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-3">
              <Info className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-800">Troubleshooting</h4>
            </div>
            <ul className="text-blue-700 text-sm space-y-2">
              <li>• <strong>Model Error:</strong> If you see "models/gemini-2.0-flash is not found", the app will automatically use fallback data</li>
              <li>• <strong>API Key Error:</strong> Make sure your API key is correct and active</li>
              <li>• <strong>Quota Error:</strong> Free tier has generous limits, but you can check usage in Google AI Studio</li>
              <li>• <strong>Network Error:</strong> Check your internet connection</li>
              <li>• <strong>Model Access:</strong> Make sure your API key has access to gemini-2.0-flash model</li>
            </ul>
          </div>

          {/* Important Notes */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h4 className="font-semibold text-green-800 mb-2">Good News!</h4>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• The API key is completely free with generous usage limits</li>
              <li>• If AI is unavailable, the app will show realistic fallback data</li>
              <li>• The <code className="bg-green-100 px-1 rounded">.env</code> file is automatically ignored by Git</li>
              <li>• You can always switch between AI and fallback modes</li>
              <li>• Using latest gemini-2.0-flash model for better performance</li>
            </ul>
          </div>

          {/* Model Info */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h4 className="font-semibold text-purple-800 mb-2">Model Information</h4>
            <ul className="text-purple-700 text-sm space-y-1">
              <li>• <strong>Model:</strong> gemini-2.0-flash (latest and fastest)</li>
              <li>• <strong>Features:</strong> Better performance, lower latency</li>
              <li>• <strong>Availability:</strong> Available in most regions</li>
              <li>• <strong>Fallback:</strong> Automatic fallback if model not available</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-mint-500 to-sky-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-mint-600 hover:to-sky-600 transition-all duration-300"
          >
            Reload After Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySetup; 