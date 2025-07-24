import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Volunteer } from '@/models';
import { sendEmail, generateVolunteerNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { firstName, lastName, email, function: userFunction, motivation } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !userFunction || !motivation) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis.' },
        { status: 400 }
      );
    }

    // Check if volunteer already exists
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return NextResponse.json(
        { error: 'Cette adresse email est déjà enregistrée.' },
        { status: 400 }
      );
    }

    // Envoyer un email à l'association avec les liens d'acceptation/refus
    // Le bénévole ne sera enregistré en base qu'après acceptation
    try {
      // Créer un identifiant temporaire unique pour cette candidature
      const tempId = Buffer.from(`${email}-${Date.now()}`).toString('base64url');
      
      const candidateData = {
        firstName,
        lastName,
        email,
        function: userFunction,
        motivation,
        tempId
      };

      const emailContent = generateVolunteerNotification(candidateData);

      await sendEmail({
        to: process.env.VOLUNTEER_EMAIL || process.env.COMMUNICATION_EMAIL || 'benevoles@acarid-charity.org',
        subject: emailContent.subject,
        html: emailContent.html,
      });

      return NextResponse.json(
        { message: 'Candidature envoyée avec succès! Nous vous contacterons bientôt.' },
        { status: 201 }
      );
    } catch (emailError) {
      console.error('Erreur envoi email bénévole:', emailError);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de la candidature. Veuillez réessayer.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating volunteer:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de la candidature.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const volunteers = await Volunteer.find({})
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json({ volunteers }, { status: 200 });
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des bénévoles.' },
      { status: 500 }
    );
  }
}
