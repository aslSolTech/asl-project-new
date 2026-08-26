'use client';

import Footer from '../footer/Footer';
import Header from '../header/Header';
import Hero from '../hero/Hero';
import StatsSection from '../stats/StatsSection';
import ServicesSection from '../services/ServicesSection';
import JourneySection from '../journey/JourneySection';
import PricingSection from '../pricing/PricingSection';
import TestimonialsSection from '../testimonials/TestimonialsSection';
import FaqsSection from '../faqs/Faqs';
import ContactSection from '../contact/ContactSection';
import CtaDownloadButton from '../ctadownloads/CtaDownloadButton';

function Homepage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation - fixed, transparent at top */}
      <Header />

      {/* 1. Hero — pt-20 to offset fixed header */}
      <div id="home" className="pt-20">
        <Hero />
      </div>

      {/* 2. Stats */}
      <div id="stats">
        <StatsSection />
      </div>

      {/* 3. Services Bento Grid */}
      <div id="services">
        <ServicesSection />
      </div>

      {/* 4. How It Works (Journey) */}
      <div id="journey">
        <JourneySection />
      </div>

      {/* 5. Pricing Plans */}
      <div id="pricing">
        <PricingSection />
      </div>

      {/* 6. Service Providers + Ecosystem */}
      {/* <div id="providers">
        <ProvidersSection />
      </div> */}

      {/* 7. Testimonials Marquee */}
      <div id="testimonials">
        <TestimonialsSection />
      </div>

      {/* 8. Download CTA */}
      <div id="download">
        <CtaDownloadButton />
      </div>

      {/* 9. FAQs Section */}
      <div id="faqs">
        <FaqsSection />
      </div>

      {/* 10. Contact Form */}
      <div id="contact">
        <ContactSection />
      </div>

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}

export default Homepage;