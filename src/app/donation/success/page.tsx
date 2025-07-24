'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function DonationSuccessContent() {
  const searchParams = useSearchParams();
  const [transactionInfo, setTransactionInfo] = useState<any>(null);

  useEffect(() => {
    // Get CinetPay return parameters
    const cpm_trans_id = searchParams.get('cpm_trans_id');
    const cpm_amount = searchParams.get('cpm_amount');
    const cpm_currency = searchParams.get('cpm_currency');
    const cpm_trans_status = searchParams.get('cpm_trans_status');
    
    if (cpm_trans_id) {
      setTransactionInfo({
        transactionId: cpm_trans_id,
        amount: cpm_amount,
        currency: cpm_currency,
        status: cpm_trans_status
      });
    }
  }, [searchParams]);

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
        
        {transactionInfo && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-2">Détails de la transaction:</p>
            <div className="text-left space-y-1">
              <p className="text-xs text-gray-600">
                <span className="font-medium">ID:</span> {transactionInfo.transactionId}
              </p>
              {transactionInfo.amount && (
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Montant:</span> {transactionInfo.amount} {transactionInfo.currency || 'XOF'}
                </p>
              )}
            </div>
          </div>
        )}
        
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
            Retour à l'accueil
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

export default function DonationSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <DonationSuccessContent />
    </Suspense>
  );
}
