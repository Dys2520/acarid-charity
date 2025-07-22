'use client';
import Header from './Header';
import HeroSection from './HeroSection';
import RealisationsSection from './RealisationsSection';
import AboutSection from './AboutSection';
import MembersSection from './MembersSection';
import TestimonialsSection from './TestimonialsSection';
import ContactSection from './ContactSection';
import DonationSection from './DonationSection';
import VolunteerSection from './VolunteerSection';
import Footer from './Footer';

export default function CharityWebsite() {
  
  return (
    <div className="font-montserrat bg-gray-50" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <Header />
      <HeroSection />
      <RealisationsSection />
      <AboutSection />
      <MembersSection />
      <TestimonialsSection />
      <ContactSection />
      <DonationSection />
      <VolunteerSection />
      <Footer />
    </div>
  );
}
