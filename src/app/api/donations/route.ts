import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Donation } from '@/models';

// TEMPORARILY DISABLED: CinetPay API integration
// import axios from 'axios';

// TEMPORARILY DISABLED: CinetPay API configuration
// const CINETPAY_API_URL = process.env.CINETPAY_ENVIRONMENT === 'PROD' 
//   ? 'https://api-checkout.cinetpay.com/v2/payment'
//   : 'https://api-checkout.cinetpay.com/v2/payment';

// TEMPORARILY DISABLED: API-based donation processing
// Users will now use direct mobile money transfers instead
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Les dons par API sont temporairement désactivés. Veuillez utiliser les numéros de téléphone affichés sur la page pour vos dons.' },
    { status: 503 }
  );
}

/* COMMENTED OUT - ORIGINAL API DONATION CODE
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

    // Map payment method to FedaPay currency/channel for Benin
    const getPaymentChannel = (method: string) => {
      switch (method) {
        case 'mtn_money':
          return 'mtn_bj'; // MTN Bénin
        case 'moov_money':
          return 'moov_bj'; // Moov Bénin
        case 'celtis_money':
        case 'celtis_cash':
          return 'celtis_bj'; // Celtis Cash Bénin
        case 'visa':
        case 'mastercard':
          return 'card'; // Cartes internationales
        default:
          return 'card';
      }
    };

    try {
      // Generate unique transaction ID
      const transactionId = `donation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create CinetPay payment link
      const paymentData = {
        apikey: process.env.CINETPAY_API_KEY,
        site_id: process.env.CINETPAY_SITE_ID,
        transaction_id: transactionId,
        amount: amount,
        currency: 'XOF',
        alternative_currency: 'XOF',
        description: `Don pour ${reason === 'education' ? 'la scolarisation' : 
                     reason === 'food' ? 'la distribution de vivres' : 
                     reason === 'water' ? "l'accès à l'eau potable" : 
                     reason === 'general' ? 'le soutien général' : 'autre'}`,
        customer_name: fullName,
        customer_surname: fullName.split(' ').slice(1).join(' ') || '',
        customer_email: email,
        customer_phone_number: '',
        customer_address: '',
        customer_city: 'Natitingou',
        customer_country: 'BJ',
        customer_state: 'Atacora',
        customer_zip_code: '',
        notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/donations/webhook`,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donation/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donation/cancel`,
        channels: 'ALL',
        lang: 'fr',
        metadata: `donation_id:${newDonation._id}`
      };

      // Make HTTP request to CinetPay API
      const response = await axios.post(CINETPAY_API_URL, paymentData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (response.data.code === '201') {
        // Update donation with CinetPay transaction ID
        newDonation.cinetpayTransactionId = transactionId;
        await newDonation.save();

        return NextResponse.json({
          message: 'Transaction créée avec succès.',
          transactionId: newDonation._id,
          cinetpayTransactionId: transactionId,
          paymentUrl: response.data.data.payment_url,
          // Informations de debug pour le développement
          debug: process.env.NODE_ENV === 'development' ? {
            paymentMethod,
            channel: getPaymentChannel(paymentMethod),
            environment: process.env.CINETPAY_ENVIRONMENT,
            response: response.data
          } : undefined
        }, { status: 201 });
      } else {
        throw new Error(`CinetPay Error: ${response.data.message || 'Unknown error'}`);
      }

    } catch (cinetpayError: any) {
      console.error('CinetPay Error:', cinetpayError);
      console.error('CinetPay Error Details:', cinetpayError.response?.data || cinetpayError.message);
      
      // Update donation status to failed
      newDonation.status = 'failed';
      await newDonation.save();

      // Retourner une erreur plus détaillée en développement
      const errorMessage = process.env.NODE_ENV === 'development' 
        ? `Erreur CinetPay: ${cinetpayError.message || 'Erreur inconnue'}`
        : 'Erreur lors de la création de la transaction de paiement.';

      return NextResponse.json(
        { 
          error: errorMessage,
          details: process.env.NODE_ENV === 'development' ? cinetpayError.response?.data : undefined
        },
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
*/

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Build query based on parameters
    let query: any = {};
    
    if (id) {
      // If specific ID is requested, return that donation
      try {
        const donation = await Donation.findById(id).select('-email');
        if (!donation) {
          return NextResponse.json(
            { error: 'Don non trouvé.' },
            { status: 404 }
          );
        }
        return NextResponse.json({ donation }, { status: 200 });
      } catch (error) {
        return NextResponse.json(
          { error: 'ID de don invalide.' },
          { status: 400 }
        );
      }
    }

    // Filter by status if provided, otherwise default to completed
    if (status) {
      query.status = status;
    } else {
      query.status = 'completed';
    }

    const donations = await Donation.find(query)
      .sort({ createdAt: -1 })
      .limit(Math.min(limit, 100)) // Cap at 100 for performance
      .select('-email'); // Don't expose email addresses

    const totalDonations = await Donation.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);

    return NextResponse.json({
      donations,
      total: totalDonations[0]?.total || 0,
      count: totalDonations[0]?.count || 0,
      filters: { status: query.status, limit }
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des dons.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const close = searchParams.get('close');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID de don requis.' },
        { status: 400 }
      );
    }

    // Find the donation
    const donation = await Donation.findById(id);
    if (!donation) {
      return NextResponse.json(
        { error: 'Don non trouvé.' },
        { status: 404 }
      );
    }

    // Handle close=true parameter
    if (close === 'true') {
      donation.status = 'completed';
      donation.completedAt = new Date();
      await donation.save();
      
      return NextResponse.json({
        message: 'Don marqué comme terminé.',
        donation: {
          id: donation._id,
          status: donation.status,
          completedAt: donation.completedAt
        }
      }, { status: 200 });
    }

    // Handle other status updates from request body
    const body = await request.json().catch(() => ({}));
    const { status: newStatus } = body;

    if (newStatus && ['pending', 'completed', 'failed', 'cancelled'].includes(newStatus)) {
      donation.status = newStatus;
      if (newStatus === 'completed') {
        donation.completedAt = new Date();
      }
      await donation.save();
      
      return NextResponse.json({
        message: `Statut du don mis à jour vers ${newStatus}.`,
        donation: {
          id: donation._id,
          status: donation.status,
          completedAt: donation.completedAt
        }
      }, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Paramètres de mise à jour invalides.' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error updating donation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du don.' },
      { status: 500 }
    );
  }
}