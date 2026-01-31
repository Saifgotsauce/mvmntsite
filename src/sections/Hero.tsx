import { useEffect, useState } from 'react';
import { ArrowRight, Phone, CheckCircle } from 'lucide-react';
import TrialModal from '@/components/TrialModal';

const trustBadges = [
  'No credit card required',
  'Setup in 48 hours',
  'Cancel anytime',
];

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-hvac.jpg"
          alt="HVAC Technician"
          className="w-full h-full object-cover"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Pre-headline Badge */}
          <div
            className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              Trusted by 20+ HVAC Companies
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
            <span
              className={`block text-white text-shadow-strong transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Never Miss Another
            </span>
            <span
              className={`block text-brand-red text-shadow-strong transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              HVAC Job Again.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-lg sm:text-xl text-white/80 mb-8 max-w-xl transition-all duration-600 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            Our AI receptionist answers calls 24/7, books appointments, and
            captures every lead — while you focus on the work that matters.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-start gap-4 mb-8 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <TrialModal>
              <button className="group bg-brand-red text-white px-8 py-4 text-lg font-bold hover:brightness-110 transition-all duration-300 hover:scale-105 flex items-center gap-3 animate-pulse-glow">
                <Phone className="w-5 h-5" />
                Start Your Free 7-Day Trial
              </button>
            </TrialModal>
            <button
              onClick={() => {
                const el = document.getElementById('ai-demo');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group text-white/90 hover:text-white transition-all duration-300 flex items-center gap-2 px-4 py-4"
            >
              Or talk to our AI first
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          {/* Trust Badges */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-white/70 text-sm"
              >
                <CheckCircle className="w-4 h-4 text-brand-red" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
