import { useEffect, useRef, useState } from 'react';
import { Mic, Volume2, Play } from 'lucide-react';
import VoiceModal from '@/components/VoiceModal';

export default function AIDemoSection() {
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
      id="ai-demo"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-[#f8f8f8] to-white overflow-hidden"
    >
      {/* Section Divider Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            className={`inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-full px-4 py-2 mb-6 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <Mic className="w-4 h-4 text-brand-red" />
            <span className="text-brand-red text-sm font-medium">
              Live Demo
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            This Is What It
            <br />
            <span className="text-brand-red">Sounds Like</span>
          </h2>
          <p
            className={`text-lg text-gray-600 transition-all duration-600 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            The AI is trained on real HVAC scenarios so it sounds natural,
            professional, and helpful — not robotic. It knows how to handle
            emergency "no heat" calls, tune-ups, maintenance plans, and new
            system installs.
          </p>
        </div>

        {/* Audio Visualizer */}
        <div
          className={`flex justify-center gap-1 mb-12 h-16 items-end transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-gradient-to-t from-brand-red to-red-400 rounded-full animate-pulse"
              style={{
                height: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* ElevenLabs Agent Widget - Modal Trigger */}
        <div
          className={`max-w-2xl mx-auto transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-16'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Widget Header */}
            <div className="bg-black px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">MVMNT AI Agent</div>
                  <div className="flex items-center gap-1 text-xs text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Online & Ready to Talk
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Preview Area */}
            <div className="p-8 sm:p-12 min-h-[450px] flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white relative">
              {/* Microphone Icon */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-brand-red/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-brand-red to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                  <Mic className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Text */}
              <h3 className="text-2xl font-bold text-center mb-3">
                Ready to hear how it sounds?
              </h3>
              <p className="text-gray-600 text-center mb-8 max-w-md">
                Click below to start a live conversation with our AI agent. Ask about furnace repairs, AC tune-ups, or schedule service.
              </p>

              {/* Try Demo Button - Wrapped in Modal */}
              <VoiceModal>
                <button className="group bg-brand-red text-white px-10 py-5 text-lg font-bold hover:brightness-110 transition-all duration-300 hover:scale-105 flex items-center gap-3 shadow-2xl animate-pulse-glow">
                  <Play className="w-6 h-6" />
                  Try Live Demo
                </button>
              </VoiceModal>

              <p className="text-xs text-gray-400 mt-4">
                *Click to open the AI voice agent
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 text-center">
                <span className="font-semibold">Try saying:</span> "My furnace isn't working" or 
                "I need to schedule an AC tune-up"
              </p>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div
          className={`grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12 transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Mic className="w-6 h-6 text-brand-red" />
            </div>
            <h4 className="font-semibold mb-1">Natural Voice</h4>
            <p className="text-gray-500 text-sm">Sounds human, not robotic</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-semibold mb-1">HVAC Trained</h4>
            <p className="text-gray-500 text-sm">Knows industry terminology</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-semibold mb-1">Instant Response</h4>
            <p className="text-gray-500 text-sm">Answers in under 3 seconds</p>
          </div>
        </div>
      </div>
    </section>
  );
}
