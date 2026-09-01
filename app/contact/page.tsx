'use client';

import { useState } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      setStatus('error');
      setErrorMessage('Please fill in all fields before sending.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans selection:bg-[#D4FF00] selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 text-center border-b border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-black text-[#D4FF00] uppercase tracking-[0.25em] mb-3">GET IN TOUCH</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none mb-4 text-white">
            CONTACT <span className="text-[#D4FF00]">US.</span>
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm max-w-lg mx-auto">
            Questions about a booking, a service, or a partnership? Send us a message and our team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Contact Info Sidebar */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6">
            <div className="w-10 h-10 mb-4 rounded-xl border border-[#D4FF00]/30 bg-neutral-900 flex items-center justify-center text-[#D4FF00]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-extrabold text-sm uppercase mb-1 tracking-wider">Email Us</h3>
            <p className="text-xs text-neutral-400">We usually reply within a few hours.</p>
          </div>

          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6">
            <div className="w-10 h-10 mb-4 rounded-xl border border-[#D4FF00]/30 bg-neutral-900 flex items-center justify-center text-[#D4FF00]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-extrabold text-sm uppercase mb-1 tracking-wider">Call Us</h3>
            <p className="text-xs text-neutral-400">Available daily, 9 AM to 9 PM.</p>
          </div>

          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6">
            <div className="w-10 h-10 mb-4 rounded-xl border border-[#D4FF00]/30 bg-neutral-900 flex items-center justify-center text-[#D4FF00]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-extrabold text-sm uppercase mb-1 tracking-wider">Service Area</h3>
            <p className="text-xs text-neutral-400">We come to your home, office, or any location across Qatar.</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-3">
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 md:p-8">
            {status === 'success' ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-[#D4FF00]/10 border border-[#D4FF00] rounded-full flex items-center justify-center mx-auto text-[#D4FF00]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#D4FF00] text-xs font-black uppercase tracking-[0.25em] mb-2">MESSAGE SENT</p>
                  <h2 className="text-2xl font-black uppercase tracking-tight">Thanks for reaching out!</h2>
                  <p className="text-neutral-400 text-xs md:text-sm max-w-sm mx-auto mt-2">
                    We&apos;ve received your message and will get back to you shortly.
                  </p>
                </div>
                <button
                  onClick={() => setStatus('idle')}
                  className="inline-block bg-[#D4FF00] hover:bg-[#bce400] text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition shadow-lg shadow-[#D4FF00]/15 cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-lg font-black uppercase tracking-wider mb-1">Send A Message</h2>
                  <p className="text-xs text-neutral-400">Fill out the form below and we&apos;ll be in touch.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="What&apos;s this about?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#161616] border border-neutral-800 rounded-xl p-4 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] transition resize-none"
                    required
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
                  className="w-full bg-[#D4FF00] hover:bg-[#bce400] text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl transition shadow-lg shadow-[#D4FF00]/15 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}