'use client';

export default function DonationSection() {

  return (
    <section id="don" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-blue-50 rounded-xl overflow-hidden shadow-lg">
          <div className="md:flex">
            <div className="md:w-1/2 bg-blue-600 text-white p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6">Faire un don</h2>
              <p className="mb-6">
                Votre soutien financier nous permet de poursuivre nos actions et de développer de nouveaux projets pour aider les plus démunis.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <i className="fas fa-check-circle mt-1 mr-3"></i>
                  <span>100% de votre don est utilisé pour nos actions sur le terrain</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle mt-1 mr-3"></i>
                  <span>Reçu fiscal disponible pour déduction d'impôts</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle mt-1 mr-3"></i>
                  <span>Transparence totale sur l'utilisation des fonds</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Envoyez vos dons par mobile money</h3>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500 shadow-sm">
                  <div className="flex items-center mb-2">           
                    <img src="/mtn-logo.png" alt="MTN Mobile Money" className="w-12 h-8 mr-3 object-contain" />
                    <h4 className="font-bold text-gray-800">MTN Mobile Money</h4>
                  </div>
                  <p className="text-lg font-mono text-gray-700 bg-yellow-50 px-3 py-2 rounded">+229 97 27 73 72</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500 shadow-sm">
                  <div className="flex items-center mb-2">
                    <img src="/moov-logo.png" alt="Moov Money" className="w-12 h-8 mr-3 object-contain" />
                    <h4 className="font-bold text-gray-800">Moov Money</h4>
                  </div>
                  <p className="text-lg font-mono text-gray-700 bg-orange-50 px-3 py-2 rounded">+229  94 15 25 33</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500 shadow-sm">
                  <div className="flex items-center mb-2">           
                    <img src="/mtn-logo.png" alt="MTN Mobile Money" className="w-12 h-8 mr-3 object-contain" />
                    <h4 className="font-bold text-gray-800">MTN Mobile Money</h4>
                  </div>
                  <p className="text-lg font-mono text-gray-700 bg-yellow-50 px-3 py-2 rounded">+229 56 97 50 15</p>
                </div>
              </div>
              
              <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">
                  <i className="fas fa-info-circle mr-2"></i>
                  Instructions
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Composez le code USSD de votre opérateur</li>
                  <li>• Sélectionnez "Transfert d'argent"</li>
                  <li>• Saisissez le numéro correspondant</li>
                  <li>• Entrez le montant de votre don</li>
                  <li>• Confirmez la transaction</li>
                </ul>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  ❤️ Merci pour votre générosité ! Chaque don compte pour nos actions.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Pour toute question, contactez-nous à <strong>assoscaritativerivedroite@gmail.com</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
