'use client';

export default function Footer() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">A.Ca.Ri.D</h3>
            <p className="text-gray-300">
              Association Caritative Rive Droite, engagée pour un monde plus juste et solidaire à Natitingou et dans la région de l&apos;Atacora.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <a href="#apropos" onClick={(e) => handleSmoothScroll(e, 'apropos')} 
                   className="text-gray-300 hover:text-white transition">
                  À propos
                </a>
              </li>
              <li>
                <a href="#membres" onClick={(e) => handleSmoothScroll(e, 'membres')} 
                   className="text-gray-300 hover:text-white transition">
                  Membres
                </a>
              </li>
              <li>
                <a href="#realisations" onClick={(e) => handleSmoothScroll(e, 'realisations')} 
                   className="text-gray-300 hover:text-white transition">
                  Réalisations
                </a>
              </li>
              <li>
                <a href="#temoignages" onClick={(e) => handleSmoothScroll(e, 'temoignages')} 
                   className="text-gray-300 hover:text-white transition">
                  Témoignages
                </a>
              </li>
            </ul>
          </div>
          
          <div> 
            <h4 className="font-semibold mb-4 pSr-0">Nous soutenir</h4>
            <ul className="space-y-2">
              <li>
                <a href="#don" onClick={(e) => handleSmoothScroll(e, 'don')} 
                   className="text-gray-300 hover:text-white transition">
                  Faire un don
                </a>
              </li>
              <li>
                <a href="#benevole" onClick={(e) => handleSmoothScroll(e, 'benevole')} 
                   className="text-gray-300 hover:text-white transition">
                  Devenir bénévole
                </a>
              </li>
              <li>
                <a href="#message" onClick={(e) => handleSmoothScroll(e, 'message')} 
                   className="text-gray-300 hover:text-white transition">
                  Nous contacter
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 ml-6">Contact</h4>
            <ul className="space-y-2 w-full max-w-md"> {/* Ajout d'une largeur max */}
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mr-3 text-blue-400 mt-1"></i>
                <span>Natitingou, Atacora, Bénin</span>
              </li>

              {/* Bloc numéros empilés */}
              <li className="flex items-start">
                <i className="fas fa-phone-alt mr-3 text-blue-400 mt-1"></i>
                <div className="flex flex-col">
                  <span>+229 01 94 15 25 33</span>
                  <span>+229 01 97 27 73 72</span>
                </div>
              </li>

              <li className="flex items-start">
                <i className="fas fa-envelope mr-3 text-blue-400 mt-1"></i>
                <span className="break-words">associationrivedroitebenin@gmail.com</span>
              </li>
            </ul>

            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Association Caritative Rive Droite (A.Ca.Ri.D). Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
