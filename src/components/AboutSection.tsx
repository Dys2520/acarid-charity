'use client';

export default function AboutSection() {
  return (
    <section id="apropos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">À propos de nous</h2>
        
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
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">Nos objectifs</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>Améliorer la qualité de vie des enfants démunis et vulnérables</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>Scolariser les enfants démunis et soutenir leurs parents dans leur autonomisation</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>Construire des jardins d&apos;enfants sains, écologiques et conviviaux pour les enfants des zones les plus vulnérables</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                <span>Contribuer à améliorer l&apos;accès à l&apos;eau potable pour les populations vivantes dans les zones arides</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
