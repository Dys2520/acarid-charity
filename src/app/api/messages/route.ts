import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Message } from '@/models';

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

    // Create new message
    const newMessage = new Message({
      name,
      email,
      subject: subject === 'autre' ? customSubject : subject,
      customSubject: subject === 'autre' ? customSubject : undefined,
      message,
    });

    await newMessage.save();

    return NextResponse.json(
      { message: 'Message envoyé avec succès!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const messages = await Message.find({})
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des messages.' },
      { status: 500 }
    );
  }
}
