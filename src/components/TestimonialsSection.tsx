'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  _id: string;
  name: string;
  content: string;
  createdAt: string;
}

// Extended testimonials list to demonstrate pagination
const defaultTestimonials = [
  {
    _id: '1',
    name: 'Marie A.',
    content: 'Grâce à l\'association A.Ca.Ri.D, mon fils a pu reprendre ses études. Nous sommes très reconnaissants pour l\'aide apportée.',
    createdAt: '2023-01-01'
  },
  {
    _id: '2',
    name: 'Jean P.',
    content: 'Travailler comme bénévole pour A.Ca.Ri.D est une expérience enrichissante. Chaque sourire d\'enfant est une récompense.',
    createdAt: '2023-01-02'
  },
  {
    _id: '3',
    name: 'Aminatou D.',
    content: 'Les distributions de vivres ont été un vrai soulagement pour notre famille pendant les moments difficiles.',
    createdAt: '2023-01-03'
  },
  {
    _id: '4',
    name: 'Paul T.',
    content: 'L\'association a transformé la vie de mon petit frère en lui offrant une éducation de qualité. Merci du fond du cœur.',
    createdAt: '2023-01-04'
  },
  {
    _id: '5',
    name: 'Fatima S.',
    content: 'Les sorties touristiques organisées par A.Ca.Ri.D permettent aux enfants de découvrir leur pays et de créer des souvenirs magnifiques.',
    createdAt: '2023-01-05'
  },
  {
    _id: '6',
    name: 'Ahmed K.',
    content: 'L\'aide alimentaire nous a permis de traverser une période très difficile. Merci pour votre générosité.',
    createdAt: '2023-01-06'
  },
  {
    _id: '7',
    name: 'Sarah M.',
    content: 'Mon enfant participe aux activités éducatives avec tant de joie. C\'est formidable de voir son épanouissement.',
    createdAt: '2023-01-07'
  },
  {
    _id: '8',
    name: 'Omar B.',
    content: 'Être bénévole m\'a appris tant de choses sur la solidarité et l\'entraide. Une expérience humaine unique.',
    createdAt: '2023-01-08'
  },
  {
    _id: '9',
    name: 'Khadija L.',
    content: 'Les cours de soutien scolaire ont permis à ma fille de rattraper son retard. Merci infiniment.',
    createdAt: '2023-01-09'
  },
  {
    _id: '10',
    name: 'Ibrahim N.',
    content: 'L\'association nous a redonné espoir dans les moments les plus sombres. Votre travail est précieux.',
    createdAt: '2023-01-10'
  },
  {
    _id: '11',
    name: 'Aicha R.',
    content: 'Les ateliers créatifs ont révélé le talent artistique de mon fils. Il s\'épanouit grâce à vous.',
    createdAt: '2023-01-11'
  },
  {
    _id: '12',
    name: 'Mohamed H.',
    content: 'Grâce aux formations professionnelles, j\'ai trouvé un emploi stable. Ma vie a complètement changé.',
    createdAt: '2023-01-12'
  }
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [loading, setLoading] = useState(false); // Set to false to show testimonials immediately
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const MAX_VISIBLE_DOTS = 7; // Maximum number of dots to show

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      if (response.ok) {
        const data = await response.json();
        if (data.testimonials && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
        }
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-advance testimonials every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Calculate which dots to show
  const getVisibleDots = () => {
    if (testimonials.length <= MAX_VISIBLE_DOTS) {
      return testimonials.map((_, index) => index);
    }

    const half = Math.floor(MAX_VISIBLE_DOTS / 2);
    let start = Math.max(0, currentIndex - half);
    let end = Math.min(testimonials.length - 1, start + MAX_VISIBLE_DOTS - 1);

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

  return (
    <section id="temoignages" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Témoignages</h2>
        
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Chargement des témoignages...</p>
            </div>
          ) : (
            <>
              {/* Navigation arrows and testimonials carousel */}
              <div className="relative">
                {/* Left arrow */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-600 hover:text-blue-600 rounded-full p-2 shadow-lg transition-all duration-200 -ml-4"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right arrow */}
                <button
                  onClick={goToNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-600 hover:text-blue-600 rounded-full p-2 shadow-lg transition-all duration-200 -mr-4"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Testimonials carousel */}
                <div className="overflow-hidden h-64 mb-8">
                  <div 
                    className="flex transition-transform duration-500 h-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {testimonials.map((testimonial) => (
                      <div key={testimonial._id} className="flex-shrink-0 w-full px-8 h-full flex items-center">
                        <div className="bg-gray-50 p-8 rounded-lg shadow-md w-full text-center">
                          <div className="mb-6">
                            <i className="fas fa-quote-left text-3xl text-blue-600 mb-4"></i>
                          </div>
                          <p className="text-gray-700 mb-6 text-lg italic leading-relaxed">
                            {testimonial.content}
                          </p>
                          <div className="border-t pt-4">
                            <p className="font-semibold text-gray-800">{testimonial.name}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Simple navigation dots */}
              <div className="flex justify-center space-x-2 mb-8">
                {visibleDots.map((index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition ${
                      currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial submission form */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-800 text-center">
                  Partagez votre témoignage
                </h3>
                <p className="text-gray-700 text-center mb-4">
                  Votre histoire peut inspirer d&apos;autres personnes. Partagez votre expérience avec A.Ca.Ri.D.
                </p>
                <div className="text-center">
                  <button 
                    onClick={() => {
                      const messageSection = document.getElementById('message');
                      if (messageSection) {
                        messageSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
                  >
                    Laisser un témoignage
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}