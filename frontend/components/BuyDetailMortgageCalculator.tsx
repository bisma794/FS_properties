'use client';

import React, { useState, useEffect } from 'react';

interface BuyDetailMortgageCalculatorProps {
  slug?: string;
  mortgageData?: Record<string, any>;
}

export default function BuyDetailMortgageCalculator({
  slug,
  mortgageData,
}: BuyDetailMortgageCalculatorProps = {}) {
  const [purchasePrice, setPurchasePrice] = useState<number>(
    Number(mortgageData?.defaultPrice) || 24750000
  );
  const [residencyStatus, setResidencyStatus] = useState<'national' | 'resident' | 'non-resident'>('resident');
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(
    Number(mortgageData?.defaultDownPaymentPct) || 30
  );
  const [loanPeriodYears, setLoanPeriodYears] = useState<number>(
    Number(mortgageData?.defaultLoanPeriodYears) || 25
  );
  const [interestRate, setInterestRate] = useState<number>(
    Number(mortgageData?.defaultInterestRate) || 3.75
  );

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const candidates = [
          slug ? `fs_page_${slug}` : null,
          'fs_page_buy-detail',
        ].filter(Boolean) as string[];
        for (const key of candidates) {
          const cached = localStorage.getItem(key);
          if (cached) {
            const parsed = JSON.parse(cached);
            const bm = parsed?.content?.customSections?.['buy-detail-mortgage'];
            if (bm) {
              if (bm.defaultPrice) setPurchasePrice(Number(bm.defaultPrice));
              if (bm.defaultDownPaymentPct) setDownPaymentPercent(Number(bm.defaultDownPaymentPct));
              if (bm.defaultLoanPeriodYears) setLoanPeriodYears(Number(bm.defaultLoanPeriodYears));
              if (bm.defaultInterestRate) setInterestRate(Number(bm.defaultInterestRate));
              break;
            }
          }
        }
      }
    } catch (_) {}
  }, [slug, mortgageData]);

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Calculations
  const downPaymentAmount = Math.round((purchasePrice * downPaymentPercent) / 100);
  const loanAmount = purchasePrice - downPaymentAmount;

  // Monthly mortgage calculation: M = P * (r*(1+r)^n) / ((1+r)^n - 1)
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanPeriodYears * 12;
  const monthlyPayment =
    monthlyRate > 0 && numberOfPayments > 0
      ? Math.round(
          (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        )
      : Math.round(loanAmount / (numberOfPayments || 1));

  const formatAED = (val: number) => {
    return new Intl.NumberFormat('en-US').format(val);
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    alert('Thank you! A Mortgage Advisor will contact you shortly.');
  };

  return (
    <section className="w-full bg-[#FAF9F6] py-10 sm:py-14 border-t border-stone-200/90">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* =============================================================== */}
          {/* LEFT 7 COLUMNS: MORTGAGE CALCULATOR & MONTHLY ESTIMATE         */}
          {/* =============================================================== */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Card: Get the right mortgage for you */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-xs space-y-6">
              <h2
                className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-poppins"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Get the right mortgage for you
              </h2>

              {/* 3 Fields: Purchase price, Residency status, Down payment */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                
                {/* 1. Purchase price */}
                <div className="space-y-1.5">
                  <label className="text-xs text-stone-600 font-medium block">
                    Purchase price
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formatAED(purchasePrice)}
                      onChange={(e) => {
                        const num = Number(e.target.value.replace(/[^0-9]/g, ''));
                        if (!isNaN(num)) setPurchasePrice(num);
                      }}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] font-semibold text-stone-900 focus:outline-none focus:border-[#BA955C]"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-stone-400">
                    <span>500,000 AED</span>
                    <span>200,000,000 AED</span>
                  </div>
                </div>

                {/* 2. Residency status */}
                <div className="space-y-1.5">
                  <label className="text-xs text-stone-600 font-medium block">
                    Residency status
                  </label>
                  <div className="grid grid-cols-3 border border-stone-300 rounded-xl overflow-hidden text-[10px] sm:text-[11px] font-medium text-center">
                    <button
                      type="button"
                      onClick={() => setResidencyStatus('national')}
                      className={`py-2 px-1 transition-colors border-r border-stone-300 ${
                        residencyStatus === 'national'
                          ? 'bg-stone-100 text-stone-900 font-bold'
                          : 'bg-white text-stone-500 hover:text-stone-900'
                      }`}
                    >
                      UAE national
                    </button>
                    <button
                      type="button"
                      onClick={() => setResidencyStatus('resident')}
                      className={`py-2 px-1 transition-colors border-r border-stone-300 ${
                        residencyStatus === 'resident'
                          ? 'bg-stone-100 text-stone-900 font-bold'
                          : 'bg-white text-stone-500 hover:text-stone-900'
                      }`}
                    >
                      UAE resident
                    </button>
                    <button
                      type="button"
                      onClick={() => setResidencyStatus('non-resident')}
                      className={`py-2 px-1 transition-colors ${
                        residencyStatus === 'non-resident'
                          ? 'bg-stone-100 text-stone-900 font-bold'
                          : 'bg-white text-stone-500 hover:text-stone-900'
                      }`}
                    >
                      Non-resident
                    </button>
                  </div>
                </div>

                {/* 3. Down payment */}
                <div className="space-y-1.5">
                  <label className="text-xs text-stone-600 font-medium block">
                    Down payment
                  </label>
                  <div className="flex items-center justify-between border border-stone-300 rounded-xl px-3 py-2 bg-white">
                    <span className="text-xs sm:text-[13px] font-semibold text-stone-900">
                      {formatAED(downPaymentAmount)}
                    </span>
                    <span className="text-xs font-semibold text-stone-600">
                      {downPaymentPercent}%
                    </span>
                  </div>
                  {/* Slider */}
                  <input
                    type="range"
                    min={20}
                    max={80}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-[#BA955C] h-1.5 bg-stone-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-[10px] text-stone-400">
                    <span>{formatAED(Math.round(purchasePrice * 0.2))} AED</span>
                    <span>{formatAED(Math.round(purchasePrice * 0.8))} AED</span>
                  </div>
                </div>

              </div>

              {/* 3 Fields Row 2: Loan amount, Loan period, Interest rate */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 pt-2">
                
                {/* 1. Loan amount */}
                <div className="space-y-1.5">
                  <label className="text-xs text-stone-600 font-medium block">
                    Loan amount
                  </label>
                  <div className="flex items-center justify-between border border-stone-300 rounded-xl px-3 py-2 bg-white">
                    <span className="text-xs sm:text-[13px] font-semibold text-stone-900">
                      {formatAED(loanAmount)}
                    </span>
                    <span className="text-xs font-semibold text-stone-600">
                      {100 - downPaymentPercent}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#BA955C] rounded-full"
                      style={{ width: `${100 - downPaymentPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-stone-400">
                    <span>{formatAED(Math.round(purchasePrice * 0.2))} AED</span>
                    <span>{formatAED(loanAmount)} AED</span>
                  </div>
                </div>

                {/* 2. Loan period */}
                <div className="space-y-1.5">
                  <label className="text-xs text-stone-600 font-medium block">
                    Loan period
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={loanPeriodYears}
                      onChange={(e) => setLoanPeriodYears(Number(e.target.value))}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-[13px] font-semibold text-stone-900 focus:outline-none focus:border-[#BA955C]"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-stone-400">
                    <span>1 year</span>
                    <span>25 years</span>
                  </div>
                </div>

                {/* 3. Interest rate */}
                <div className="space-y-1.5">
                  <label className="text-xs text-stone-600 font-medium block">
                    Interest rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step={0.05}
                      min={1}
                      max={15}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 pr-7 text-xs sm:text-[13px] font-semibold text-stone-900 focus:outline-none focus:border-[#BA955C]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 font-semibold">
                      %
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-stone-400">
                    <span>1%</span>
                    <span>10%</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Card: Estimate your monthly mortgage payment */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-xs space-y-4">
              <h3
                className="text-lg sm:text-xl font-bold text-stone-900 font-poppins"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Estimate your monthly mortgage payment
              </h3>

              <div className="flex flex-wrap items-baseline justify-between gap-4 pt-1">
                <div>
                  <span className="text-xs text-stone-500 block">monthly payment</span>
                  <div
                    className="text-2xl sm:text-3xl font-bold text-stone-900 font-poppins mt-0.5"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {formatAED(monthlyPayment)} AED
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-stone-500 block">with interest rate of</span>
                  <div className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                    {interestRate}%
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert('Upfront costs breakdown modal')}
                  className="w-full py-2.5 rounded-xl border border-[#BA955C] text-[#BA955C] hover:bg-[#BA955C] hover:text-white text-xs sm:text-[13px] font-semibold transition-colors cursor-pointer text-center"
                >
                  View upfront costs
                </button>
              </div>
            </div>

          </div>

          {/* =============================================================== */}
          {/* RIGHT 5 COLUMNS: GET A FREE CONSULTATION FORM                   */}
          {/* =============================================================== */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-5">
              <div className="text-center space-y-1">
                <h3
                  className="text-xl sm:text-2xl font-bold text-stone-900 font-poppins"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  Get a free consultation
                </h3>
                <p className="text-xs text-stone-500">
                  Our Mortgage Advisors will be more than happy to help!
                </p>
              </div>

              <form onSubmit={handleConsultationSubmit} className="space-y-4 pt-2">
                {/* Name */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#BA955C]"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#BA955C]"
                  />
                </div>

                {/* Phone with UAE flag */}
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden focus-within:border-[#BA955C] bg-white">
                  <div className="px-3.5 py-3 bg-stone-50 border-r border-stone-200 flex items-center gap-1.5 text-xs text-stone-700 shrink-0">
                    <span className="text-base leading-none">🇦🇪</span>
                    <span className="font-semibold">+971</span>
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent px-3.5 py-3 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#BA955C] hover:bg-[#a6834d] active:scale-[0.99] text-white font-bold text-xs sm:text-[13px] tracking-wide transition-all shadow-xs cursor-pointer"
                >
                  Talk to an Expert — Free
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

