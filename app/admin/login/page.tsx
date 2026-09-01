'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isSignup ? 'Signing Up' : 'Logging In', { email, password, name });
    
    // Auth success hone par direct Admin Dashboard redirect
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl shadow-[#D4FF00]/5">
        
        {/* SpotFree Logo & Brand */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 relative mb-3 flex items-center justify-center p-2 rounded-2xl bg-neutral-950 border border-neutral-800">
            <Image
              src="/logo.png"
              alt="SpotFree Logo"
              width={64}
              height={64}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-black text-[#D4FF00] tracking-wider">
            SPOT FREE
          </h1>
          <p className="text-neutral-400 text-xs mt-1 uppercase tracking-widest font-semibold">
            {isSignup ? 'Create Admin Account' : 'Admin Portal Login'}
          </p>
        </div>

        {/* Tab Toggle: Log In / Sign Up */}
        <div className="flex bg-neutral-950 p-1.5 rounded-2xl mb-6 border border-neutral-800">
          <button
            type="button"
            onClick={() => setIsSignup(false)}
            className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition ${
              !isSignup 
                ? 'bg-[#D4FF00] text-black shadow-lg shadow-[#D4FF00]/20' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setIsSignup(true)}
            className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition ${
              isSignup 
                ? 'bg-[#D4FF00] text-black shadow-lg shadow-[#D4FF00]/20' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] transition"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@spotfree.com"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#D4FF00] hover:bg-[#b8de00] text-black font-black py-4 rounded-xl transition shadow-lg shadow-[#D4FF00]/20 mt-6 text-xs uppercase tracking-widest"
          >
            {isSignup ? 'Create Account' : 'Sign In To Dashboard'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-xs font-semibold text-neutral-500 hover:text-[#D4FF00] transition">
            ← Back to SpotFree Entrance
          </Link>
        </div>
      </div>
    </div>
  );
}