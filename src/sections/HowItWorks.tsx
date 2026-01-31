import { useEffect, useRef, useState } from 'react';
import { Settings, PhoneCall, CalendarCheck, Mail, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'We Setup',
    description:
      'Your HVAC call flows, FAQs, integrations, and service catalog. We customize everything to match your business.',
    icon: Settings,
    color: 'bg-blue-500',
  },
  {
    number: '02',
    title: 'You Forward Calls',
    description:
      'Forward calls to the AI during after-hours, busy hours, or full-time. You control when it answers.',
    icon: PhoneCall,
    color: 'bg-purple-500',
  },
  {
    number: '03',
    title: 'AI Books Jobs',
    description:
      'Based on urgency, availability, and your rules. Emergency calls get prioritized automatically.',
    icon: CalendarCheck,
    color: 'bg-green-500',
  },
  {
    number: '04',
    title: 'You Get Leads',
    description:
      'Bookings sent directly to your email, CRM, or SMS. Real-time notifications keep you in the loop.',
    icon: Mail,
    color: 'bg-brand-red',
  },
];

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Section Divider Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            How It <span className="text-brand-red">Works</span>
          </h2>
          <p
            className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-600 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Get started in minutes. Our team handles the setup while you focus on
            running your business.
          </p>
        </div>

        {/* Steps - Horizontal Timeline */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-1 bg-gray-100">
            <div
              className="h-full bg-brand-red transition-all duration-1000"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <div
                  key={index}
                  className={`relative group transition-all duration-700 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Step Card */}
                  <div
                    className={`relative bg-white border-2 rounded-2xl p-6 transition-all duration-500 ${
                      isActive
                        ? 'border-brand-red shadow-glow -translate-y-2'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    {/* Step Number Badge */}
                    <div
                      className={`absolute -top-4 left-6 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                        isActive
                          ? 'bg-brand-red text-white scale-110'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
                        isActive
                          ? 'bg-brand-red text-white scale-110'
                          : 'bg-gray-100 text-gray-500 group-hover:bg-brand-red/10 group-hover:text-brand-red'
                      }`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Arrow (except last) */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                        <ArrowRight
                          className={`w-6 h-6 transition-all duration-500 ${
                            isActive
                              ? 'text-brand-red translate-x-1'
                              : 'text-gray-300'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Dots */}
        <div
          className={`flex justify-center gap-2 mt-12 transition-all duration-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeStep === index
                  ? 'bg-brand-red w-8'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
