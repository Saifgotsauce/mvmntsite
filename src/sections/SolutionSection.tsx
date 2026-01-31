import { useEffect, useRef, useState } from 'react';
import { Check, Zap, Clock, Shield, MessageSquare, Filter, Phone, Send } from 'lucide-react';

const features = [
  {
    title: '24/7 Call Answering',
    description: 'Never miss a call, even at 2 AM or during holidays.',
    icon: Clock,
  },
  {
    title: 'Instant Booking',
    description: 'Appointments scheduled directly into your calendar.',
    icon: Zap,
  },
  {
    title: 'Lead Capture',
    description: 'Full customer details: name, phone, address, service needed.',
    icon: MessageSquare,
  },
  {
    title: 'HVAC Expertise',
    description: 'Trained on warranties, brands, pricing, and common issues.',
    icon: Shield,
  },
  {
    title: 'Spam Filtering',
    description: 'Automatically filters telemarketers and robocalls.',
    icon: Filter,
  },
  {
    title: 'Your Phone Number',
    description: 'Works with your existing business line.',
    icon: Phone,
  },
  {
    title: 'CRM Integration',
    description: 'Leads sent to email, SMS, or your existing CRM.',
    icon: Send,
  },
];

export default function SolutionSection() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#f8f8f8]"
    >
      {/* Section Divider Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 overflow-hidden">
          <div>
            <div
              className={`inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-full px-4 py-2 mb-6 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <Check className="w-4 h-4 text-brand-red" />
              <span className="text-brand-red text-sm font-medium">
                The Solution
              </span>
            </div>

            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              Your AI Receptionist
              <span className="text-brand-red"> Never Sleeps</span>
            </h2>

            <p
              className={`text-lg text-gray-600 transition-all duration-600 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              While you're on job sites, our AI handles every call professionally.
              It answers instantly, asks the right questions, and books
              appointments — so you never lose another lead.
            </p>
          </div>

          {/* Stats Summary */}
          <div
            className={`grid grid-cols-2 gap-6 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="text-4xl font-bold text-brand-red mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Always Available</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="text-4xl font-bold text-black mb-2">&lt;3s</div>
              <div className="text-gray-600 text-sm">Answer Time</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="text-4xl font-bold text-black mb-2">100%</div>
              <div className="text-gray-600 text-sm">Call Capture</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="text-4xl font-bold text-brand-red mb-2">2x</div>
              <div className="text-gray-600 text-sm">More Bookings</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${400 + index * 50}ms` }}
              >
                <div className="w-12 h-12 bg-brand-light-gray rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-red group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 text-brand-red group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-brand-red transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
