'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Member {
  name: string;
  position: string;
  image: string;
}

const conseilAdministration: Member[] = [
  {
    name: "Mr DOSSOU Enagnon Lionel Gildas",
    position: "Président",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Mme Angèle TAWARI",
    position: "Vice-présidente",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Mr Fréjus DOUGOU",
    position: "Secrétaire Général",
    image: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    name: "Mme SANNY Naelys",
    position: "Trésorière générale",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const comiteExecutif: Member[] = [
  {
    name: "Mr Fréjus DOUGOU",
    position: "Directeur exécutif",
    image: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    name: "Mme Geneviève KOUAGO",
    position: "Chargé de programmes",
    image: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  {
    name: "Mme Larissa AHADJI",
    position: "Secrétaire-comptable",
    image: "https://randomuser.me/api/portraits/women/28.jpg"
  },
  {
    name: "Mme Angèle TAWARI",
    position: "Chargée du suivi et de l'évaluation",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Rock AMEDOME BAUDE",
    position: "Chargé de communication",
    image: "https://randomuser.me/api/portraits/men/12.jpg"
  }
];

interface VerticalCarouselProps {
  members: Member[];
  title: string;
}

function VerticalCarousel({ members, title }: VerticalCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 2;
  const maxIndex = Math.max(0, members.length - itemsPerView);

  const moveCarousel = (direction: number) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = maxIndex;
    if (newIndex > maxIndex) newIndex = 0;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => moveCarousel(1);
  const prevSlide = () => moveCarousel(-1);

  return (
    <div className="relative">
      <h3 className="text-2xl font-bold mb-8 text-center relative text-white">
        <span className="relative z-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {title}
        </span>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
      </h3>
      
      <div className="relative overflow-hidden h-[520px] bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
        <div 
          className="flex flex-col space-y-4 transition-transform duration-700 ease-out"
          style={{
            transform: `translateY(-${currentIndex * 260}px)`
          }}
        >
          {members.map((member, index) => (
            <div key={index} className="group bg-white/20 backdrop-blur-md p-6 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-500 hover:scale-105 shadow-xl">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-gradient-to-r from-blue-400 to-purple-400 shadow-xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 rounded-full ring-4 ring-blue-400/30 group-hover:ring-blue-400/50 transition-all duration-500"></div>
                </div>
                <h4 className="font-bold text-lg text-white mb-2 group-hover:text-blue-200 transition-colors">{member.name}</h4>
                <p className="text-blue-200 font-medium text-sm bg-blue-500/30 px-3 py-1 rounded-full backdrop-blur-sm">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation buttons */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button 
            onClick={prevSlide}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-white/30 group"
          >
            <i className="fas fa-chevron-up text-lg group-hover:text-blue-200 transition-colors"></i>
          </button>
          <button 
            onClick={nextSlide}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-white/30 group"
          >
            <i className="fas fa-chevron-down text-lg group-hover:text-blue-200 transition-colors"></i>
          </button>
        </div>
        
        {/* Indicators */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-8 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-gradient-to-b from-blue-400 to-purple-400' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MembersSection() {
  return (
    <section 
      id="membres" 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 58, 138, 0.9)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background blur overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Espace Membres
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-gray-200 text-lg max-w-4xl mx-auto leading-relaxed">
            L'Association est représentée, dirigée et administrée par un Conseil d'Administration. Les membres de ce Conseil sont élus pour un mandat de cinq (05) ans, renouvelable. Le Conseil d'Administration en exercice désigne également un Comité Exécutif.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <VerticalCarousel 
              members={conseilAdministration} 
              title="Conseil d'administration" 
            />
            <VerticalCarousel 
              members={comiteExecutif} 
              title="Comité exécutif" 
            />
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
    </section>
  );
}
