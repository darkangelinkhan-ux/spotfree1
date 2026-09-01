'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-md border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Sirf Akela Bara Logo - Click karne par Dashboard khulega */}
        <Link href="/admin/dashboard" className="flex items-center">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="SpotFree Logo" 
              fill 
              sizes="64px" 
              className="object-contain" 
              priority 
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase font-extrabold tracking-widest">
          <Link 
            href="/admin/dashboard" 
            className={`transition ${isActive('/admin/dashboard') ? 'text-[#D4FF00]' : 'text-neutral-300 hover:text-[#D4FF00]'}`}
          >
            Home
          </Link>
          <Link 
            href="/services" 
            className={`transition ${isActive('/services') || pathname.startsWith('/services') ? 'text-[#D4FF00]' : 'text-neutral-300 hover:text-[#D4FF00]'}`}
          >
            Services
          </Link>
          <Link 
            href="/packages" 
            className={`transition ${isActive('/packages') ? 'text-[#D4FF00]' : 'text-neutral-300 hover:text-[#D4FF00]'}`}
          >
            Packages
          </Link>
          <Link 
            href="/booking" 
            className={`transition ${isActive('/booking') ? 'text-[#D4FF00]' : 'text-neutral-300 hover:text-[#D4FF00]'}`}
          >
            Book Now
          </Link>
          <Link 
            href="/contact" 
            className={`transition ${isActive('/contact') ? 'text-[#D4FF00]' : 'text-neutral-300 hover:text-[#D4FF00]'}`}
          >
            Contact
          </Link>
          <Link 
            href="/login" 
            className={`transition ${isActive('/login') ? 'text-[#D4FF00]' : 'text-neutral-300 hover:text-[#D4FF00]'}`}
          >
            Login
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <a
            href="/downloads/spotfree-app.txt"
            download
            className="bg-[#D4FF00] hover:bg-[#bce400] text-black font-black text-xs uppercase tracking-wider px-6 py-3 rounded-full transition shadow-lg shadow-[#D4FF00]/15 flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
            </svg>
            Download
          </a>
        </div>
      </div>
    </header>
  );
}