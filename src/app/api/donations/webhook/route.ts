import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Donation } from '@/models';
import crypto from 'crypto';

// CinetPay webhook verification (using direct approach)

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    console.log('CinetPay Webhook received:', body);

    // CinetPay webhook structure
    const { cpm_trans_id, cpm_trans_status, cpm_amount, cpm_currency, cpm_custom, cpm_site_id } = body;

    // Verify the webhook is from CinetPay
    if (cpm_site_id !== process.env.CINETPAY_SITE_ID) {
      console.error('Invalid site ID in webhook');
      return NextResponse.json(
        { error: 'Invalid site ID' },
        { status: 401 }
      );
    }

    if (!cpm_trans_id) {
      console.error('Missing transaction ID in webhook');
      return NextResponse.json(
        { error: 'Missing transaction ID' },
        { status: 400 }
      );
    }

    console.log(`Processing CinetPay transaction ${cpm_trans_id} with status: ${cpm_trans_status}`);

    // Find the donation by CinetPay transaction ID
    const donation = await Donation.findOne({ 
      cinetpayTransactionId: cpm_trans_id 
    });

    if (!donation) {
      console.log(`Donation not found for transaction ID: ${cpm_trans_id}`);
      return NextResponse.json({ status: 'ok' }, { status: 200 });
    }

    const previousStatus = donation.status;

    // Update donation status based on CinetPay transaction status
    switch (cpm_trans_status) {
      case 'ACCEPTED':
      case 'SUCCESS':
        donation.status = 'completed';
        donation.completedAt = new Date();
        break;
      case 'REFUSED':
      case 'CANCELLED':
        donation.status = 'cancelled';
        break;
      case 'FAILED':
        donation.status = 'failed';
        break;
      case 'PENDING':
        donation.status = 'pending';
        break;
      default:
        console.log(`Unknown CinetPay status: ${cpm_trans_status}`);
        // Don't change status for unknown statuses
        return NextResponse.json({ status: 'ok' }, { status: 200 });
    }

    // Save only if status changed
    if (previousStatus !== donation.status) {
      await donation.save();
      console.log(`Donation ${donation._id} updated from ${previousStatus} to ${donation.status}`);
      
      // Add additional actions like sending confirmation email
      if (donation.status === 'completed') {
        // Logic for completed donation (email, notification, etc.)
        console.log(`✅ Donation completed: ${donation._id} - Amount: ${donation.amount} FCFA`);
      }
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('CinetPay Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// GET method to test webhook availability
export async function GET() {
  return NextResponse.json({
    message: 'CinetPay Webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
}
