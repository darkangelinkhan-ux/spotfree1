import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-neutral-900 pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 relative flex items-center justify-center bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden p-1">
              <Image src="/logo.png" alt="SpotFree Logo" width={40} height={40} className="object-contain" priority />
            </div>
            <span className="font-black text-xl tracking-wider text-[#D4FF00]">Spot Free</span>
          </div>
          <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
            Premium mobile car wash and hospitality cleaning services across Qatar.
          </p>
        </div>

        <div>
          <h4 className="text-white text-xs font-black uppercase tracking-wider mb-4">Car Wash</h4>
          <ul className="space-y-3 text-xs text-neutral-400 font-medium">
            <li><Link href="/services/car-wash" className="hover:text-white transition text-neutral-400">Exterior Wash</Link></li>
            <li><Link href="/services/car-wash" className="hover:text-white transition text-neutral-400">Interior Cleaning</Link></li>
            <li><Link href="/services/car-wash" className="hover:text-white transition text-neutral-400">Full Detailing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-black uppercase tracking-wider mb-4">Cleaning</h4>
          <ul className="space-y-3 text-xs text-neutral-400 font-medium">
            <li><Link href="/services" className="hover:text-white transition text-neutral-400">Home Cleaning</Link></li>
            <li><Link href="/services" className="hover:text-white transition text-neutral-400">Villa Cleaning</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-black uppercase tracking-wider mb-4">Company</h4>
          <ul className="space-y-3 text-xs text-neutral-400 font-medium">
            <li><Link href="/contact" className="hover:text-white transition text-neutral-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition text-neutral-400">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-medium">
        <p>© 2026 Spot Free. All rights reserved. Built by <span className="text-[#D4FF00] font-bold">Stratos Agency</span></p>
        <div className="flex items-center gap-6">
          <Link href="/contact" className="hover:text-neutral-300 transition">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-neutral-300 transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}