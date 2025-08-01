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
      className="text-white py-16 md:py-24 relative overflow-hidden h-screen flex items-center"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(30, 58, 138, 0.8)), url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background blur overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Logo/Icon */}
          <div className="mb-8 animate-fade-in">
            <div className="w-24 h-24 mx-auto bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
              <i className="fas fa-hands-helping text-3xl text-white"></i>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Association Caritative
            </span>
            <br />
            <span className="text-blue-200">Rive Droite</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-fade-in-delay text-gray-200 leading-relaxed">
            Redonnons le sourire aux plus démunis à travers des actions concrètes et durables.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-delay-2 mb-8">
            <a 
              href="#don" 
              onClick={(e) => handleSmoothScroll(e, 'don')}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 backdrop-blur-sm border border-blue-500/30"
            >
              <span className="flex items-center justify-center">
                <i className="fas fa-heart mr-3 group-hover:scale-110 transition-transform"></i>
                Faire un don
              </span>
            </a>
            <a 
              href="#benevole" 
              onClick={(e) => handleSmoothScroll(e, 'benevole')}
              className="group bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl border border-white/30 hover:border-white/50"
            >
              <span className="flex items-center justify-center">
                <i className="fas fa-users mr-3 group-hover:scale-110 transition-transform"></i>
                Devenir bénévole
              </span>
            </a>
          </div>
          
        </div>
      </div>
      
      {/* Clickable Scroll indicator */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          const nextSection = document.getElementById('realisations');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:scale-110 transition-transform duration-300 cursor-pointer group"
      >
        <div className="w-8 h-12 border-2 border-white/40 group-hover:border-white/60 rounded-full flex justify-center transition-colors duration-300">
          <div className="w-2 h-4 bg-white/60 group-hover:bg-white/80 rounded-full mt-2 animate-pulse transition-colors duration-300"></div>
        </div>
        <p className="text-white/60 text-xs mt-2 group-hover:text-white/80 transition-colors duration-300">Défiler vers le bas</p>
      </button>
    </section>
  );
}
