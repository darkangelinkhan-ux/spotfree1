'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-cyan-400 tracking-wider">SPOT FREE</h1>
          <p className="text-neutral-400 text-xs mt-1 uppercase tracking-widest">Reset Admin Password</p>
        </div>

        {submitted ? (
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-5 text-center">
            <p className="text-cyan-400 text-sm font-semibold">Reset Link Sent!</p>
            <p className="text-neutral-400 text-xs mt-2 leading-relaxed">
              If an account exists for <span className="text-white font-medium">{email}</span>, you will receive password reset instructions shortly.
            </p>
            <Link
              href="/admin/login"
              className="inline-block mt-5 text-xs bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-5 py-2.5 rounded-xl transition"
            >
              Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-300 mb-2">
                Registered Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@spotfree.com"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition shadow-lg shadow-cyan-500/20"
            >
              Send Reset Instructions
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-xs text-neutral-500">
          Remembered password?{' '}
          <Link href="/admin/login" className="text-cyan-400 font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}