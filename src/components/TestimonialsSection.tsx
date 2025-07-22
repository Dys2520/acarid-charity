'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  content: string;
  createdAt: string;
}

// Default testimonials as fallback
const defaultTestimonials = [
  {
    _id: '1',
    name: 'Marie A.',
    role: 'Parent bénéficiaire',
    content: 'Grâce à l\'association A.Ca.Ri.D, mon fils a pu reprendre ses études. Nous sommes très reconnaissants pour l\'aide apportée.',
    createdAt: '2023-01-01'
  },
  {
    _id: '2',
    name: 'Jean P.',
    role: 'Bénévole',
    content: 'Travailler comme bénévole pour A.Ca.Ri.D est une expérience enrichissante. Chaque sourire d\'enfant est une récompense.',
    createdAt: '2023-01-02'
  },
  {
    _id: '3',
    name: 'Aminatou D.',
    role: 'Bénéficiaire',
    content: 'Les distributions de vivres ont été un vrai soulagement pour notre famille pendant les moments difficiles.',
    createdAt: '2023-01-03'
  },
  {
    _id: '4',
    name: 'Paul T.',
    role: 'Frère d\'un bénéficiaire',
    content: 'L\'association a transformé la vie de mon petit frère en lui offrant une éducation de qualité. Merci du fond du cœur.',
    createdAt: '2023-01-04'
  },
  {
    _id: '5',
    name: 'Fatima S.',
    role: 'Éducatrice',
    content: 'Les sorties touristiques organisées par A.Ca.Ri.D permettent aux enfants de découvrir leur pays et de créer des souvenirs magnifiques.',
    createdAt: '2023-01-05'
  }
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      // Keep default testimonials on error
    } finally {
      setLoading(false);
    }
  };

  // Auto-advance testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

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
              {/* Testimonials carousel */}
              <div className="relative overflow-hidden h-64 mb-8">
                <div 
                  className="flex transition-transform duration-500 h-full"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial._id} className="flex-shrink-0 w-full px-4 h-full flex items-center">
                      <div className="bg-gray-50 p-8 rounded-lg shadow-md w-full text-center">
                        <div className="mb-6">
                          <i className="fas fa-quote-left text-3xl text-blue-600 mb-4"></i>
                        </div>
                        <p className="text-gray-700 mb-6 text-lg italic leading-relaxed">
                          &quot;{testimonial.content}&quot;
                        </p>
                        <div className="border-t pt-4">
                          <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                          <p className="text-blue-600 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center space-x-2 mb-8">
                {testimonials.map((_, index) => (
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
