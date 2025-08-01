import React from 'react';
import { Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin, ExternalLink, TrendingUp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Top green bar */}
      <div className="h-1 bg-green-500"></div>
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Identity Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">TemanEkspor</h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
            TemanEkspor hadir untuk membantu UMKM pemula yang ingin melakukan ekspor dari dasar.
            </p>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-white mb-4">KONTAK</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Jl. Gadjah Mada No. 248, Prenggan, Kotagede, Kota Yogyakarta, D. I. Yogyakarta
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a 
                  href="tel:+6285914021997" 
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  +62-859-1402-1997
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a 
                  href="mailto:TemanEkspor@eksporina.com" 
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  TemanEkspor@eksporina.com
                </a>
              </div>
            </div>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-white mb-4">DUKUNGAN</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <ExternalLink className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a 
                  href="https://lamansitu.kemendag.go.id/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  LamanSitu Kemendag 
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <ExternalLink className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a 
                  href="https://exim.kemendag.go.id/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Exim Kemendag
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <ExternalLink className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a 
                  href="https://www.inaexport.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  InaExport
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <ExternalLink className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a 
                  href="https://www.indonesiaeximbank.go.id/id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  Indonesia Exim Bank
                </a>
              </div>
              
            </div>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-white mb-4">LEGAL</h4>
            <div className="space-y-3">
              <a 
                href="#" 
                className="block text-gray-300 text-sm hover:text-white transition-colors"
              >
                Kebijakan Privasi
              </a>
              <a 
                href="#" 
                className="block text-gray-300 text-sm hover:text-white transition-colors"
              >
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright and Social Media */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © 2025 TemanEkspor. Hak Cipta Dilindungi.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 