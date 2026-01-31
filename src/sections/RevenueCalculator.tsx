import { useEffect, useRef, useState, useCallback } from 'react';
import { DollarSign, Calculator, TrendingUp } from 'lucide-react';

export default function RevenueCalculator() {
  const [isVisible, setIsVisible] = useState(false);
  const [missedCalls, setMissedCalls] = useState(15);
  const [ticketValue, setTicketValue] = useState(350);
  const [closeRate, setCloseRate] = useState(40);
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

  const calculateRevenue = useCallback(() => {
    const weekly = missedCalls * (closeRate / 100) * ticketValue;
    const monthly = weekly * 4;
    const yearly = weekly * 52;
    return { weekly, monthly, yearly };
  }, [missedCalls, ticketValue, closeRate]);

  const { weekly, monthly, yearly } = calculateRevenue();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Section Divider Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-red/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <div
              className={`inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-full px-4 py-2 mb-6 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-brand-red" />
              <span className="text-brand-red text-sm font-medium">
                Revenue Calculator
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
              How Much Revenue Are
              <span className="text-brand-red"> You Losing?</span>
            </h2>

            <p
              className={`text-lg text-gray-600 mb-8 transition-all duration-600 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Most HVAC companies miss between 5–35 calls per week. See exactly
              how much that's costing your business.
            </p>

            {/* Calculator Inputs */}
            <div
              className={`bg-[#f8f8f8] rounded-2xl p-6 sm:p-8 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-12'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-red/10 rounded-lg flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-brand-red" />
                </div>
                <h3 className="font-bold">Your Numbers</h3>
              </div>

              <div className="space-y-6">
                {/* Missed Calls Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Missed Calls Per Week
                    </label>
                    <span className="text-sm font-bold text-brand-red">
                      {missedCalls}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={missedCalls}
                    onChange={(e) => setMissedCalls(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{ accentColor: '#E30614' }}
                  />
                </div>

                {/* Close Rate Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Close Rate
                    </label>
                    <span className="text-sm font-bold text-brand-red">
                      {closeRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={closeRate}
                    onChange={(e) => setCloseRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{ accentColor: '#E30614' }}
                  />
                </div>

                {/* Ticket Value Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Average Ticket Value
                    </label>
                    <span className="text-sm font-bold text-brand-red">
                      ${ticketValue}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="1000"
                    step="25"
                    value={ticketValue}
                    onChange={(e) => setTicketValue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{ accentColor: '#E30614' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Results */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-red/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-brand-red" />
              </div>
              <h3 className="font-bold text-xl">Your Lost Revenue</h3>
            </div>

            <div className="space-y-4">
              {/* Weekly */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
                <div className="text-sm text-gray-500 mb-1">Weekly</div>
                <div className="text-4xl font-bold text-gray-800">
                  {formatCurrency(weekly)}
                </div>
              </div>

              {/* Monthly */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
                <div className="text-sm text-gray-500 mb-1">Monthly</div>
                <div className="text-4xl font-bold text-gray-800">
                  {formatCurrency(monthly)}
                </div>
              </div>

              {/* Yearly - Highlighted */}
              <div className="bg-black rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/20 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="text-white/60 text-sm mb-1">Yearly</div>
                  <div className="text-5xl font-bold text-white">
                    {formatCurrency(yearly)}
                  </div>
                </div>
              </div>
            </div>

            <p
              className={`text-sm text-gray-500 mt-6 transition-all duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              And that's just from missed calls — not including after-hours
              emergencies or high-value installs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
