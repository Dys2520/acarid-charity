'use client';

import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full mr-3 flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <h1 className="text-xl font-bold text-blue-600">A.Ca.Ri.D</h1>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <a href="#accueil" onClick={(e) => handleSmoothScroll(e, 'accueil')} 
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group">
                Accueil
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#realisations" onClick={(e) => handleSmoothScroll(e, 'realisations')} 
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group">
                Réalisations
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#apropos" onClick={(e) => handleSmoothScroll(e, 'apropos')} 
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group">
                À propos
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#membres" onClick={(e) => handleSmoothScroll(e, 'membres')} 
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group">
                Membres
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#don" onClick={(e) => handleSmoothScroll(e, 'don')} 
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group">
                Faire un don
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#benevole" onClick={(e) => handleSmoothScroll(e, 'benevole')} 
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group">
                Devenir bénévole
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#message" onClick={(e) => handleSmoothScroll(e, 'message')} 
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group">
                Laisser un message
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </nav>
        
        <button 
          className="md:hidden text-gray-700" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-white py-2 px-4 shadow-lg transition-all duration-300 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col space-y-3">
          <li><a href="#apropos" onClick={(e) => handleSmoothScroll(e, 'apropos')} className="block py-2 text-gray-700 hover:text-blue-600">À propos</a></li>
          <li><a href="#membres" onClick={(e) => handleSmoothScroll(e, 'membres')} className="block py-2 text-gray-700 hover:text-blue-600">Membres</a></li>
          <li><a href="#realisations" onClick={(e) => handleSmoothScroll(e, 'realisations')} className="block py-2 text-gray-700 hover:text-blue-600">Réalisations</a></li>
          <li><a href="#don" onClick={(e) => handleSmoothScroll(e, 'don')} className="block py-2 text-gray-700 hover:text-blue-600">Faire un don</a></li>
          <li><a href="#benevole" onClick={(e) => handleSmoothScroll(e, 'benevole')} className="block py-2 text-gray-700 hover:text-blue-600">Devenir bénévole</a></li>
        </ul>
      </div>
    </header>
  );
}
