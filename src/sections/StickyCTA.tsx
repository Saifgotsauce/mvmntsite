import { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import TrialModal from '@/components/TrialModal';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (approximately)
      if (window.scrollY > 600 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 500) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => setIsDismissed(true), 300); // Wait for animation to complete
  };

  if (isDismissed) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-black/95 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left Content */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-red/20 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <div className="text-white font-semibold">
                  Start Your Free 7-Day Trial
                </div>
                <div className="text-white/50 text-sm">
                  No credit card required • Cancel anytime
                </div>
              </div>
            </div>

            {/* Mobile Text */}
            <div className="sm:hidden text-white font-semibold">
              Free 7-Day Trial
            </div>

            {/* Right Side: CTA Button + Close */}
            <div className="flex items-center gap-2">
              <TrialModal>
                <button className="bg-brand-red text-white px-6 py-3 font-semibold hover:brightness-110 transition-all duration-300 hover:scale-105 flex items-center gap-2 whitespace-nowrap">
                  <Phone className="w-4 h-4 sm:hidden" />
                  <span className="hidden sm:inline">Start Free Trial</span>
                  <span className="sm:hidden">Start Trial</span>
                </button>
              </TrialModal>
              
              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                aria-label="Dismiss"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
