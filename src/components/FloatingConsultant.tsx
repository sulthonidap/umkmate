import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Trash2 } from 'lucide-react';
import { useAI } from '../context/AIContext';
import { useLanguage } from '../context/LanguageContext';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const FloatingConsultant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { language } = useLanguage();
  const { analyzeProduct, chatWithAI } = useAI();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('temanekspor-chat-history');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error('Error loading chat history:', error);
        // If there's an error, start with welcome message
        setMessages([{
          id: '1',
          text: language === 'id' 
            ? 'Halo! Saya AI Assistant TemanEkspor. Saya siap membantu Anda dengan pertanyaan seputar ekspor dan peluang bisnis. Apa yang ingin Anda tanyakan?'
            : 'Hello! I\'m TemanEkspor AI Assistant. I\'m ready to help you with export and business opportunity questions. What would you like to ask?',
          isUser: false,
          timestamp: new Date()
        }]);
      }
    } else {
      // First time user - show welcome message
      setMessages([{
        id: '1',
        text: language === 'id' 
          ? 'Halo! Saya AI Assistant TemanEkspor. Saya siap membantu Anda dengan pertanyaan seputar ekspor dan peluang bisnis. Apa yang ingin Anda tanyakan?'
          : 'Hello! I\'m TemanEkspor AI Assistant. I\'m ready to help you with export and business opportunity questions. What would you like to ask?',
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, [language]);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('temanekspor-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Use real AI service
      const aiResponse = await chatWithAI(inputText, language);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 500);

    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: language === 'id' 
          ? 'Maaf, terjadi kesalahan. Silakan coba lagi.'
          : 'Sorry, an error occurred. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageText = (text: string) => {
    // Replace *** with line breaks and make the following text bold
    return text
      .replace(/\*\*\*(.*?):/g, '\n\n**$1:**')
      .replace(/\*\*\*(.*?)\*\*/g, '\n\n**$1**')
      .replace(/\*\*(.*?)\*\*/g, '**$1**')
      .trim();
  };

  const renderFormattedText = (text: string) => {
    const formattedText = formatMessageText(text);
    
    // Simple markdown-like rendering
    return formattedText.split('\n').map((line, index) => {
      if (line.trim() === '') return <br key={index} />;
      
      // Check if line contains bold text
      const boldMatch = line.match(/\*\*(.*?)\*\*/);
      if (boldMatch) {
        const parts = line.split(/\*\*(.*?)\*\*/);
        return (
          <p key={index} className="mb-2">
            {parts.map((part, partIndex) => {
              if (partIndex % 2 === 1) {
                // This is the bold text
                return <strong key={partIndex}>{part}</strong>;
              }
              return part;
            })}
          </p>
        );
      }
      
      return <p key={index} className="mb-2">{line}</p>;
    });
  };

  const clearChatHistory = () => {
    setMessages([{
      id: Date.now().toString(),
      text: language === 'id' 
        ? 'Halo! Saya AI Assistant TemanEkspor. Saya siap membantu Anda dengan pertanyaan seputar ekspor dan peluang bisnis. Apa yang ingin Anda tanyakan?'
        : 'Hello! I\'m TemanEkspor AI Assistant. I\'m ready to help you with export and business opportunity questions. What would you like to ask?',
      isUser: false,
      timestamp: new Date()
    }]);
    localStorage.removeItem('temanekspor-chat-history');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-mint-500 to-sky-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 group hover:scale-110 animate-pulse-soft"
        aria-label="Chat with AI Assistant"
      >
        <Bot className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {language === 'id' ? 'Chat dengan AI' : 'Chat with AI'}
        </span>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-4">
          <div className="bg-white rounded-lg shadow-xl w-96 h-[500px] flex flex-col chat-modal-enter">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-mint-500" />
                <h3 className="font-semibold text-gray-800">
                  {language === 'id' ? 'AI Assistant TemanEkspor' : 'TemanEkspor AI Assistant'}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearChatHistory}
                  className="text-gray-500 hover:text-red-500 transition-colors p-1"
                  title={language === 'id' ? 'Hapus riwayat chat' : 'Clear chat history'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                             {messages.map((message) => (
                 <div
                   key={message.id}
                   className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} message-enter`}
                 >
                   <div
                     className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                       message.isUser
                         ? 'bg-mint-500 text-white'
                         : 'bg-gray-100 text-gray-800'
                     }`}
                   >
                     <div className="text-sm chat-message">
                       {renderFormattedText(message.text)}
                     </div>
                     <p className="text-xs opacity-70 mt-1">
                       {message.timestamp.toLocaleTimeString()}
                     </p>
                   </div>
                 </div>
               ))}
                             {isTyping && (
                 <div className="flex justify-start">
                   <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                     <div className="flex space-x-1">
                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-1"></div>
                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-2"></div>
                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-3"></div>
                     </div>
                   </div>
                 </div>
                              )}
             </div>
             <div ref={messagesEndRef} />

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'id' ? 'Ketik pesan...' : 'Type a message...'}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingConsultant;