'use client';

import { useState } from 'react';

export default function VolunteerSection() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    function: '',
    motivation: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        const data = await response.json();
        setStatusMessage(data.message);
        setFormState({ firstName: '', lastName: '', email: '', function: '', motivation: '' });
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.error || 'Erreur lors de l\'envoi de la candidature.');
      }
    } catch (error) {
      console.error('Error submitting volunteer application:', error);
      setStatusMessage('Erreur lors de l\'envoi de la candidature.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="benevole" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Devenir bénévole</h2>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600">Rejoignez notre équipe</h3>
                <p className="text-gray-700 mb-6">
                  Votre temps et vos compétences sont précieux pour nous aider à mener à bien nos missions. 
                  En tant que bénévole, vous pourrez :
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                    <span>Participer directement à nos actions sur le terrain</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                    <span>Mettre vos compétences professionnelles au service d&apos;une cause noble</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                    <span>Rencontrer une équipe engagée et passionnée</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                    <span>Vivre une expérience humaine enrichissante</span>
                  </li>
                </ul>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Nous recherchons actuellement :</h4>
                  <p className="text-gray-700">
                    Enseignants, éducateurs, professionnels de santé, logisticiens, communicateurs, 
                    et toute personne motivée pour nous aider !
                  </p>
                </div>
              </div>
              
              <div className="md:w-1/2 p-8 md:p-12 bg-blue-600 text-white">
                <h3 className="text-2xl font-semibold mb-6">Formulaire d&apos;inscription</h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="lastname" className="block mb-2">Nom</label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="firstname" className="block mb-2">Prénom</label>
                      <input
                        type="text"
                        id="firstname"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        placeholder="Votre prénom"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email-volunteer" className="block mb-2">Email</label>
                    <input
                      type="email"
                      id="email-volunteer"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Votre email"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="function" className="block mb-2">Fonction/profession</label>
                    <input
                      type="text"
                      id="function"
                      name="function"
                      value={formState.function}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Votre profession"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="motivation" className="block mb-2">Motivations</label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      rows={4}
                      value={formState.motivation}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Pourquoi souhaitez-vous nous rejoindre ?"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-4 rounded-lg transition duration-300"
                    disabled={loading}
                  >
                    {loading ? 'Envoi en cours...' : 'Envoyer ma candidature'}
                  </button>

                  {statusMessage && (
                    <p className="mt-4 text-center font-medium text-white bg-blue-500 bg-opacity-50 p-2 rounded">
                      {statusMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
