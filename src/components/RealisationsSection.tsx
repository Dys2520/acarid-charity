'use client';

import { useState, useEffect } from 'react';
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
  },
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
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const MAX_VISIBLE_DOTS = 5; // Maximum number of dots to show
  
  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);
  
  const maxIndex = Math.max(0, realisations.length - itemsPerView);

  const moveCarousel = (direction: number) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = maxIndex;
    if (newIndex > maxIndex) newIndex = 0;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  // Calculate which dots to show
  const getVisibleDots = () => {
    const totalDots = maxIndex + 1;
    if (totalDots <= MAX_VISIBLE_DOTS) {
      return Array.from({ length: totalDots }, (_, index) => index);
    }

    const half = Math.floor(MAX_VISIBLE_DOTS / 2);
    let start = Math.max(0, currentIndex - half);
    let end = Math.min(totalDots - 1, start + MAX_VISIBLE_DOTS - 1);

    // Adjust start if we're near the end
    if (end - start < MAX_VISIBLE_DOTS - 1) {
      start = Math.max(0, end - MAX_VISIBLE_DOTS + 1);
    }

    const visibleIndices = [];
    for (let i = start; i <= end; i++) {
      visibleIndices.push(i);
    }
    return visibleIndices;
  };

  const visibleDots = getVisibleDots();

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex > maxIndex ? 0 : nextIndex;
      });
    }, 4000); // Change slide every 4 seconds
    
    return () => clearInterval(interval);
  }, [maxIndex, isAutoPlaying]);
  
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section 
      id="realisations" 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(30, 58, 138, 0.9)), url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background blur overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Nos Réalisations
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6"></div>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Découvrez les actions concrètes que nous menons pour transformer des vies
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-all duration-700 ease-out"
                style={{ 
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {realisations.map((realisation, index) => (
                  <div 
                    key={index} 
                    className={`flex-shrink-0 px-4`}
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <div className="group relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden hover:bg-white/20 transition-all duration-500 hover:scale-105 border border-white/20">
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={realisation.image}
                          alt={realisation.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </div>
                      <div className="p-8">
                        <div className="mb-4">
                          <span className="inline-block px-3 py-1 bg-blue-500/80 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                            {realisation.period}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-200 transition-colors duration-300">
                          {realisation.title}
                        </h3>
                        <p className="text-gray-200 leading-relaxed text-sm">
                          {realisation.description}
                        </p>
                        
                        {/* Decorative element */}
                        <div className="mt-6 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Enhanced Carousel controls */}
            <button 
              onClick={() => moveCarousel(-1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border border-white/30 group"
            >
              <i className="fas fa-chevron-left text-lg group-hover:text-blue-200 transition-colors"></i>
            </button>
            <button 
              onClick={() => moveCarousel(1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border border-white/30 group"
            >
              <i className="fas fa-chevron-right text-lg group-hover:text-blue-200 transition-colors"></i>
            </button>
            
            {/* Enhanced Indicators */}
            <div className="flex justify-center mt-10 space-x-3">
              {visibleDots.map((index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === index 
                      ? 'w-12 h-3 bg-gradient-to-r from-blue-400 to-purple-400' 
                      : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
    </section>
  );
}
