import { useEffect, useRef, useState } from 'react';
import { TrendingUp, PhoneOff, Users, AlertTriangle } from 'lucide-react';

const stats = [
  {
    value: '81%',
    label: 'of customers hang up if they reach voicemail',
    icon: PhoneOff,
  },
  {
    value: '3x',
    label: 'more calls during seasonal peak times',
    icon: TrendingUp,
  },
  {
    value: '0',
    label: 'technicians available to answer phones on jobs',
    icon: Users,
  },
];

export default function ProblemSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValues, setDisplayValues] = useState(['0', '0', '0']);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate numbers
          setTimeout(() => {
            setDisplayValues(['81%', '3x', '0']);
          }, 500);
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
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Red Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent" />

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
            <AlertTriangle className="w-4 h-4 text-brand-red" />
            <span className="text-brand-red text-sm font-medium">
              The Problem
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Voicemail Isn't a
            <span className="text-brand-red"> Sales Strategy</span>
          </h2>

          <p
            className={`text-lg text-white/60 max-w-2xl mx-auto transition-all duration-600 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Customers don't wait. They call the next HVAC company when no one
            answers. Every missed call = a lost job.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-brand-red/30 transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-brand-red/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-brand-red/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-red/30 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-brand-red" />
                  </div>

                  <div className="text-5xl sm:text-6xl font-bold text-white mb-3 group-hover:scale-105 transition-transform duration-300 origin-left">
                    {displayValues[index]}
                  </div>

                  <p className="text-white/60">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
