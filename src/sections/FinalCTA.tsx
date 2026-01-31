import { useEffect, useRef, useState } from 'react';
import { Phone } from 'lucide-react';

export default function FinalCTA() {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToDemo = () => {
    const element = document.querySelector('#demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="stop-leak"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-brand-red/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Stop the Leak — Start Your{' '}
            <span className="text-brand-red">Free 7-day Trial</span>
          </h2>

          <div
            className={`mb-8 transition-all duration-600 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              The Math Is Crazy Simple
            </h3>
            <p className="text-lg text-gray-600">
              One missed job can cost you{' '}
              <span className="font-bold text-black">$300–$500</span>. One missed
              install can cost you{' '}
              <span className="font-bold text-black">$8,000–$15,000</span>. For{' '}
              <span className="font-bold text-brand-red">$1,493 + $293/month</span>,
              MVMNT. makes sure that never happens again.
            </p>
          </div>

          <div
            className={`flex flex-col items-center gap-2 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <button
              onClick={scrollToDemo}
              className="group bg-black text-white px-10 py-5 text-lg sm:text-xl font-bold hover:bg-gray-900 transition-all duration-300 hover:scale-105 flex items-center gap-3 animate-pulse-glow"
            >
              <Phone className="w-6 h-6" />
              <span className="text-brand-red">Free</span> 7-day Trial
            </button>
            <p className="text-sm text-gray-400">*No attachment issues</p>
          </div>
        </div>
      </div>
    </section>
  );
}
