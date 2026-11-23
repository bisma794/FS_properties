'use client';

import React, { useState, useEffect } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

interface ProjectEnquiryFormProps {
  projectName?: string;
  className?: string;
}

export default function ProjectEnquiryForm({
  projectName = 'Golf Trails',
  className = '',
}: ProjectEnquiryFormProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [country, setCountry] = useState<string>('ae');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    `I'm interested in ${projectName}. Please share pricing and availability.`
  );
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('AED 1.5M - 3M');
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Client-side detection executed after hydration to prevent SSR mismatch
  useEffect(() => {
    setMounted(true);

    // 1. Instant timezone detection
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.includes('Dubai') || tz.includes('Abu_Dhabi') || tz.includes('Muscat')) {
        setCountry('ae');
      } else if (tz.includes('Karachi') || tz.includes('Islamabad') || tz.includes('Lahore')) {
        setCountry('pk');
      } else if (tz.includes('Kolkata') || tz.includes('Calcutta') || tz.includes('Delhi') || tz.includes('Mumbai')) {
        setCountry('in');
      } else if (tz.includes('London')) {
        setCountry('gb');
      } else if (tz.includes('New_York') || tz.includes('Chicago') || tz.includes('Los_Angeles') || tz.includes('Denver')) {
        setCountry('us');
      } else if (tz.includes('Riyadh')) {
        setCountry('sa');
      } else if (tz.includes('Doha') || tz.includes('Qatar')) {
        setCountry('qa');
      } else if (tz.includes('Kuwait')) {
        setCountry('kw');
      } else if (tz.includes('Bahrain')) {
        setCountry('bh');
      } else if (tz.includes('Toronto') || tz.includes('Vancouver') || tz.includes('Montreal')) {
        setCountry('ca');
      } else if (tz.includes('Sydney') || tz.includes('Melbourne')) {
        setCountry('au');
      } else if (tz.includes('Berlin') || tz.includes('Frankfurt')) {
        setCountry('de');
      } else if (tz.includes('Paris')) {
        setCountry('fr');
      } else if (tz.includes('Singapore')) {
        setCountry('sg');
      } else if (tz.includes('Hong_Kong')) {
        setCountry('hk');
      }
    } catch {}

    // 2. Accurate client-side IP geolocation detection
    let isMounted = true;
    const fetchGeoCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/', {
          signal: AbortSignal.timeout(3000),
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.country_code && isMounted) {
            setCountry(data.country_code.toLowerCase());
            return;
          }
        }
      } catch {
        try {
          const res2 = await fetch('https://api.country.is/', {
            signal: AbortSignal.timeout(2500),
          });
          if (res2.ok) {
            const data2 = await res2.json();
            if (data2?.country && isMounted) {
              setCountry(data2.country.toLowerCase());
            }
          }
        } catch {}
      }
    };

    fetchGeoCountry();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      alert('Please enter your full name.');
      return;
    }
    if (!phone || phone.trim().length < 6) {
      alert('Please enter a valid phone number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 6000);
    }, 900);
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Hello FS Advisory, my name is ${fullName || 'Guest'}. ${message} Phone: ${phone || 'Not provided'}`
    );
    window.open(`https://wa.me/971500000000?text=${text}`, '_blank');
  };

  return (
    <section className={`w-full ${className}`}>
      {/* Form Card Container */}
      <div className="bg-white rounded-[24px] sm:rounded-[28px] border border-[#EEEEEE] p-6 sm:p-9 lg:p-11 shadow-[0_4px_24px_rgba(0,0,0,0.03)] w-full">
        {/* Header Block: Squircle Envelope Icon + Title Text */}
        <div className="flex items-start gap-4 sm:gap-5 mb-7 sm:mb-8">
          <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-[16px] sm:rounded-[18px] bg-[#BA955C] flex items-center justify-center text-white shrink-0 shadow-xs">
            {/* Outline Envelope Icon */}
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <div>
            <span
              className="text-[11px] sm:text-xs font-semibold text-[#BA955C] uppercase tracking-[0.2em] block"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              GET IN TOUCH
            </span>
            <h2
              className="text-xl sm:text-2xl lg:text-[25px] font-bold text-stone-900 tracking-tight leading-snug mt-0.5"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              Enquire About This Project
            </h2>
            <p
              className="text-xs sm:text-sm text-stone-400 font-normal mt-0.5"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              Get detailed pricing and availability
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF6EE] border border-[#BA955C]/30 text-center animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#BA955C] text-white flex items-center justify-center mx-auto mb-3 shadow-xs">
              <svg className="w-6 h-6 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-poppins">Thank you for your enquiry!</h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
              Our dedicated luxury property advisor for {projectName} will contact you shortly with the complete brochure and unit availability list.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
            {/* Field 1: Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs sm:text-[13px] font-medium text-stone-700 mb-1.5"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-[#FAFAFA] border border-stone-200/90 rounded-xl px-4 py-3 sm:py-3.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#BA955C] focus:bg-white transition-all shadow-2xs"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              />
            </div>

            {/* Field 2: Phone Number with react-international-phone */}
            <div>
              <label
                htmlFor="phone-input"
                className="block text-xs sm:text-[13px] font-medium text-stone-700 mb-1.5"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                Phone Number *
              </label>
              <div className="relative international-phone-wrapper" suppressHydrationWarning>
                {mounted ? (
                  <PhoneInput
                    key={country}
                    defaultCountry={country}
                    value={phone}
                    onChange={(phoneValue) => setPhone(phoneValue)}
                    inputClassName="!w-full !bg-[#FAFAFA] !border !border-stone-200/90 !rounded-xl !px-4 !py-3 sm:!py-3.5 !text-xs sm:!text-sm !text-stone-900 !h-[46px] sm:!h-[50px] focus:!border-[#BA955C] focus:!bg-white !transition-all"
                    countrySelectorStyleProps={{
                      buttonClassName:
                        '!bg-[#FAFAFA] !border !border-stone-200/90 !rounded-xl !mr-2.5 !h-[46px] sm:!h-[50px] !px-3 hover:!bg-stone-100 !transition-colors',
                      dropdownStyleProps: {
                        className: '!rounded-xl !shadow-xl !border !border-stone-200 !z-50 !max-h-60',
                      },
                    }}
                  />
                ) : (
                  <div className="flex items-center gap-2.5">
                    <div className="w-20 h-[46px] sm:h-[50px] bg-[#FAFAFA] border border-stone-200/90 rounded-xl" />
                    <div className="flex-1 h-[46px] sm:h-[50px] bg-[#FAFAFA] border border-stone-200/90 rounded-xl" />
                  </div>
                )}
              </div>
            </div>

            {/* Field 3: Message Bar */}
            <div>
              <div className="w-full bg-[#FAFAFA] border border-stone-200/90 rounded-xl px-4 py-3 sm:py-3.5 flex items-start sm:items-center gap-2 text-xs sm:text-sm text-stone-800 shadow-2xs">
                <span className="font-semibold text-stone-900 shrink-0">Message:</span>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-xs sm:text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                />
              </div>
            </div>

            {/* Collapsible: Add more details (optional) */}
            <div className="pt-0.5">
              <button
                type="button"
                onClick={() => setShowMoreDetails((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-stone-600 hover:text-stone-900 cursor-pointer transition-colors"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                <svg
                  className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${
                    showMoreDetails ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                <span>Add more details (optional)</span>
              </button>

              {showMoreDetails && (
                <div className="mt-3 p-4 sm:p-5 rounded-xl bg-[#FBFBFB] border border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3.5 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#BA955C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">
                      Target Investment Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#BA955C]"
                    >
                      <option value="AED 1M - 2M">AED 1M - 2M</option>
                      <option value="AED 2M - 4M">AED 2M - 4M (Golden Visa Eligible)</option>
                      <option value="AED 4M - 7M">AED 4M - 7M</option>
                      <option value="AED 7M+">AED 7M+ (Luxury Villas &amp; Penthouses)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons: Send Quick Enquiry & WhatsApp Us */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch gap-3">
              {/* Left Button: Send Quick Enquiry (Golden) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 sm:py-4 px-6 rounded-xl bg-[#BFA16A] hover:bg-[#a88c57] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-xs cursor-pointer flex items-center justify-center"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <span>Send Quick Enquiry</span>
                )}
              </button>

              {/* Right Button: WhatsApp Us (Green with WhatsApp Icon) */}
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="flex-1 py-3.5 sm:py-4 px-6 rounded-xl bg-[#10B981] hover:bg-[#059669] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2.5"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                {/* Official WhatsApp SVG Icon */}
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.971.53 1.77.822 2.791.822 3.184 0 5.77-2.587 5.771-5.767.001-3.183-2.585-5.807-5.77-5.807zm3.374 8.212c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.12-.519-1.572-.65-2.581-2.239-2.66-2.344-.077-.105-.638-.85-.638-1.621 0-.771.404-1.15.548-1.306.144-.156.314-.195.42-.195.105 0 .21.002.302.007.098.005.23-.037.36.275.144.346.495 1.206.538 1.294.043.088.072.19.014.305-.058.115-.088.187-.175.289-.088.102-.185.228-.264.306-.089.088-.182.185-.078.363.104.178.463.764.993 1.237.684.61 1.26.799 1.439.887.179.088.283.073.389-.044.106-.117.452-.527.573-.708.121-.181.242-.151.406-.09.164.06 1.04.49 1.218.579.178.088.297.132.341.205.044.073.044.422-.1.827z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.398A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.685 0-3.25-.502-4.568-1.365l-.328-.215-2.964.832.842-2.883-.217-.346A8.125 8.125 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z" />
                </svg>
                <span>WhatsApp Us</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
