import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Donation } from '@/models';

// Import FedaPay conditionally
let FedaPay: any = null;
try {
  FedaPay = require('fedapay');
  // Initialize FedaPay only if properly loaded and configured
  if (process.env.FEDAPAY_SECRET_KEY && FedaPay && typeof FedaPay.setApiKey === 'function') {
    FedaPay.setApiKey(process.env.FEDAPAY_SECRET_KEY);
    FedaPay.setEnvironment(process.env.FEDAPAY_ENVIRONMENT || 'sandbox');
  }
} catch (error) {
  console.warn('FedaPay could not be loaded:', error);
  FedaPay = null;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { fullName, email, amount, reason, paymentMethod } = body;

    // Validate required fields
    if (!fullName || !email || !amount || !reason || !paymentMethod) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis.' },
        { status: 400 }
      );
    }

    // Validate amount (minimum 100 FCFA)
    if (amount < 100) {
      return NextResponse.json(
        { error: 'Le montant minimum est de 100 FCFA.' },
        { status: 400 }
      );
    }

    // Create donation record in database first
    const newDonation = new Donation({
      fullName,
      email,
      amount,
      reason,
      paymentMethod,
    });

    await newDonation.save();

    // Map payment method to FedaPay currency/channel (for future use)
    // const getPaymentChannel = (method: string) => {
    //   switch (method) {
    //     case 'mtn_money':
    //       return 'mtn_ci';
    //     case 'moov_money':
    //       return 'moov_ci';
    //     case 'celtis_money':
    //       return 'celtis_ci';
    //     case 'visa':
    //       return 'card';
    //     default:
    //       return 'card';
    //   }
    // };

    try {
      // Create FedaPay transaction
      const transaction = await FedaPay.Transaction.create({
        description: `Don pour ${reason === 'education' ? 'la scolarisation' : 
                     reason === 'food' ? 'la distribution de vivres' : 
                     reason === 'water' ? "l'accès à l'eau potable" : 
                     reason === 'general' ? 'le soutien général' : 'autre'}`,
        amount: amount,
        currency: {
          iso: 'XOF' // West African CFA franc
        },
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/donations/webhook`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donation/cancel`,
        approve_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donation/success`,
        customer: {
          firstname: fullName.split(' ')[0],
          lastname: fullName.split(' ').slice(1).join(' ') || fullName.split(' ')[0],
          email: email,
        }
      });

      // Update donation with FedaPay transaction ID
      newDonation.fedapayTransactionId = transaction.id;
      await newDonation.save();

      // Generate payment token
      const token = await transaction.generateToken();

      return NextResponse.json({
        message: 'Transaction créée avec succès.',
        transactionId: newDonation._id,
        fedapayTransactionId: transaction.id,
        token: token.token,
        url: token.url
      }, { status: 201 });

    } catch (fedapayError) {
      console.error('FedaPay Error:', fedapayError);
      
      // Update donation status to failed
      newDonation.status = 'failed';
      await newDonation.save();

      return NextResponse.json(
        { error: 'Erreur lors de la création de la transaction de paiement.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error creating donation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du don.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const donations = await Donation.find({ status: 'completed' })
      .sort({ createdAt: -1 })
      .limit(50)
      .select('-email'); // Don't expose email addresses

    const totalDonations = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);

    return NextResponse.json({
      donations,
      total: totalDonations[0]?.total || 0,
      count: totalDonations[0]?.count || 0
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des dons.' },
      { status: 500 }
    );
  }
}
