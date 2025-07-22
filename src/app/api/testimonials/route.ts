import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Testimonial } from '@/models';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, role, content } = body;

    // Validate required fields
    if (!name || !role || !content) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis.' },
        { status: 400 }
      );
    }

    // Create new testimonial (requires approval)
    const newTestimonial = new Testimonial({
      name,
      role,
      content,
      isApproved: false, // Requires manual approval
    });

    await newTestimonial.save();

    return NextResponse.json(
      { message: 'Témoignage soumis avec succès! Il sera publié après modération.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la soumission du témoignage.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    // Only return approved testimonials for public display
    const testimonials = await Testimonial.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .limit(20);

    return NextResponse.json({ testimonials }, { status: 200 });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des témoignages.' },
      { status: 500 }
    );
  }
}
