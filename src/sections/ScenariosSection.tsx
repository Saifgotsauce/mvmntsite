import { useEffect, useRef, useState } from 'react';
import {
  ThermometerSnowflake,
  Wrench,
  Sparkles,
  Home,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

const scenarios = [
  {
    title: "Emergency 'No Heat / No Cooling' Calls",
    description:
      'Instant response for urgent situations. The AI prioritizes emergencies and dispatches techs immediately.',
    icon: ThermometerSnowflake,
  },
  {
    title: 'Service & Maintenance Bookings',
    description:
      'Seamlessly schedule routine maintenance and service calls based on your availability.',
    icon: Wrench,
  },
  {
    title: 'Tune-Up Specials',
    description:
      'Handle promotional calls and seasonal tune-up inquiries with automated upselling.',
    icon: Sparkles,
  },
  {
    title: 'New System Install Inquiries',
    description:
      'Capture high-value install leads with detailed qualification questions.',
    icon: Home,
  },
  {
    title: 'Warranty & Brand Questions',
    description:
      'Answer common warranty and brand-specific questions from your knowledge base.',
    icon: ShieldCheck,
  },
  {
    title: 'Financing & Availability Questions',
    description:
      'Provide financing options and check real-time availability for appointments.',
    icon: CreditCard,
  },
];

export default function ScenariosSection() {
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
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50/50"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Built for <span className="text-brand-red">Real HVAC</span>
            <br />
            Scenarios
          </h2>
        </div>

        {/* Scenarios Grid - Honeycomb Style */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            const isOffset = index >= 3;

            return (
              <div
                key={index}
                className={`group transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                } ${isOffset ? 'lg:translate-x-12' : ''}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="bg-white border border-gray-100 rounded-2xl p-6 h-full hover:border-brand-red/30 hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-brand-light-gray rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-red group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-brand-red group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold mb-2 group-hover:text-brand-red transition-colors duration-300">
                    {scenario.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {scenario.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
