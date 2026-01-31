import { useEffect, useRef, useState } from 'react';
import { X, UserPlus, Bot } from 'lucide-react';

const comparisons = [
  {
    title: 'Missing Calls',
    description: 'Lost revenue, frustrated customers, zero visibility',
    icon: X,
    color: 'gray',
  },
  {
    title: 'Hiring Staff',
    description: '$3,000–$5,000/mo + training + turnover',
    icon: UserPlus,
    color: 'gray',
  },
  {
    title: 'MVMNT. AI',
    description: '$1,493 + $293/mo, 24/7 coverage, no missed leads',
    icon: Bot,
    color: 'red',
  },
];

export default function ComparisonSection() {
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
            Why HVAC Companies <span className="text-brand-red">Switch to AI</span>
          </h2>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {comparisons.map((item, index) => {
            const Icon = item.icon;
            const isHighlighted = item.color === 'red';

            return (
              <div
                key={index}
                className={`group transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <div
                  className={`h-full rounded-2xl p-6 sm:p-8 transition-all duration-500 ${
                    isHighlighted
                      ? 'bg-white border-2 border-brand-red shadow-glow hover:-translate-y-3'
                      : 'bg-white border border-gray-100 hover:border-gray-200 hover:-translate-y-2'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                      isHighlighted
                        ? 'bg-brand-red text-white'
                        : 'bg-gray-100 text-gray-500 group-hover:bg-brand-red/10 group-hover:text-brand-red'
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <h3
                    className={`text-xl font-bold mb-3 ${
                      isHighlighted ? 'text-brand-red' : 'text-black'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>

                  {/* Highlight badge */}
                  {isHighlighted && (
                    <div className="mt-6 inline-flex items-center gap-2 bg-brand-red/10 text-brand-red text-sm font-semibold px-4 py-2 rounded-full">
                      <Bot className="w-4 h-4" />
                      Best Choice
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
