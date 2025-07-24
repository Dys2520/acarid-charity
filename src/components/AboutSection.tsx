'use client';

export default function AboutSection() {
  return (
    <section 
      id="apropos" 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background blur overlay */}
<<<<<<< HEAD
      <div className="absolute inset-0 bg-blue-500/60 backdrop-blur-sm"></div>
=======
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
>>>>>>> e96ae6f52a09b6817c376c2c9b0f9b3e09ac5a4f
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">À propos de nous</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Découvrez notre mission, nos valeurs et notre engagement pour un monde meilleur
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-white">Qui sommes-nous ?</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Fondée à Natitingou dans la région de l&apos;Atacora, l&apos;Association Caritative Rive Droite (A.Ca.Ri.D) est née de la volonté commune d&apos;un groupe de citoyens engagés, désireux d&apos;apporter une aide concrète et durable aux populations les plus vulnérables.
              </p>
              <p className="text-blue-100 leading-relaxed">
                Depuis sa création, l&apos;association agit avec détermination pour soulager la détresse humaine, notamment celle des enfants et des familles en situation de précarité.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-white">Notre mission</h3>
              <p className="text-blue-100 leading-relaxed">
                Notre mission est claire : Redonner le sourire aux plus démunis, en leur offrant des soutiens ciblés pour améliorer leurs conditions de vie et renforcer leur autonomie. À travers des actions concrètes, nous semons chaque jour des graines d&apos;espoir dans les communautés.
              </p>
            </div>
          </div>
          
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-12 text-center text-white">Nos valeurs</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-hands-helping text-white text-xl"></i>
                  </div>
                  <h4 className="font-bold text-lg text-white mb-3">Solidarité</h4>
                  <p className="text-blue-200 text-sm">Nous croyons en la force de l&apos;entraide et du soutien collectif.</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-heart text-white text-xl"></i>
                  </div>
                  <h4 className="font-bold text-lg text-white mb-3">Humanité</h4>
                  <p className="text-blue-200 text-sm">Chaque personne mérite d&apos;être traitée avec dignité et compassion.</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-bullseye text-white text-xl"></i>
                  </div>
                  <h4 className="font-bold text-lg text-white mb-3">Engagement</h4>
                  <p className="text-blue-200 text-sm">Nous œuvrons avec rigueur et constance pour un impact durable.</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-chart-line text-white text-xl"></i>
                  </div>
                  <h4 className="font-bold text-lg text-white mb-3">Autonomisation</h4>
                  <p className="text-blue-200 text-sm">Nous favorisons les initiatives qui permettent aux bénéficiaires de devenir acteurs de leur propre avenir.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-blue-600">Nos objectifs</h3>
            <div className="space-y-6">
              <div className="flex items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-child text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">Qualité de vie des enfants</h4>
                  <p className="text-white">Améliorer la qualité de vie des enfants démunis et vulnérables</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-graduation-cap text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">Éducation et autonomisation</h4>
                  <p className="text-white">Scolariser les enfants démunis et soutenir leurs parents dans leur autonomisation</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-seedling text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">Jardins d'enfants écologiques</h4>
                  <p className="text-white">Construire des jardins d'enfants sains, écologiques et conviviaux pour les enfants des zones les plus vulnérables</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-tint text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">Accès à l'eau potable</h4>
                  <p className="text-white">Contribuer à améliorer l'accès à l'eau potable pour les populations vivantes dans les zones arides</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
