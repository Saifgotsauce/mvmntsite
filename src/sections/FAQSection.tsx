import { useEffect, useRef, useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Does it sound robotic?',
    answer:
      'Not at all. Our AI is powered by ElevenLabs, the industry leader in voice AI. It sounds natural, professional, and conversational — your customers won\'t know they\'re talking to AI unless you tell them.',
  },
  {
    question: 'How does booking work?',
    answer:
      'The AI checks your real-time availability and books appointments directly into your calendar. It handles rescheduling, cancellations, and can even send confirmation texts to customers.',
  },
  {
    question: 'Will it handle emergency service?',
    answer:
      'Absolutely. The AI is trained to identify emergency situations (no heat, no cooling, gas leaks) and can immediately dispatch your on-call technician while capturing all the details.',
  },
  {
    question: 'Can I use my current phone number?',
    answer:
      'Yes! You can forward your existing business number to our AI, or we can provide a new number. Most clients forward calls after-hours or when lines are busy.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Typical setup is 5-7 business days. We\'ll work with you to customize call flows, FAQs, and integrations to match your business exactly.',
  },
  {
    question: 'Do I need tech skills?',
    answer:
      'Zero tech skills required. We handle all the setup, integration, and maintenance. You just forward your calls and watch the bookings come in.',
  },
];

export default function FAQSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Section Divider Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-brand-red/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-full px-4 py-2 mb-6 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-brand-red" />
            <span className="text-brand-red text-sm font-medium">
              Got Questions?
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Frequently <span className="text-brand-red">Asked</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${200 + index * 80}ms` }}
              >
                <div
                  className={`bg-[#f8f8f8] rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'ring-2 ring-brand-red/20' : ''
                  }`}
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-100 transition-colors duration-300"
                  >
                    <span className="font-semibold text-lg pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-brand-red text-white'
                          : 'bg-white text-gray-500'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {/* Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
