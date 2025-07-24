# Migration from FedaPay to CinetPay

## Overview
This document outlines the successful migration from FedaPay to CinetPay for the A.Ca.Ri.D charity donation system.

## Changes Made

### 1. Environment Variables
**Old (.env.local):**
```env
FEDAPAY_SECRET_KEY=your-fedapay-secret-key
FEDAPAY_ENVIRONMENT=sandbox
FEDAPAY_WEBHOOK_SECRET=your-webhook-secret
```

**New (.env.local):**
```env
CINETPAY_API_KEY=your-cinetpay-api-key
CINETPAY_SITE_ID=your-cinetpay-site-id
CINETPAY_SECRET_KEY=your-cinetpay-secret-key
CINETPAY_ENVIRONMENT=SANDBOX
```

### 2. Database Schema
**Updated donation model:**
- Changed `fedapayTransactionId` → `cinetpayTransactionId`
- Field remains unique and sparse

### 3. API Changes

#### Donations API (`/api/donations/route.ts`)
- **Payment Integration**: Direct HTTP calls to CinetPay API instead of SDK
- **Transaction Flow**: 
  1. Create donation record in database
  2. Generate unique transaction ID
  3. Send payment request to CinetPay
  4. Return payment URL to frontend
- **Error Handling**: Improved error messages and debug information

#### Webhook Handler (`/api/donations/webhook/route.ts`)
- **Webhook Structure**: Updated to handle CinetPay webhook format
- **Status Mapping**: 
  - `ACCEPTED`/`SUCCESS` → `completed`
  - `REFUSED`/`CANCELLED` → `cancelled`
  - `FAILED` → `failed`
  - `PENDING` → `pending`

### 4. Frontend Updates

#### Success Page (`/donation/success/page.tsx`)
- Added support for CinetPay return parameters
- Display transaction details from URL parameters
- Better error handling and user feedback

#### Cancel Page (`/donation/cancel/page.tsx`)
- Updated to handle CinetPay cancellation flow
- Maintained existing user experience

### 5. Payment Methods Supported
- **MTN Money** (Benin)
- **Moov Money** (Benin) 
- **Celtis Cash** (Benin)
- **Visa Cards**
- **Mastercard**

## Configuration Steps

### 1. Get CinetPay Credentials
1. Sign up at [CinetPay](https://cinetpay.com)
2. Access your dashboard
3. Navigate to API settings
4. Get your:
   - API Key
   - Site ID
   - Secret Key

### 2. Update Environment Variables
Replace the old FedaPay variables with CinetPay credentials in your `.env.local` file.

### 3. Configure Webhook URL
Set your webhook URL in CinetPay dashboard:
```
https://yourdomain.com/api/donations/webhook
```

## Testing

### Sandbox Testing
- Use `CINETPAY_ENVIRONMENT=SANDBOX` 
- Test with sandbox credentials
- Verify payment flow and webhook handling

### Production Deployment
- Switch to `CINETPAY_ENVIRONMENT=PROD`
- Use production API credentials
- Update webhook URL to production domain

## API Endpoints

### Create Donation
```http
POST /api/donations
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "amount": 1000,
  "reason": "education",
  "paymentMethod": "mtn_money"
}
```

**Response:**
```json
{
  "message": "Transaction créée avec succès.",
  "transactionId": "mongodb_document_id",
  "cinetpayTransactionId": "donation_timestamp_random",
  "paymentUrl": "https://checkout.cinetpay.com/payment/..."
}
```

### Webhook Handler
```http
POST /api/donations/webhook
Content-Type: application/json

{
  "cpm_trans_id": "donation_timestamp_random",
  "cpm_trans_status": "ACCEPTED",
  "cpm_amount": "1000",
  "cpm_currency": "XOF",
  "cpm_site_id": "your_site_id"
}
```

## Benefits of Migration

1. **Better Regional Support**: CinetPay has strong presence in West Africa
2. **More Payment Options**: Enhanced mobile money support for Benin
3. **Improved Documentation**: Better API documentation and support
4. **Competitive Fees**: More favorable transaction fees
5. **Local Currency**: Native XOF (West African CFA franc) support

## Migration Checklist

- [x] Install required dependencies (`axios`)
- [x] Update environment variables
- [x] Modify database schema
- [x] Update donation API endpoint
- [x] Update webhook handler
- [x] Update success/cancel pages
- [x] Update documentation (README.md)
- [x] Test payment flow
- [ ] Configure production webhook URL
- [ ] Test with real payment methods
- [ ] Monitor transaction processing

## Support

For issues related to:
- **CinetPay Integration**: [CinetPay Support](https://cinetpay.com/support)
- **Application Issues**: Check server logs and error handling
- **Webhook Problems**: Verify webhook URL and payload format

## Notes

- All existing donation records are preserved
- Old FedaPay transaction IDs remain in database for historical reference
- Payment flow remains the same from user perspective
- Enhanced error handling and debugging capabilities added
