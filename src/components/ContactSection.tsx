'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    customSubject: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        const responseData = await response.json();
        // Utiliser le message spécifique renvoyé par l'API
        setStatusMessage(responseData.message || 'Message envoyé avec succès!');
        setFormState({ name: '', email: '', subject: '', customSubject: '', message: '' });
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.error || 'Erreur lors de l\'envoi du message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatusMessage('Erreur lors de l\'envoi du message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="message" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Laisser un message</h2>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="contact-name" className="block text-gray-700 font-medium mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="contact-email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="contact-subject" className="block text-gray-700 font-medium mb-2">
                  Sujet
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">-- Sélectionnez --</option>
                  <option value="temoignage">Témoignage</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              {formState.subject === 'autre' && (
                <div className="mb-4" id="custom-subject-container">
                  <label htmlFor="custom-subject" className="block text-gray-700 font-medium mb-2">
                    Précisez le sujet
                  </label>
                  <input
                    type="text"
                    id="custom-subject"
                    name="customSubject"
                    value={formState.customSubject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="contact-message" className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                disabled={loading}
              >
                {loading ? 'Envoi en cours...' : 'Envoyer le message'}
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
    </section>
  );
}
