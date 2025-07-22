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
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">À propos de nous</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Découvrez notre mission, nos valeurs et notre engagement pour un monde meilleur
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">Qui sommes-nous ?</h3>
            <p className="text-gray-700 mb-6">
              Fondée à Natitingou dans la région de l&apos;Atacora, l&apos;Association Caritative Rive Droite (A.Ca.Ri.D) est née de la volonté commune d&apos;un groupe de citoyens engagés, désireux d&apos;apporter une aide concrète et durable aux populations les plus vulnérables.
            </p>
            <p className="text-gray-700">
              Depuis sa création, l&apos;association agit avec détermination pour soulager la détresse humaine, notamment celle des enfants et des familles en situation de précarité. Elle tire son nom symbolique de la « Rive Droite », vision d&apos;un monde plus juste, où chacun a la possibilité de traverser les épreuves de la vie et d&apos;accéder à un avenir meilleur.
            </p>
          </div>
          
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">Notre mission</h3>
            <p className="text-gray-700">
              Notre mission est claire : Redonner le sourire aux plus démunis, en leur offrant des soutiens ciblés pour améliorer leurs conditions de vie et renforcer leur autonomie. À travers des actions concrètes (scolarisation, création de jardins d&apos;enfants, appui à l&apos;autonomisation, accès à l&apos;eau potable), nous semons chaque jour des graines d&apos;espoir dans les communautés.
            </p>
          </div>
          
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">Nos valeurs</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <i className="fas fa-hands-helping text-blue-600"></i>
                  </div>
                  <h4 className="font-semibold text-lg">Solidarité</h4>
                </div>
                <p className="text-gray-700">Nous croyons en la force de l&apos;entraide et du soutien collectif.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <i className="fas fa-heart text-blue-600"></i>
                  </div>
                  <h4 className="font-semibold text-lg">Humanité</h4>
                </div>
                <p className="text-gray-700">Chaque personne mérite d&apos;être traitée avec dignité et compassion.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <i className="fas fa-bullseye text-blue-600"></i>
                  </div>
                  <h4 className="font-semibold text-lg">Engagement</h4>
                </div>
                <p className="text-gray-700">Nous œuvrons avec rigueur et constance pour un impact durable.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <i className="fas fa-chart-line text-blue-600"></i>
                  </div>
                  <h4 className="font-semibold text-lg">Autonomisation</h4>
                </div>
                <p className="text-gray-700">Nous favorisons les initiatives qui permettent aux bénéficiaires de devenir acteurs de leur propre avenir.</p>
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
                  <h4 className="font-semibold text-gray-800 mb-1">Qualité de vie des enfants</h4>
                  <p className="text-gray-600">Améliorer la qualité de vie des enfants démunis et vulnérables</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-graduation-cap text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">Éducation et autonomisation</h4>
                  <p className="text-gray-600">Scolariser les enfants démunis et soutenir leurs parents dans leur autonomisation</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-seedling text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">Jardins d'enfants écologiques</h4>
                  <p className="text-gray-600">Construire des jardins d'enfants sains, écologiques et conviviaux pour les enfants des zones les plus vulnérables</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-tint text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">Accès à l'eau potable</h4>
                  <p className="text-gray-600">Contribuer à améliorer l'accès à l'eau potable pour les populations vivantes dans les zones arides</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
