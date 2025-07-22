'use client';

export default function HeroSection() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="accueil"
      className="text-white py-20 md:py-32 relative bg-gradient-to-r from-blue-900 to-blue-700"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Association Caritative Rive Droite
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-delay">
          Redonnons le sourire aux plus démunis à travers des actions concrètes et durables.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 animate-fade-in-delay-2">
          <a 
            href="#don" 
            onClick={(e) => handleSmoothScroll(e, 'don')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Faire un don
          </a>
          <a 
            href="#benevole" 
            onClick={(e) => handleSmoothScroll(e, 'benevole')}
            className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Devenir bénévole
          </a>
        </div>
      </div>
    </section>
  );
}
