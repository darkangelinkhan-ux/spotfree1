'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setStatus('error');
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setStatus('error');
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setStatus('error');
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center p-6 font-sans selection:bg-[#D4FF00] selection:text-black">
      <div className="w-full max-w-md bg-[#121212] border border-neutral-800 p-8 rounded-3xl shadow-2xl shadow-[#D4FF00]/5">
        {/* Logo & Brand */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 relative mb-3 flex items-center justify-center p-2 rounded-2xl bg-[#0d0d0d] border border-neutral-800">
            <Image src="/logo.png" alt="SpotFree Logo" width={64} height={64} className="object-contain" priority />
          </div>
          <h1 className="text-2xl font-black text-[#D4FF00] tracking-wider">SPOT FREE</h1>
          <p className="text-neutral-400 text-xs mt-1 uppercase tracking-widest font-semibold">Create Your Account</p>
        </div>

        {status === 'success' ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-[#D4FF00]/10 border border-[#D4FF00] rounded-full flex items-center justify-center mx-auto text-[#D4FF00]">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-tight">Account Created!</h2>
              <p className="text-neutral-400 text-xs mt-2">
                Check your inbox for a welcome email. Redirecting you to login...
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] transition"
              />
            </div>

            {status === 'error' && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-xs text-red-400 font-semibold">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-[#D4FF00] hover:bg-[#b8de00] text-black font-black py-4 rounded-xl transition shadow-lg shadow-[#D4FF00]/20 mt-6 text-xs uppercase tracking-widest disabled:opacity-50 cursor-pointer"
            >
              {status === 'submitting' ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-500">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-[#D4FF00] hover:underline">
              Log In
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs font-semibold text-neutral-500 hover:text-[#D4FF00] transition">
            ← Back to SpotFree Home
          </Link>
        </div>
      </div>
    </div>
  );
}
