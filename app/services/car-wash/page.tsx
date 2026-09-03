'use client';

import Image from 'next/image';
import Link from 'next/link';

import Navbar from '../../component/Navbar'; 
import Footer from '../../component/Footer';

export default function CarWashPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans selection:bg-[#D4FF00] selection:text-black">
      
      {/* Alag bani hui Navbar yahan render hogi */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center text-center pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image src="/gfrrd.png" alt="Car Wash Hero" fill className="object-cover scale-105" priority />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="max-w-4xl mx-auto w-full relative z-20 flex flex-col items-center">
          <div className="text-xs font-bold text-neutral-300 mb-4 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-[#D4FF00]">Home</Link> / 
            <Link href="/services" className="hover:text-[#D4FF00]">Services</Link> / 
            <span className="text-neutral-100">Mobile Car Wash & Detailing</span>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none mb-6 text-white drop-shadow-md">
              MOBILE CAR WASH <br />
              <span className="text-[#D4FF00]">& DETAILING</span>
            </h1>
            <p className="text-neutral-200 text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto drop-shadow">
              We come to you! Professional car wash and detailing services at your home, office, or any location in Qatar.
            </p>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 px-6 max-w-7xl mx-auto border-b border-neutral-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-[#121212] border border-neutral-800 p-6 rounded-2xl text-center flex flex-col items-center">
            <div className="w-10 h-10 mb-4 rounded-xl border border-[#D4FF00]/30 bg-neutral-900 flex items-center justify-center text-[#D4FF00]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
            </div>
            <h3 className="font-extrabold text-sm mb-1 uppercase tracking-wider">Doorstep Service</h3>
            <p className="text-xs text-neutral-400">We come to you at your location.</p>
          </div>

          <div className="bg-[#121212] border border-neutral-800 p-6 rounded-2xl text-center flex flex-col items-center">
            <div className="w-10 h-10 mb-4 rounded-xl border border-[#D4FF00]/30 bg-neutral-900 flex items-center justify-center text-[#D4FF00]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"></path></svg>
            </div>
            <h3 className="font-extrabold text-sm mb-1 uppercase tracking-wider">Premium Products</h3>
            <p className="text-xs text-neutral-400">High quality & safe products.</p>
          </div>

          <div className="bg-[#121212] border border-neutral-800 p-6 rounded-2xl text-center flex flex-col items-center">
            <div className="w-10 h-10 mb-4 rounded-xl border border-[#D4FF00]/30 bg-neutral-900 flex items-center justify-center text-[#D4FF00]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
            </div>
            <h3 className="font-extrabold text-sm mb-1 uppercase tracking-wider">Expert Team</h3>
            <p className="text-xs text-neutral-400">Trained & verified professionals.</p>
          </div>

          <div className="bg-[#121212] border border-neutral-800 p-6 rounded-2xl text-center flex flex-col items-center">
            <div className="w-10 h-10 mb-4 rounded-xl border border-[#D4FF00]/30 bg-neutral-900 flex items-center justify-center text-[#D4FF00]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            </div>
            <h3 className="font-extrabold text-sm mb-1 uppercase tracking-wider">Satisfaction</h3>
            <p className="text-xs text-neutral-400">100% customer satisfaction.</p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#D4FF00] text-xs font-black uppercase tracking-[0.25em] mb-2">PREMIUM CAR CARE</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Our Packages</h2>
          <p className="text-neutral-400 text-xs mt-3">Choose the right car care package for your vehicle and enjoy professional service at your doorstep.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Pkg 1 */}
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <span className="inline-block bg-neutral-900 border border-neutral-800 text-xs font-black px-3 py-1 rounded-lg mb-4 text-[#D4FF00]">01</span>
              <h3 className="text-xl font-black uppercase mb-2">Exterior Wash</h3>
              <p className="text-xs text-neutral-400 mb-6">A quick premium exterior clean for your everyday drive.</p>
              <div className="text-3xl font-black text-[#D4FF00] mb-6">QAR 79</div>
              <ul className="space-y-3 text-xs text-neutral-300 mb-8 border-t border-neutral-800 pt-6">
                <li>✓ Exterior Hand Wash</li>
                <li>✓ Wheels Cleaning</li>
                <li>✓ Tire Shine</li>
                <li>✓ Windows Cleaning</li>
                <li>✓ Quick Dry</li>
              </ul>
            </div>
            <Link href="/booking?service=Car%20Wash%20%26%20Detailing&package=Exterior%20Wash&price=79" className="w-full text-center bg-transparent border border-[#D4FF00] hover:bg-[#D4FF00] hover:text-black text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl transition">
              Book Now →
            </Link>
          </div>

          {/* Pkg 2 */}
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <span className="inline-block bg-neutral-900 border border-neutral-800 text-xs font-black px-3 py-1 rounded-lg mb-4 text-[#D4FF00]">02</span>
              <h3 className="text-xl font-black uppercase mb-2">Interior</h3>
              <p className="text-xs text-neutral-400 mb-6">A complete interior refresh for a cleaner, fresher cabin.</p>
              <div className="text-3xl font-black text-[#D4FF00] mb-6">QAR 149</div>
              <ul className="space-y-3 text-xs text-neutral-300 mb-8 border-t border-neutral-800 pt-6">
                <li>✓ Interior Vacuum</li>
                <li>✓ Dashboard Cleaning</li>
                <li>✓ Seats Cleaning</li>
                <li>✓ Floor Mats Cleaning</li>
                <li>✓ Windows Cleaning</li>
              </ul>
            </div>
            <Link href="/booking?service=Car%20Wash%20%26%20Detailing&package=Interior&price=149" className="w-full text-center bg-transparent border border-[#D4FF00] hover:bg-[#D4FF00] hover:text-black text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl transition">
              Book Now →
            </Link>
          </div>

          {/* Pkg 3 */}
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <span className="inline-block bg-neutral-900 border border-neutral-800 text-xs font-black px-3 py-1 rounded-lg mb-4 text-[#D4FF00]">03</span>
              <h3 className="text-xl font-black uppercase mb-2">Full Detail</h3>
              <p className="text-xs text-neutral-400 mb-6">Deep interior and exterior detailing for a complete refresh.</p>
              <div className="text-3xl font-black text-[#D4FF00] mb-6">QAR 299</div>
              <ul className="space-y-3 text-xs text-neutral-300 mb-8 border-t border-neutral-800 pt-6">
                <li>✓ Exterior & Interior</li>
                <li>✓ Paint Protection</li>
                <li>✓ Steam Cleaning</li>
                <li>✓ Polish & Wax</li>
                <li>✓ Tire & Rim Detail</li>
              </ul>
            </div>
            <Link href="/booking?service=Car%20Wash%20%26%20Detailing&package=Full%20Detail&price=299" className="w-full text-center bg-transparent border border-[#D4FF00] hover:bg-[#D4FF00] hover:text-black text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl transition">
              Book Now →
            </Link>
          </div>

          {/* Pkg 4 */}
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <span className="inline-block bg-neutral-900 border border-neutral-800 text-xs font-black px-3 py-1 rounded-lg mb-4 text-[#D4FF00]">04</span>
              <h3 className="text-xl font-black uppercase mb-2">Paint Polish</h3>
              <p className="text-xs text-neutral-400 mb-6">Premium paint treatment for a smoother and brighter finish.</p>
              <div className="text-3xl font-black text-[#D4FF00] mb-6">QAR 499</div>
              <ul className="space-y-3 text-xs text-neutral-300 mb-8 border-t border-neutral-800 pt-6">
                <li>✓ Scratch Removal</li>
                <li>✓ Paint Polish</li>
                <li>✓ Wax Protection</li>
                <li>✓ Long Lasting Shine</li>
                <li>✓ Premium Finish</li>
              </ul>
            </div>
            <Link href="/booking?service=Car%20Wash%20%26%20Detailing&package=Paint%20Polish&price=499" className="w-full text-center bg-transparent border border-[#D4FF00] hover:bg-[#D4FF00] hover:text-black text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl transition">
              Book Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.25em] text-[#D4FF00]">GALLERY</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="relative h-48 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
            <Image src="/gfrrd.png" alt="Gallery 1" fill className="object-cover hover:scale-105 transition duration-500" />
          </div>
          <div className="relative h-48 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
            <Image src="/gfrrd.png" alt="Gallery 2" fill className="object-cover hover:scale-105 transition duration-500" />
          </div>
          <div className="relative h-48 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
            <Image src="/gfrrd.png" alt="Gallery 3" fill className="object-cover hover:scale-105 transition duration-500" />
          </div>
          <div className="relative h-48 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
            <Image src="/gfrrd.png" alt="Gallery 4" fill className="object-cover hover:scale-105 transition duration-500" />
          </div>
        </div>
      </section>

      {/* Ready When You Are CTA Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto mb-16">
        <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#D4FF00] text-[10px] font-black uppercase tracking-[0.25em] mb-2">READY WHEN YOU ARE</p>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">Ready to make your car shine?</h3>
            <p className="text-neutral-400 text-xs">Book your slot now and we&apos;ll come to you.</p>
          </div>
          <Link
            href="/booking?service=Car%20Wash%20%26%20Detailing&package=Exterior%20Wash&price=79"
            className="bg-[#D4FF00] hover:bg-[#bce400] text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition shadow-lg shadow-[#D4FF00]/15 whitespace-nowrap"
          >
            Book Now →
          </Link>
        </div>
      </section>

      {/* Alag bani hui Footer yahan render hogi */}
      <Footer />

    </div>
  );
}