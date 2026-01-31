import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Volume2, X, Mic } from 'lucide-react';

interface VoiceModalProps {
  children: React.ReactNode;
}

export default function VoiceModal({ children }: VoiceModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || scriptLoaded) return;

    // Override AudioWorklet loader once
    if (!(window as any).__elevenlabsWorkletOverride) {
      (window as any).__elevenlabsWorkletOverride = true;

      const originalAddModule =
        AudioWorklet.prototype.addModule;

      AudioWorklet.prototype.addModule = function (
        url: string,
        options?: any
      ) {
        console.log("Worklet request:", url);

        // Redirect processors to local file
        if (
          url &&
          (url.includes("rawAudioProcessor") ||
            url.includes("audioConcatProcessor"))
        ) {
          console.log("Redirecting processor to local file");

          return originalAddModule.call(
            this,
            "/worklets/rawAudioProcessor.worklet.js",
            options
          );
        }

        return originalAddModule.call(this, url, options);
      };
    }

    const existingScript = document.getElementById(
      'elevenlabs-convai-script'
    );

    const initializeWidget = () => {
      try {
        const container = document.getElementById(
          'elevenlabs-widget-container'
        );

        if (container && !container.hasChildNodes()) {
          const widget =
            document.createElement('elevenlabs-convai');

          widget.setAttribute(
            'agent-id',
            'agent_4501kf5q61e9fh9vnmqjnn5jry8e'
          );

          container.appendChild(widget);
          setScriptLoaded(true);
        }
      } catch (err) {
        console.error(
          'Error creating ElevenLabs widget:',
          err
        );
        setError(
          'Failed to load AI agent. Please try again.'
        );
      }
    };

    if (existingScript) {
      setTimeout(initializeWidget, 100);
    } else {
      const script = document.createElement('script');
      script.id = 'elevenlabs-convai-script';
      script.src =
        'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;

      script.onload = () => {
        setTimeout(initializeWidget, 100);
      };

      script.onerror = () => {
        console.error(
          'Failed to load ElevenLabs script'
        );
        setError(
          'Failed to load AI agent. Please check your connection.'
        );
      };

      document.body.appendChild(script);
    }
  }, [isOpen, scriptLoaded]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) setError(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-2xl bg-white border-gray-200 text-black p-0 overflow-hidden max-h-[90vh]">
        <button
          onClick={() => handleOpenChange(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <DialogHeader className="bg-black px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-white">
                MVMNT AI Agent
              </DialogTitle>

              <div className="flex items-center gap-1 text-xs text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Online & Ready to Talk
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-gradient-to-b from-gray-50 to-white">
          <div className="p-6 min-h-[500px] flex items-center justify-center">
            {!scriptLoaded && !error && (
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-brand-red/20 border-t-brand-red rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500 font-medium">
                  Loading AI Agent...
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  This may take a few seconds
                </p>
              </div>
            )}

            {error && (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>

                <p className="text-red-600 font-medium mb-2">
                  {error}
                </p>

                <button
                  onClick={() => {
                    setError(null);
                    setScriptLoaded(false);
                  }}
                  className="text-sm text-brand-red hover:underline font-medium"
                >
                  Try Again
                </button>
              </div>
            )}

            <div
              id="elevenlabs-widget-container"
              className={`w-full flex items-center justify-center ${
                !scriptLoaded || error ? 'hidden' : ''
              }`}
            />
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mic className="w-4 h-4 text-brand-red" />
              <p className="text-sm font-semibold text-gray-700">
                Try saying:
              </p>
            </div>

            <p className="text-sm text-gray-600 text-center">
              "My furnace isn't working" or "I need to
              schedule an AC tune-up"
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
