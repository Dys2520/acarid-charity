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
    const { entity } = body;

    // Verify webhook signature if available
    // const signature = request.headers.get('x-fedapay-signature');
    // Add signature verification logic here if needed

    if (entity && entity.entity === 'transaction') {
      const transactionId = entity.id;
      const status = entity.status;

      // Find the donation by FedaPay transaction ID
      const donation = await Donation.findOne({ 
        fedapayTransactionId: transactionId 
      });

      if (!donation) {
        console.log(`Donation not found for transaction ID: ${transactionId}`);
        return NextResponse.json({ status: 'ok' }, { status: 200 });
      }

      // Update donation status based on FedaPay transaction status
      switch (status) {
        case 'approved':
        case 'completed':
          donation.status = 'completed';
          donation.completedAt = new Date();
          break;
        case 'canceled':
        case 'cancelled':
          donation.status = 'cancelled';
          break;
        case 'failed':
          donation.status = 'failed';
          break;
        default:
          donation.status = 'pending';
      }

      await donation.save();

      console.log(`Donation ${donation._id} updated to status: ${donation.status}`);
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
