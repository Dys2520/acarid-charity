import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Volunteer } from '@/models';

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

    // Create new volunteer
    const newVolunteer = new Volunteer({
      firstName,
      lastName,
      email,
      function: userFunction,
      motivation,
    });

    await newVolunteer.save();

    return NextResponse.json(
      { message: 'Candidature envoyée avec succès! Nous vous contacterons bientôt.' },
      { status: 201 }
    );
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
