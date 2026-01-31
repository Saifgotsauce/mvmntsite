import { useEffect, useState } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import ProblemSection from './sections/ProblemSection';
import SolutionSection from './sections/SolutionSection';
import HowItWorks from './sections/HowItWorks';
import PricingSection from './sections/PricingSection';
import RevenueCalculator from './sections/RevenueCalculator';
import TestimonialsSection from './sections/TestimonialsSection';
import FAQSection from './sections/FAQSection';
import Footer from './sections/Footer';
import StickyCTA from './sections/StickyCTA';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger initial load animation
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`min-h-screen bg-white transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <Navbar scrollY={scrollY} />
      
      <main>
        {/* Section 1: Hero - Full bleed background image */}
        <Hero />
        
        {/* Section 2: Problem - Dark background */}
        <ProblemSection />
        
        {/* Section 3: Solution - Light gray background */}
        <SolutionSection />
        
        {/* Section 4: How It Works - White background */}
        <HowItWorks />
        
        {/* Section 5: Revenue Calculator - White with gradient accent */}
        <RevenueCalculator />
        
        {/* Section 6: Pricing - Light gray background */}
        <PricingSection />
        
        {/* Section 7: Testimonials - Dark background */}
        <TestimonialsSection />
        
        {/* Section 8: FAQ - White background */}
        <FAQSection />
        
        {/* Section 9: Footer - Dark with CTA */}
        <Footer />
      </main>
      
      {/* Sticky CTA Bar */}
      <StickyCTA />
    </div>
  );
}

export default App;
