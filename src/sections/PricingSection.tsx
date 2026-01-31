import { useEffect, useRef, useState } from 'react';
import { Check, Star } from 'lucide-react';
import TrialModal from '@/components/TrialModal';

const setupFeatures = [
  'HVAC call flow design',
  'FAQ database build-out',
  'Service catalog mapping',
  'CRM/email/SMS integration',
  'Call routing & forwarding',
  'Onboarding & testing',
];

const monthlyFeatures = [
  'Seasonal updates',
  'FAQ changes & tuning',
  'Analytics & reporting',
  'Voice accuracy improvements',
  '24/7 support & monitoring',
];

export default function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#f8f8f8] overflow-hidden"
    >
      {/* Section Divider Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #e5e5e5 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-full px-4 py-2 mb-6 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <Star className="w-4 h-4 text-brand-red" />
            <span className="text-brand-red text-sm font-medium">
              Simple Pricing
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            One Setup Fee. <span className="text-brand-red">Low Monthly.</span>
          </h2>

          <p
            className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-600 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            No hidden fees. No long-term contracts. Start capturing every call
            today.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Setup Card */}
          <div
            className={`group bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all duration-700 border-2 border-transparent hover:border-gray-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="mb-8">
              <div className="text-sm font-medium text-gray-500 mb-2">
                One-Time Setup
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold">$1,493</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Everything you need to get started
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {setupFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-brand-red" />
                  </div>
                  <span className="text-gray-600 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Card - Featured */}
          <div
            className={`group relative bg-black rounded-3xl p-8 shadow-2xl transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {/* Featured Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-brand-red text-white text-sm font-bold px-4 py-1 rounded-full flex items-center gap-1">
                <Star className="w-4 h-4" />
                MOST POPULAR
              </div>
            </div>

            <div className="mb-8 pt-2">
              <div className="text-sm font-medium text-white/60 mb-2">
                Monthly Maintenance
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold text-white">$293</span>
                <span className="text-white/60">/mo</span>
              </div>
              <p className="text-white/60 text-sm mt-2">
                Ongoing support and optimization
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {monthlyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 bg-brand-red/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-brand-red" />
                  </div>
                  <span className="text-white/80 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* ROI Highlight */}
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-1">Average ROI</div>
              <div className="text-white font-bold text-lg">
                10x return in first month
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* CTA */}
        <div
          className={`flex flex-col items-center gap-3 mt-12 transition-all duration-500 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <TrialModal>
            <button className="group bg-brand-red text-white px-10 py-5 text-lg font-bold hover:brightness-110 transition-all duration-300 hover:scale-105 flex items-center gap-3 animate-pulse-glow">
              Start Your Free 7-Day Trial
            </button>
          </TrialModal>
          <p className="text-sm text-gray-500">*No attachment issues</p>
        </div>

        {/* Trust Indicators */}
        <div
          className={`flex flex-wrap justify-center gap-8 mt-12 transition-all duration-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Check className="w-4 h-4 text-brand-red" />
            No credit card required
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Check className="w-4 h-4 text-brand-red" />
            Cancel anytime
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Check className="w-4 h-4 text-brand-red" />
            48-hour setup
          </div>
        </div>
      </div>
    </section>
  );
}
