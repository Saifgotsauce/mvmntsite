import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, User, Mail, Building2, CheckCircle, X } from 'lucide-react';

interface TrialModalProps {
  children: React.ReactNode;
}

export default function TrialModal({ children }: TrialModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    missedCalls: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xdazlbyo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          company: formData.company,
          missedCalls: formData.missedCalls,
          _subject: 'New Free Trial Request - MVMNT',
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      company: '',
      missedCalls: '',
    });
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setTimeout(resetForm, 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white p-0 overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => handleOpenChange(false)}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-2xl font-bold text-white text-center">
                Start Your <span className="text-[#E30614]">Free 7-Day Trial</span>
              </DialogTitle>
              <p className="text-zinc-400 text-center text-sm mt-2">
                No credit card required • Setup in 48 hours
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-zinc-300 text-sm">
                  Full Name <span className="text-[#E30614]">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="John Smith"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#E30614] focus:ring-[#E30614]/20"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-zinc-300 text-sm">
                  Phone Number <span className="text-[#E30614]">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#E30614] focus:ring-[#E30614]/20"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300 text-sm">
                  Email Address <span className="text-[#E30614]">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@yourcompany.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#E30614] focus:ring-[#E30614]/20"
                  />
                </div>
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-zinc-300 text-sm">
                  Company Name <span className="text-[#E30614]">*</span>
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    required
                    placeholder="Your HVAC Company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#E30614] focus:ring-[#E30614]/20"
                  />
                </div>
              </div>

              {/* Missed Calls Question */}
              <div className="space-y-2">
                <Label htmlFor="missedCalls" className="text-zinc-300 text-sm">
                  Do you know how many calls you miss in a week?
                </Label>
                <select
                  id="missedCalls"
                  name="missedCalls"
                  value={formData.missedCalls}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-md bg-zinc-800 border border-zinc-700 text-white text-sm focus:border-[#E30614] focus:ring-1 focus:ring-[#E30614]/20 focus:outline-none"
                >
                  <option value="" className="bg-zinc-800">Select an option</option>
                  <option value="0-5" className="bg-zinc-800">0-5 calls</option>
                  <option value="5-15" className="bg-zinc-800">5-15 calls</option>
                  <option value="15-30" className="bg-zinc-800">15-30 calls</option>
                  <option value="30+" className="bg-zinc-800">30+ calls</option>
                  <option value="not-sure" className="bg-zinc-800">Not sure</option>
                </select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E30614] hover:bg-[#c20511] text-white font-semibold py-6 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Get My Free Trial'
                )}
              </Button>

              <p className="text-xs text-zinc-500 text-center">
                *No attachment issues • Cancel anytime
              </p>
            </form>
          </>
        ) : (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-[#E30614]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-[#E30614]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              You're All Set!
            </h3>
            <p className="text-zinc-400 mb-6">
              Expect an email/text soon. Our team will reach out within 24 hours to set up your free trial.
            </p>
            <Button
              onClick={() => handleOpenChange(false)}
              className="bg-[#E30614] hover:bg-[#c20511] text-white font-semibold px-8"
            >
              Got It!
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
