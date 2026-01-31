import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import TrialModal from '@/components/TrialModal';

interface NavbarProps {
  scrollY: number;
}

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar({ scrollY }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isScrolled = scrollY > 100;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-effect shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className={`flex items-center transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
              } ${isScrolled ? 'scale-95' : 'scale-100'}`}
            >
              <span className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-black' : 'text-white'
              }`}>
                MVMNT
                <span className="text-brand-red">.</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative text-sm font-medium transition-all duration-300 group ${
                    isScrolled ? 'text-gray-700 hover:text-black' : 'text-white/80 hover:text-white'
                  } ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-3'
                  }`}
                  style={{ transitionDelay: `${100 + index * 50}ms` }}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-1/2 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full group-hover:left-0`} />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <TrialModal>
                <button
                  className={`bg-brand-red text-white px-5 py-2.5 text-sm font-semibold hover:brightness-110 transition-all duration-300 hover:scale-105 flex items-center gap-2 ${
                    isVisible
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-90'
                  }`}
                  style={{ transitionDelay: '400ms' }}
                >
                  <Phone className="w-4 h-4" />
                  Free 7-Day Trial
                </button>
              </TrialModal>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 ${isScrolled ? 'text-black' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-20 px-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-left text-lg font-medium text-gray-800 hover:text-brand-red transition-all duration-300 py-3 border-b border-gray-100 ${
                    isMenuOpen
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-10'
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  {link.label}
                </button>
              ))}

              <TrialModal>
                <button
                  className={`mt-6 bg-brand-red text-white px-6 py-4 text-center font-semibold hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 w-full ${
                    isMenuOpen
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-5'
                  }`}
                  style={{ transitionDelay: '320ms' }}
                >
                  <Phone className="w-5 h-5" />
                  Free 7-Day Trial
                </button>
              </TrialModal>
              <p className="text-center text-xs text-gray-400">*No attachment issues</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
