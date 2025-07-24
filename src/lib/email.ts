import nodemailer from 'nodemailer';

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      ...options,
    });
  } catch (error) {
    console.error('Erreur envoi email:', error);
    throw new Error('Échec de l\'envoi de l\'email');
  }
}

// Template pour notification de message général
export function generateGeneralMessageNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { subject: string; html: string } {
  return {
    subject: `Nouveau message: ${data.subject}`,
    html: `
      <h2>Nouveau message reçu</h2>
      <p><strong>De:</strong> ${data.name} (${data.email})</p>
      <p><strong>Sujet:</strong> ${data.subject}</p>
      <div>
        <strong>Message:</strong>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      </div>
      <hr>
      <p><em>Message reçu le ${new Date().toLocaleString('fr-FR')}</em></p>
    `
  };
}

// Template pour notification de témoignage
export function generateTestimonialNotification(data: {
  name: string;
  email: string;
  content: string;
}): { subject: string; html: string } {
  return {
    subject: `Nouveau témoignage: ${data.name}`,
    html: `
      <h2>Nouveau témoignage reçu</h2>
      <p><strong>De:</strong> ${data.name} (${data.email})</p>
      <div>
        <strong>Témoignage:</strong>
        <p style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">${data.content.replace(/\n/g, '<br>')}</p>
      </div>
      
      <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>⚠️ Action requise:</strong> Ce témoignage doit être modéré avant publication.</p>
        <p>Connectez-vous à l'interface d'administration pour approuver ou rejeter ce témoignage.</p>
      </div>
      
      <hr>
      <p><em>Témoignage reçu le ${new Date().toLocaleString('fr-FR')}</em></p>
    `
  };
}

// Template pour demande de bénévolat
export function generateVolunteerNotification(data: {
  firstName: string;
  lastName: string;
  email: string;
  function: string;
  motivation: string;
  tempId: string;
}): { subject: string; html: string } {
  // Encoder les données du candidat dans l'URL pour les récupérer plus tard
  const candidateDataEncoded = Buffer.from(JSON.stringify({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    function: data.function,
    motivation: data.motivation
  })).toString('base64url');
  
  const acceptUrl = `${process.env.BASE_URL}/api/volunteers/decision?tempId=${data.tempId}&action=accept&token=${generateDecisionToken(data.tempId, 'accept')}&data=${candidateDataEncoded}`;
  const rejectUrl = `${process.env.BASE_URL}/api/volunteers/decision?tempId=${data.tempId}&action=reject&token=${generateDecisionToken(data.tempId, 'reject')}`;

  return {
    subject: `Nouvelle demande de bénévolat: ${data.firstName} ${data.lastName}`,
    html: `
      <h2>Nouvelle demande de bénévolat</h2>
      <p><strong>Nom:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Fonction souhaitée:</strong> ${data.function}</p>
      <div>
        <strong>Motivation:</strong>
        <p>${data.motivation.replace(/\n/g, '<br>')}</p>
      </div>
      
      <div style="margin-top: 30px; text-align: center;">
        <a href="${acceptUrl}" 
           style="background-color: #22c55e; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 6px; margin-right: 10px;">
          ✅ ACCEPTER
        </a>
        <a href="${rejectUrl}" 
           style="background-color: #ef4444; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 6px;">
          ❌ REFUSER
        </a>
      </div>
      
      <hr>
      <p><em>Demande reçue le ${new Date().toLocaleString('fr-FR')}</em></p>
      <p><small>Ces liens sont valables pendant 7 jours.</small></p>
    `
  };
}

// Génération de token sécurisé pour les décisions
export function generateDecisionToken(volunteerId: string, action: string): string {
  const crypto = require('crypto');
  const secret = process.env.DECISION_SECRET || 'default-secret-change-me';
  const payload = `${volunteerId}-${action}`;
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

// Vérification du token de décision
export function verifyDecisionToken(volunteerId: string, action: string, token: string): boolean {
  try {
    const expectedToken = generateDecisionToken(volunteerId, action);
    return token === expectedToken;
  } catch {
    return false;
  }
}
