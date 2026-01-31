import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Mail, CheckCircle } from 'lucide-react';
import TrialModal from '@/components/TrialModal';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-white">
      {/* Final CTA Banner */}
      <div
        id="demo"
        className="relative py-20 lg:py-28 overflow-hidden"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-transparent to-brand-red/10" />
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Ready to Never Miss
            <br />
            <span className="text-brand-red">Another HVAC Job?</span>
          </h2>

          <p
            className={`text-lg text-white/60 max-w-2xl mx-auto mb-10 transition-all duration-600 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Join 20+ HVAC companies capturing every call 24/7. Start your free
            trial today — no credit card required.
          </p>

          <div
            className={`flex flex-col items-center gap-4 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <TrialModal>
              <button className="group bg-brand-red text-white px-10 py-5 text-lg font-bold hover:brightness-110 transition-all duration-300 hover:scale-105 flex items-center gap-3 animate-pulse-glow">
                Start Your Free 7-Day Trial
              </button>
            </TrialModal>
            <p className="text-sm text-white/40">*No attachment issues</p>
          </div>

          {/* Trust Badges */}
          <div
            className={`flex flex-wrap justify-center gap-6 mt-10 transition-all duration-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <CheckCircle className="w-4 h-4 text-brand-red" />
              48-hour setup
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <CheckCircle className="w-4 h-4 text-brand-red" />
              No credit card required
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <CheckCircle className="w-4 h-4 text-brand-red" />
              Cancel anytime
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="border-t border-white/10 py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Logo & Contact */}
            <div
              className={`flex flex-col sm:flex-row items-center gap-6 transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <a href="#" className="text-3xl font-bold">
                MVMNT<span className="text-brand-red">.</span>
              </a>
              <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300">
                <Mail className="w-4 h-4" />
                <a href="mailto:owner@mvmntmarketing.com">
                  owner@mvmntmarketing.com
                </a>
              </div>
            </div>

            {/* CTA */}
            <div
              className={`transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-4'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <TrialModal>
                <button className="bg-white text-black px-6 py-3 font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                  Free 7-Day Trial
                </button>
              </TrialModal>
            </div>
          </div>

          {/* Copyright */}
          <div
            className={`mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <p className="text-sm text-white/40">
              © 2024 MVMNT. All rights reserved.
            </p>

            {/* Powered By */}
            <div className="flex items-center gap-2 text-sm text-white/40">
              <span>Powered by</span>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                    fill="currentColor"
                  />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
                <span className="font-medium">ElevenLabs</span>
              </div>
              <a
                href="https://elevenlabs.io/conversational-ai"
                target="blank"
                rel="noopener noreferrer"
                className="text-brand-red hover:underline flex items-center gap-1"
              >
                Agents
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
