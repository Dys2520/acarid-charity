import Link from 'next/link';

export default function DonationSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check text-3xl text-green-600"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Don effectué avec succès !
          </h1>
          <p className="text-gray-600">
            Merci pour votre générosité. Votre don nous aidera à poursuivre nos actions.
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-blue-800 text-sm">
            <i className="fas fa-info-circle mr-2"></i>
            Un reçu fiscal vous sera envoyé par email dans les prochaines heures.
          </p>
        </div>
        
        <div className="space-y-3">
          <Link 
            href="/"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 block"
          >
            Retour à l&apos;accueil
          </Link>
          <Link 
            href="/#realisations"
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-300 block"
          >
            Voir nos réalisations
          </Link>
        </div>
      </div>
    </div>
  );
}
