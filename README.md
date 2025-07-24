# A.Ca.Ri.D - Association Caritative Rive Droite

A modern, dynamic website for the Association Caritative Rive Droite (A.Ca.Ri.D), a charitable organization based in Natitingou, Atacora region, Benin.

## Features

- **Dynamic Content**: Built with Next.js and MongoDB for dynamic content management
- **Payment Integration**: CinetPay integration for donations with support for:
  - MTN Money (Benin)
  - Moov Money (Benin)
  - Celtis Cash (Benin)
  - Visa cards
  - Mastercard
- **Working Carousels**: Smooth, interactive carousels for showcasing achievements and team members
- **Contact Forms**: Dynamic message sending and volunteer registration
- **Testimonials**: Dynamic testimonial system with approval workflow
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Accessibility**: WCAG compliant with proper semantic HTML
- **French Language**: Fully localized for French-speaking users

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Montserrat font
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Payment**: CinetPay for West African payment methods
- **Icons**: Font Awesome 6
- **Deployment Ready**: Vercel/Netlify compatible

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- MongoDB database (local or MongoDB Atlas)
- CinetPay account for payment processing

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd acarid-charity
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/acarid-charity
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/acarid-charity?retryWrites=true&w=majority

# CinetPay configuration
CINETPAY_API_KEY=your-cinetpay-api-key
CINETPAY_SITE_ID=your-cinetpay-site-id
CINETPAY_SECRET_KEY=your-cinetpay-secret-key
CINETPAY_ENVIRONMENT=SANDBOX
# Use 'PROD' for production

# Next.js configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the website.

## API Endpoints

### Messages
- `POST /api/messages` - Submit contact messages
- `GET /api/messages` - Get all messages (admin)

### Volunteers
- `POST /api/volunteers` - Submit volunteer applications
- `GET /api/volunteers` - Get all volunteer applications (admin)

### Donations
- `POST /api/donations` - Create donation with CinetPay
- `GET /api/donations` - Get donation statistics
- `POST /api/donations/webhook` - CinetPay webhook handler

### Testimonials
- `POST /api/testimonials` - Submit testimonials
- `GET /api/testimonials` - Get approved testimonials

## CinetPay Setup

1. Sign up at [CinetPay](https://cinetpay.com)
2. Get your API credentials from the dashboard:
   - API Key
   - Site ID  
   - Secret Key
3. Configure webhook URL: `https://yourdomain.com/api/donations/webhook`
4. Set up your payment methods (MTN Money, Moov Money, Celtis Cash, etc.)

## Database Schema

The application uses MongoDB with the following collections:

- **volunteers**: Volunteer applications
- **messages**: Contact messages
- **donations**: Donation records
- **testimonials**: User testimonials

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Whitelist your IP address
4. Create a database user
5. Get your connection string
6. Update `MONGODB_URI` in your environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Association Caritative Rive Droite (A.Ca.Ri.D)
- Location: Natitingou, Atacora, Bénin
- Email: contact@acarid.org

## Acknowledgments

- CinetPay for payment processing
- Unsplash for placeholder images
- Font Awesome for icons
- MongoDB for database hosting
- Vercel for deployment platform
