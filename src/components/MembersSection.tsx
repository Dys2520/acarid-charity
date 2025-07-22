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
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex <= maxIndex) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="animate-fade-in-left">
      <h3 className="text-2xl font-semibold mb-8 text-blue-600 text-center relative">
        <span className="bg-gray-50 px-4 relative z-10">{title}</span>
        <span className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 -z-0"></span>
      </h3>
      <div className="relative overflow-hidden h-[500px]">
        <div 
          className="absolute inset-0 flex flex-col space-y-6 transition-transform duration-500"
          style={{
            transform: `translateY(-${currentIndex * 250}px)`
          }}
        >
          {members.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-blue-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg text-gray-800">{member.name}</h4>
                <p className="text-blue-600 font-medium">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => moveCarousel(-1)}
          disabled={currentIndex === 0}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className="fas fa-chevron-down"></i>
        </button>
      </div>
    </div>
  );
}

export default function MembersSection() {
  return (
    <section id="membres" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Espace Membres</h2>
        
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-700 mb-12 text-center">
            L&apos;Association est représentée, dirigée et administrée par un Conseil d&apos;Administration. Les membres de ce Conseil sont élus pour un mandat de cinq (05) ans, renouvelable. Le Conseil d&apos;Administration en exercice désigne également un Comité Exécutif.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
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
    </section>
  );
}
