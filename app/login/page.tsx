'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setStatus('error');
      setErrorMessage('Please enter your email and password.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw new Error(error.message);
      }

      router.push('/booking');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Invalid email or password.');
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
          <p className="text-neutral-400 text-xs mt-1 uppercase tracking-widest font-semibold">Welcome Back</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            {status === 'submitting' ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-500">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-bold text-[#D4FF00] hover:underline">
              Sign Up
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
