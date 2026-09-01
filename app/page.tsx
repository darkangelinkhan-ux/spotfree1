'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from './component/Navbar'; 
import Footer from './component/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans selection:bg-[#D4FF00] selection:text-black">
      
      {/* 1. Navbar Component */}
      <Navbar />

      {/* 2. Hero Section with Real Video Background */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40 z-10"></div>
        
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-75 scale-105"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/80 border border-neutral-800 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse"></span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-neutral-300">
                MOBILE CAR WASH & CLEANING SERVICES
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] mb-6">
              PREMIUM <br />
              <span className="text-[#D4FF00]">CLEANING.</span> <br />
              FOR CARS & <br />
              HOSPITALITY.
            </h1>

            <p className="text-neutral-300 text-sm md:text-base font-medium leading-relaxed mb-8 max-w-xl">
              Professional car wash, detailing and hospitality cleaning services delivered by trained experts with premium quality, reliable service and spotless results at your doorstep.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/services/car-wash"
                className="bg-[#D4FF00] hover:bg-[#bce400] text-black font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition shadow-xl shadow-[#D4FF00]/20"
              >
                Book a Service
              </Link>
              <Link
                href="/services/subscription"
                className="border-2 border-white/20 hover:border-[#D4FF00] hover:text-[#D4FF00] text-white font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Bar */}
      <section className="bg-black/90 border-y border-neutral-800 py-8 px-6 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#D4FF00]">5,000+</h2>
            <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mt-1">Bookings Done</p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#D4FF00]">1,000+</h2>
            <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mt-1">Happy Customers</p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#D4FF00]">4.9★</h2>
            <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mt-1">App Rating</p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#D4FF00]">50+</h2>
            <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mt-1">Professional Staff</p>
          </div>
        </div>
      </section>

      {/* 4. What We Offer Section with Real Images */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[#D4FF00] text-xs font-black uppercase tracking-[0.25em] mb-2">
            WHAT WE OFFER
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            Two Pillars of <span className="text-[#D4FF00]">Excellence</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <Link href="/services/car-wash" className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between relative group hover:border-[#D4FF00]/40 transition block">
            <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 bg-neutral-900 border border-neutral-800">
              <Image
                src="/gfrrd.png"
                alt="Mobile Car Wash & Detailing"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div>
              <h3 className="text-xl font-extrabold uppercase tracking-wide text-white mb-2">
                Mobile Car Wash & Detailing
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed mb-6">
                Exterior wash, interior detailing, paint polish, engine cleaning, and full fleet services delivered at your location.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px] font-bold px-3 py-1.5 rounded-lg">Exterior Wash</span>
                <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px] font-bold px-3 py-1.5 rounded-lg">Interior</span>
                <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px] font-bold px-3 py-1.5 rounded-lg">Full Detail</span>
              </div>
            </div>

            <span className="text-[#D4FF00] text-xs font-extrabold uppercase tracking-wider flex items-center gap-2">
              Explore Service →
            </span>
          </Link>

          {/* Card 2 */}
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between relative group hover:border-[#D4FF00]/40 transition">
            <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 bg-neutral-900 border border-neutral-800">
              <Image
                src="/xv.png"
                alt="Hospitality & Cleaning"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div>
              <h3 className="text-xl font-extrabold uppercase tracking-wide text-white mb-2">
                Hospitality & Cleaning
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed mb-6">
                Residential, villa, apartment, and commercial deep cleaning. Sofa, carpet, kitchen, bathroom, Airbnb, and maid services.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px] font-bold px-3 py-1.5 rounded-lg">Deep Clean</span>
                <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px] font-bold px-3 py-1.5 rounded-lg">Villa</span>
                <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px] font-bold px-3 py-1.5 rounded-lg">Office</span>
              </div>
            </div>

            <Link href="/services/hospitality" className="text-[#D4FF00] text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 hover:translate-x-1 transition">
              Explore Service →
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between relative group hover:border-[#D4FF00]/40 transition">
            <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 bg-neutral-900 border border-neutral-800">
              <Image
                src="/abs.png"
                alt="Express & Subscription Plans"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div>
              <h3 className="text-xl font-extrabold uppercase tracking-wide text-white mb-2">
                Express & Subscription Plans
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed mb-6">
                Monthly and annual membership packages for regular customers. Priority booking, discounted rates, dedicated staff.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px] font-bold px-3 py-1.5 rounded-lg">Monthly Plan</span>
                <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px] font-bold px-3 py-1.5 rounded-lg">Annual</span>
                <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px] font-bold px-3 py-1.5 rounded-lg">Priority</span>
              </div>
            </div>

            <Link href="/services/subscription" className="text-[#D4FF00] text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 hover:translate-x-1 transition">
              Explore Service →
            </Link>
          </div>

        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="py-24 px-6 bg-black border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[#D4FF00] text-xs font-black uppercase tracking-[0.25em] mb-2">
              SIMPLE PROCESS
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
              How It <span className="text-[#D4FF00]">Works</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-14 h-14 bg-neutral-900 border border-neutral-800 rounded-2xl mx-auto flex items-center justify-center mb-6 text-[#D4FF00] font-black text-sm">
                01
              </div>
              <h3 className="text-xl font-extrabold uppercase tracking-wide mb-3">Choose a Service</h3>
              <p className="text-neutral-400 text-xs leading-relaxed max-w-xs mx-auto">
                Pick from car wash, detailing, or cleaning services on the app or website.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-neutral-900 border border-neutral-800 rounded-2xl mx-auto flex items-center justify-center mb-6 text-[#D4FF00] font-black text-sm">
                02
              </div>
              <h3 className="text-xl font-extrabold uppercase tracking-wide mb-3">Set Date & Location</h3>
              <p className="text-neutral-400 text-xs leading-relaxed max-w-xs mx-auto">
                Select your preferred time slot and share your address. We come to you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-neutral-900 border border-neutral-800 rounded-2xl mx-auto flex items-center justify-center mb-6 text-[#D4FF00] font-black text-sm">
                03
              </div>
              <h3 className="text-xl font-extrabold uppercase tracking-wide mb-3">Sit Back & Relax</h3>
              <p className="text-neutral-400 text-xs leading-relaxed max-w-xs mx-auto">
                Our certified pros arrive, do the work, and you get a spotless result.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer Component */}
      <Footer />

    </div>
  );
}