'use client';

import { useState } from 'react';

export default function DonationSection() {
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    amount: '',
    reason: '',
    paymentMethod: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePaymentMethodSelect = (method: string) => {
    setFormState(prev => ({ ...prev, paymentMethod: method }));
    // Remove active class from all buttons and add to selected
    document.querySelectorAll('.payment-method').forEach(btn => {
      btn.classList.remove('border-blue-500', 'bg-blue-100');
    });
    document.querySelector(`[data-method="${method}"]`)?.classList.add('border-blue-500', 'bg-blue-100');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.paymentMethod) {
      setStatusMessage('Veuillez sélectionner un mode de paiement.');
      return;
    }

    setLoading(true);
    setStatusMessage('');

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formState.fullName,
          email: formState.email,
          amount: parseFloat(formState.amount),
          reason: formState.reason,
          paymentMethod: formState.paymentMethod
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Redirect to FedaPay payment page
        if (data.url) {
          window.location.href = data.url;
        } else {
          setStatusMessage('Transaction créée avec succès! Redirection vers la page de paiement...');
        }
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.error || 'Erreur lors de la création de la transaction.');
      }
    } catch (error) {
      console.error('Error creating donation:', error);
      setStatusMessage('Erreur lors de la création du don.');
    } finally {
      setLoading(false);
    }
  };

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
                  <span>Reçu fiscal disponible pour déduction d&apos;impôts</span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle mt-1 mr-3"></i>
                  <span>Transparence totale sur l&apos;utilisation des fonds</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8 md:p-12">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="fullname" className="block text-gray-700 font-medium mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullName"
                    value={formState.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
                    Montant (FCFA)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    min="100"
                    value={formState.amount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="reason" className="block text-gray-700 font-medium mb-2">
                    Motif du don
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    value={formState.reason}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">-- Sélectionnez --</option>
                    <option value="education">Scolarisation des enfants</option>
                    <option value="food">Distribution de vivres</option>
                    <option value="water">Accès à l&apos;eau potable</option>
                    <option value="general">Soutien général</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Mode de paiement</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      data-method="visa"
                      className="payment-method border-2 rounded-lg py-3 px-4 text-center hover:bg-blue-50 transition-all flex flex-col items-center"
                      onClick={() => handlePaymentMethodSelect('visa')}
                    >
                      <i className="fab fa-cc-visa text-2xl text-blue-800 mb-1"></i>
                      <span className="text-sm font-medium">Visa</span>
                    </button>
                    
                    <button
                      type="button"
                      data-method="mtn_money"
                      className="payment-method border-2 rounded-lg py-3 px-4 text-center hover:bg-blue-50 transition-all flex flex-col items-center"
                      onClick={() => handlePaymentMethodSelect('mtn_money')}
                    >
                      <i className="fas fa-mobile-alt text-2xl text-yellow-600 mb-1"></i>
                      <span className="text-sm font-medium">MTN Money</span>
                    </button>
                    
                    <button
                      type="button"
                      data-method="moov_money"
                      className="payment-method border-2 rounded-lg py-3 px-4 text-center hover:bg-blue-50 transition-all flex flex-col items-center"
                      onClick={() => handlePaymentMethodSelect('moov_money')}
                    >
                      <i className="fas fa-mobile-alt text-2xl text-orange-500 mb-1"></i>
                      <span className="text-sm font-medium">Moov Money</span>
                    </button>
                    
                    <button
                      type="button"
                      data-method="celtis_money"
                      className="payment-method border-2 rounded-lg py-3 px-4 text-center hover:bg-blue-50 transition-all flex flex-col items-center"
                      onClick={() => handlePaymentMethodSelect('celtis_money')}
                    >
                      <i className="fas fa-mobile-alt text-2xl text-purple-600 mb-1"></i>
                      <span className="text-sm font-medium">Celtis Money</span>
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                  disabled={loading}
                >
                  {loading ? 'Traitement en cours...' : 'Faire un don maintenant'}
                </button>

                {statusMessage && (
                  <p className="mt-4 text-center font-medium text-blue-700">
                    {statusMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
