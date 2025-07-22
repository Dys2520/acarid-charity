'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Realisation {
  title: string;
  description: string;
  period: string;
  image: string;
}

const realisations: Realisation[] = [
  {
    title: "Distribution de fournitures scolaires",
    description: "Première édition de l'activité de distribution de fournitures scolaires et paiement des frais de scolarité aux enfants bénéficiaires.",
    period: "2022 – 2023",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    title: "Distribution de vivres et vêtements",
    description: "Première édition de l'activité de distributions de vivres et de vêtements au sein des orphelinats Les Saints Innocents et La Paix de Natitingou.",
    period: "2022 – 2023",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    title: "Sortie touristique",
    description: "Première édition de la sortie touristique avec les enfants bénéficiaires de l'association.",
    period: "Avril 2023",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    title: "Distribution de vivres",
    description: "Deuxième édition du projet de distribution de vivres aux personnes vulnérables.",
    period: "2024",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    title: "Distribution scolaire",
    description: "Troisième édition de l'activité de distribution de fournitures scolaires aux enfants bénéficiaires.",
    period: "2024",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    title: "Sortie touristique Gite Noel",
    description: "Sortie touristique au Gite de Noel avec les enfants bénéficiaires.",
    period: "2024",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
  }
];

export default function RealisationsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, realisations.length - itemsPerView);

  const moveCarousel = (direction: number) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex <= maxIndex) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <section id="realisations" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Réalisations</h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(realisations.length / itemsPerView) * 100}%`
              }}
            >
              {realisations.map((realisation, index) => (
                <div key={index} className="flex-shrink-0 px-4" style={{ width: `${100 / realisations.length}%` }}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48 w-full">
                      <Image
                        src={realisation.image}
                        alt={realisation.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        {realisation.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {realisation.description}
                      </p>
                      <span className="text-blue-600 font-medium text-sm">
                        {realisation.period}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel controls */}
            <button 
              onClick={() => moveCarousel(-1)}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              onClick={() => moveCarousel(1)}
              disabled={currentIndex === maxIndex}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            
            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
