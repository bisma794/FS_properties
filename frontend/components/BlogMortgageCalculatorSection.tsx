'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';

export default function BlogMortgageCalculatorSection() {
  // Calculator States
  const [propertyPrice, setPropertyPrice] = useState<number>(1200000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanDurationYears, setLoanDurationYears] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(5.0);

  // Derived Calculations
  const downPaymentAmount = useMemo(() => {
    return (propertyPrice * downPaymentPercent) / 100;
  }, [propertyPrice, downPaymentPercent]);

  const loanAmount = useMemo(() => {
    return Math.max(0, propertyPrice - downPaymentAmount);
  }, [propertyPrice, downPaymentAmount]);

  // Standard Mortgage Payment Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const { monthlyPayment, totalPayment, totalInterest } = useMemo(() => {
    if (loanAmount <= 0 || loanDurationYears <= 0) {
      return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
    }
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanDurationYears * 12;

    if (monthlyRate === 0) {
      const payment = loanAmount / numberOfPayments;
      return {
        monthlyPayment: Math.round(payment),
        totalPayment: loanAmount,
        totalInterest: 0,
      };
    }

    const payment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const mPayment = Math.round(payment);
    const tPayment = Math.round(mPayment * numberOfPayments);
    const tInterest = Math.max(0, tPayment - loanAmount);

    return {
      monthlyPayment: mPayment,
      totalPayment: tPayment,
      totalInterest: tInterest,
    };
  }, [loanAmount, loanDurationYears, interestRate]);

  // Principal vs Interest ratio for the progress bar
  const principalPercentage = useMemo(() => {
    if (totalPayment <= 0) return 57;
    return Math.round((loanAmount / totalPayment) * 100);
  }, [loanAmount, totalPayment]);

  return (
    <section className="w-full bg-[#FAF9F6] py-12 sm:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
        {/* Main Card Container */}
        <div className="bg-white rounded-[26px] border border-[#EBE7DF] shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT SIDE: Image + Warm Gold Overlay + Headline + Progress info */}
          <div className="lg:col-span-5 relative min-h-[440px] sm:min-h-[500px] lg:min-h-full flex flex-col justify-between p-6 sm:p-8 md:p-10 text-white overflow-hidden">
            {/* Background Image: Museum of the Future & Sheikh Zayed Road */}
            <Image
              src="/mortgage-bg.png"
              alt="Dubai Architecture and Museum of the Future"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />

            {/* Warm Gold/Amber Duo-tone overlay to match screenshot */}
            <div
              className="absolute inset-0 z-10"
              style={{
                backgroundColor: 'rgba(186, 150, 93, 0.82)',
                mixBlendMode: 'multiply',
              }}
            />
            {/* Soft gradient layer for extra contrast */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#8E6E34]/95 via-[#BA965D]/70 to-[#BA965D]/60" />

            {/* Top Text Content */}
            <div className="relative z-20">
              {/* Tag with dot */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                <span
                  className="text-xs sm:text-[13px] text-white/90 font-medium tracking-wide"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  Home financing
                </span>
              </div>

              {/* Main Heading (Cinzel Bold) */}
              <h2
                className="text-3xl sm:text-4xl lg:text-[40px] leading-[1.12] tracking-[0.03em] uppercase text-white font-bold drop-shadow-sm"
                style={{
                  fontFamily: 'var(--font-cinzel), Cinzel, serif',
                  fontWeight: 700,
                }}
              >
                MORTGAGE
                <br />
                CALCULATOR
              </h2>

              {/* Subheading */}
              <p
                className="text-xs sm:text-sm text-white/85 leading-relaxed mt-4 max-w-xs font-normal"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                See what your monthly payment could look like before you make an offer.
              </p>
            </div>

            {/* Bottom Progress Bar: Over the life of the loan */}
            <div className="relative z-20 mt-10 lg:mt-auto pt-6">
              <span
                className="text-xs text-white/90 font-semibold block mb-2"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Over the life of the loan
              </span>

              {/* Dual-color Progress bar */}
              <div className="w-full h-2 rounded-full bg-white/30 overflow-hidden flex">
                <div
                  className="h-full bg-white/80 transition-all duration-300"
                  style={{ width: `${principalPercentage}%` }}
                />
                <div
                  className="h-full bg-white/40 transition-all duration-300"
                  style={{ width: `${100 - principalPercentage}%` }}
                />
              </div>

              {/* Legends: Principal vs Interest */}
              <div
                className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs text-white/90 mt-2.5 font-normal"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                  <span>Principal – AED {loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span>Interest – AED {totalInterest.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Calculator Controls & Results */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-7">
            {/* Input 1: Property Price */}
            <div>
              <label
                className="block text-xs sm:text-[13px] text-[#555555] mb-2 font-semibold"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Property price
              </label>
              <div className="relative flex items-center bg-white rounded-xl border border-[#DFDAD2] px-4 py-3 focus-within:border-[#C2A468] focus-within:ring-1 focus-within:ring-[#C2A468]/30 transition-all">
                <span className="text-xs sm:text-sm text-[#737373] mr-2 font-medium">AED</span>
                <input
                  type="text"
                  value={propertyPrice.toLocaleString()}
                  onChange={(e) => {
                    const val = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0;
                    setPropertyPrice(val);
                  }}
                  className="w-full bg-transparent text-sm sm:text-base font-semibold text-[#1A1A1A] focus:outline-none"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                />
              </div>
            </div>

            {/* Slider 1: Down Payment */}
            <div>
              <div className="flex items-center justify-between text-xs sm:text-[13px] mb-2">
                <span
                  className="text-[#555555] font-semibold"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  Down payment
                </span>
                <span
                  className="text-[#1A1A1A] font-semibold"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {downPaymentPercent}%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={80}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-[#E6E1D8] rounded-lg appearance-none cursor-pointer accent-[#BA965D]"
              />
              <span
                className="text-[11px] sm:text-xs text-[#8C8C8C] mt-1.5 block font-normal"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                AED {downPaymentAmount.toLocaleString()} up front
              </span>
            </div>

            {/* Slider 2: Loan Duration */}
            <div>
              <div className="flex items-center justify-between text-xs sm:text-[13px] mb-2">
                <span
                  className="text-[#555555] font-semibold"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  Loan duration
                </span>
                <span
                  className="text-[#1A1A1A] font-semibold"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {loanDurationYears} years
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={loanDurationYears}
                onChange={(e) => setLoanDurationYears(Number(e.target.value))}
                className="w-full h-1.5 bg-[#E6E1D8] rounded-lg appearance-none cursor-pointer accent-[#BA965D]"
              />
            </div>

            {/* Input 2: Interest Rate */}
            <div>
              <label
                className="block text-xs sm:text-[13px] text-[#555555] mb-2 font-semibold"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Interest rate
              </label>
              <div className="flex items-center rounded-xl border border-[#DFDAD2] overflow-hidden focus-within:border-[#C2A468] focus-within:ring-1 focus-within:ring-[#C2A468]/30 transition-all">
                <input
                  type="number"
                  step="0.05"
                  min="1"
                  max="20"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-white text-sm sm:text-base font-semibold text-[#1A1A1A] focus:outline-none"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                />
                <span
                  className="px-5 py-3 bg-[#FAF8F5] text-xs sm:text-sm text-[#737373] border-l border-[#DFDAD2] font-medium shrink-0"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  % fixed
                </span>
              </div>
            </div>

            {/* Bottom Result Area */}
            <div className="pt-2">
              <span
                className="block text-xs text-[#8C8C8C] mb-1 font-semibold"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Estimated monthly payment
              </span>

              {/* Result Display: AED 5,612 in Lora Semi Bold */}
              <div
                className="text-3xl sm:text-4xl text-[#141414] tracking-tight mb-2"
                style={{
                  fontFamily: 'var(--font-lora), Lora, Georgia, serif',
                  fontWeight: 600,
                }}
              >
                AED {monthlyPayment.toLocaleString()}
              </div>

              {/* Dynamic summary text */}
              <p
                className="text-[11px] sm:text-xs text-[#7A7A7A] leading-relaxed mb-6 font-normal"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Based on a AED {propertyPrice.toLocaleString()} purchase price, {downPaymentPercent}% down, over {loanDurationYears} years at a {interestRate.toFixed(2)}% fixed rate.
              </p>

              {/* Action Button: Request a consultation */}
              <button
                type="button"
                className="w-full py-3.5 px-6 rounded-xl bg-[#BA965D] hover:bg-[#a68249] text-white text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer shadow-xs"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Request a consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
