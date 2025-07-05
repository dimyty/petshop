import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🐾</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Bat Petko Store</h3>
                <p className="text-gray-400 text-sm">Всичко за вашия любимец</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Ние сме водещият онлайн магазин за домашни любимци в България. 
              Предлагаме качествени продукти и професионални съвети за грижа за животните.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Бързи връзки</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">За нас</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Продукти</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Промоции</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Блог</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Контакти</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Кариери</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Категории</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Храна за кучета</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Храна за котки</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Играчки</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Аксесоари</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Грижа и хигиена</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Легла и къщички</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Контакти</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    бул. "Витоша" 15<br />
                    1000 София, България
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300">0888 123 456</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300">info@petstore.bg</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="font-semibold mb-2">Работно време:</h5>
              <p className="text-gray-300 text-sm">
                Пон-Пет: 9:00 - 18:00<br />
                Събота: 10:00 - 16:00<br />
                Неделя: Почивен ден
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 PetStore Bulgaria. Всички права запазени.
            </p>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Условия за ползване
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Политика за поверителност
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;