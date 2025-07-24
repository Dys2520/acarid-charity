import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Testimonial } from '@/models';
import { sendEmail, generateGeneralMessageNotification, generateTestimonialNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, subject, customSubject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs requis doivent être remplis.' },
        { status: 400 }
      );
    }

    const finalSubject = subject === 'autre' ? customSubject : subject;

    // Si le sujet est "témoignage", enregistrer dans la collection testimonials
    if (subject === 'témoignage' || subject === 'temoignage') {
      const newTestimonial = new Testimonial({
        name,
        content: message,
        isApproved: false, // Requires manual approval
      });

      await newTestimonial.save();

      // Envoyer aussi un email de notification pour les témoignages
      try {
        const emailContent = generateTestimonialNotification({
          name,
          email,
          content: message,
        });

        await sendEmail({
          to: process.env.COMMUNICATION_EMAIL || 'communication@acarid-charity.org',
          subject: emailContent.subject,
          html: emailContent.html,
        });
      } catch (emailError) {
        console.error('Erreur envoi email témoignage:', emailError);
        // On continue même si l'email échoue, le témoignage est sauvegardé
      }

      return NextResponse.json(
        { message: 'Témoignage soumis avec succès! Il sera publié après modération.', isTestimonial: true },
        { status: 201 }
      );
    }

    // Pour tous les autres messages, envoyer un email au chargé de communication
    try {
      const emailContent = generateGeneralMessageNotification({
        name,
        email,
        subject: finalSubject,
        message,
      });

      await sendEmail({
        to: process.env.COMMUNICATION_EMAIL || 'communication@acarid-charity.org',
        subject: emailContent.subject,
        html: emailContent.html,
      });

      return NextResponse.json(
        { message: 'Message envoyé avec succès!' },
        { status: 201 }
      );
    } catch (emailError) {
      console.error('Erreur envoi email:', emailError);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing message:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement du message.' },
      { status: 500 }
    );
  }
}
