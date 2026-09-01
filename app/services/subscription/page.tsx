'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';

export default function SubscriptionPage() {
  const [activeTab, setActiveTab] = useState<'carwash' | 'cleaning'>('carwash');

  const carWashPlans = [
    {
      id: '01',
      name: 'Monthly Care Plan',
      desc: 'Regular maintenance for your vehicle throughout the month.',
      price: 'QAR 249',
      period: '/ month',
      popular: false,
      features: [
        '2 Exterior Car Washes',
        '1 Interior Deep Clean',
        'Priority Time Slots',
        '10% Member Discount',
        'Cancel Anytime',
      ],
    },
    {
      id: '02',
      name: 'Annual Elite Pass',
      desc: 'Our ultimate all-inclusive package for year-round shine.',
      price: 'QAR 2,499',
      period: '/ year',
      popular: true,
      features: [
        '24 Exterior Car Washes',
        '12 Interior Cleanings',
        'Priority VIP Booking',
        '20% Member Discount',
        'Dedicated Support Team',
      ],
    },
    {
      id: '03',
      name: 'Dedicated Staff Plan',
      desc: 'Customized regular service built around your personal schedule.',
      price: 'QAR 3,999',
      period: '/ month',
      popular: false,
      features: [
        'Dedicated Cleaner Assigned',
        'Unlimited Monthly Washes',
        'Priority VIP Booking',
        '30% Member Discount',
        'Fully Customized Routine',
      ],
    },
  ];

  const cleaningPlans = [
    {
      id: '01',
      name: 'Home Upkeep Monthly',
      desc: 'Regular professional cleaning to keep your home pristine.',
      price: 'QAR 399',
      period: '/ month',
      popular: false,
      features: [
        '4 Monthly Cleaning Sessions',
        'Eco-Friendly Products Used',
        'Priority Scheduling',
        '10% Member Discount',
        'Cancel Anytime',
      ],
    },
    {
      id: '02',
      name: 'Villa Deep Sanitation',
      desc: 'Complete yearly deep sanitation package for large residences.',
      price: 'QAR 2,999',
      period: '/ year',
      popular: true,
      features: [
        '12 Deep Cleaning Sessions',
        'Specialized Equipment',
        'Priority Booking',
        '25% Member Discount',
        'Dedicated Supervisor',
      ],
    },
    {
      id: '03',
      name: 'Corporate & Office Care',
      desc: 'Tailored daily or weekly corporate maintenance packages.',
      price: 'QAR 4,999',
      period: '/ month',
      popular: false,
      features: [
        'Dedicated Cleaning Crew',
        'Daily Maintenance Visits',
        'Priority VIP Booking',
        '30% Member Discount',
        'Custom Business Plan',
      ],
    },
  ];

  const currentPlans = activeTab === 'carwash' ? carWashPlans : cleaningPlans;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans selection:bg-[#D4FF00] selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-16 px-6 text-center border-b border-neutral-900">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-xs font-black text-[#D4FF00] uppercase tracking-[0.25em]">SPOTFREE MEMBERSHIP</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-white">
            SERVICE MORE. <br />
            <span className="text-[#D4FF00]">SAVE MORE.</span>
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm max-w-lg mx-auto">
            Choose a flexible membership plan tailored for your car care and home cleaning needs across Qatar.
          </p>

          {/* Category Toggle Switch */}
          <div className="inline-flex bg-[#161616] border border-neutral-800 p-1.5 rounded-2xl mt-6 shadow-xl">
            <button
              onClick={() => setActiveTab('carwash')}
              className={`px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase transition cursor-pointer ${
                activeTab === 'carwash'
                  ? 'bg-[#D4FF00] text-black shadow-lg scale-105'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              🚗 Car Wash Plans
            </button>
            <button
              onClick={() => setActiveTab('cleaning')}
              className={`px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase transition cursor-pointer ${
                activeTab === 'cleaning'
                  ? 'bg-[#D4FF00] text-black shadow-lg scale-105'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              🧹 Cleaning Plans
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            {activeTab === 'carwash' ? 'Car Care Memberships' : 'Cleaning Memberships'}
          </h2>
          <p className="text-neutral-400 text-xs mt-2">
            Select the perfect recurring package that fits your lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-[#121212] border rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                plan.popular ? 'border-[#D4FF00] shadow-2xl shadow-[#D4FF00]/10' : 'border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-6 bg-[#D4FF00] text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 text-[#D4FF00] text-xs font-black flex items-center justify-center mb-6">
                  {plan.id}
                </div>
                <h3 className="text-xl font-black uppercase mb-2 text-white">{plan.name}</h3>
                <p className="text-neutral-400 text-xs mb-6 leading-relaxed">{plan.desc}</p>

                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-neutral-800">
                  <span className="text-3xl font-black text-[#D4FF00]">{plan.price}</span>
                  <span className="text-xs text-neutral-400 font-bold">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs text-neutral-300 font-medium">
                      <span className="text-[#D4FF00] font-bold text-sm">✓</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Updated Link pointing to the correct activate sub-route path */}
              <Link
                href={`/services/subscription/activate?plan=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price)}&type=${activeTab}`}
                className="w-full bg-[#161616] hover:bg-[#D4FF00] text-white hover:text-black border border-neutral-800 hover:border-[#D4FF00] font-black text-xs uppercase tracking-wider py-4 rounded-xl transition text-center block shadow-md"
              >
                Choose Plan →
              </Link>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-28 text-center border-t border-neutral-900 pt-16">
          <p className="text-xs font-black text-[#D4FF00] uppercase tracking-[0.25em] mb-2">WHY GO MEMBERSHIP?</p>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-12">Unmatched Perks & Convenience</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Priority Booking', desc: 'Get preferred scheduling slots before regular customers.' },
              { title: 'Exclusive Savings', desc: 'Enjoy recurring discounts across all supplementary services.' },
              { title: 'Flexible Timing', desc: 'Easily reschedule or adjust visits around your routine.' },
              { title: 'Dedicated Support', desc: 'Fast-track customer service assistance whenever needed.' },
            ].map((benefit, i) => (
              <div key={i} className="bg-[#121212] border border-neutral-800 rounded-2xl p-6 text-center hover:border-neutral-700 transition">
                <h4 className="font-extrabold text-sm uppercase mb-2 text-white">{benefit.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}