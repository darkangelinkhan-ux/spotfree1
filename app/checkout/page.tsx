'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

function CheckoutContent() {
  const searchParams = useSearchParams();

  // Read every booking field straight from the query params on first render.
  const [service] = useState(() => searchParams.get('service') || 'Car Wash & Detailing');
  const [pkg] = useState(() => searchParams.get('package') || 'Exterior Wash');
  const [vehicleType] = useState(() => searchParams.get('vehicleType') || '');
  const [vehicleQuantity] = useState(() => searchParams.get('vehicleQuantity') || '1');
  const [price] = useState(() => searchParams.get('price') || '60');
  const [date] = useState(() => searchParams.get('date') || 'Today');
  const [time] = useState(() => searchParams.get('time') || 'ASAP');

  // Customer details, carried over from the booking form via query params
  const [fullName] = useState(() => searchParams.get('fullName') || '');
  const [phone] = useState(() => searchParams.get('phone') || '');
  const [email] = useState(() => searchParams.get('email') || '');
  const [address] = useState(() => searchParams.get('address') || '');
  const [instructions] = useState(() => searchParams.get('instructions') || '');

  // Subscription / recurring details
  const [isRecurring] = useState(() => searchParams.get('isRecurring') === 'true');
  const [recurringFrequency] = useState(() => searchParams.get('recurringFrequency') || '');

  // Payment method state ('cod' or 'card')
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  
  // Card details state for online payment system
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleFinalCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    // Validation for online card payment
    if (paymentMethod === 'card') {
      if (!cardNumber || !expiryDate || !cvv) {
        setSubmitError('Please fill in your complete card details.');
        return;
      }
    }

    setLoading(true);
    const randomId = '#SF-' + Math.floor(100000 + Math.random() * 900000);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service,
          package: pkg,
          vehicleType,
          vehicleQuantity,
          price,
          date,
          time,
          fullName,
          phone,
          email,
          address,
          instructions,
          paymentMethod,
          orderId: randomId,
          isRecurring,
          recurringFrequency: isRecurring ? recurringFrequency : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to confirm booking. Please try again.');
      }

      setOrderId(randomId);
      setIsConfirmed(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to confirm booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans selection:bg-[#D4FF00] selection:text-black">
      <Navbar />

      {/* Header Section */}
      <section className="relative pt-32 pb-16 px-6 text-center border-b border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-black text-[#D4FF00] uppercase tracking-[0.25em] mb-3">SECURE CHECKOUT</p>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            REVIEW & <span className="text-[#D4FF00]">CONFIRM.</span>
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm max-w-md mx-auto mt-2">
            Almost done! Please choose your payment method and confirm.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {isConfirmed ? (
          /* Success Screen */
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-[#D4FF00]/10 border border-[#D4FF00] rounded-full flex items-center justify-center mx-auto text-[#D4FF00]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-[#D4FF00] text-xs font-black uppercase tracking-[0.25em] mb-2">BOOKING CONFIRMED</p>
              <h2 className="text-3xl font-black uppercase tracking-tight">Thank You For Your Order!</h2>
              <p className="text-neutral-400 text-xs md:text-sm max-w-md mx-auto mt-2">
                Your booking has been successfully placed. Our team is on the way to your location.
              </p>
            </div>

            {/* Order Reference Box */}
            <div className="bg-[#161616] border border-neutral-800 rounded-2xl p-6 text-left max-w-md mx-auto space-y-3">
              <div className="flex justify-between text-xs border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Reference ID:</span>
                <span className="font-bold text-[#D4FF00]">{orderId}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Service / Package:</span>
                <span className="font-bold text-white">{service} ({pkg})</span>
              </div>
              
              {/* Vehicle Type & Quantity Display in Success Screen */}
              {vehicleType && (
                <div className="flex justify-between text-xs border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Vehicle Details:</span>
                  <span className="font-bold text-white text-right">
                    {vehicleType} <span className="text-[#D4FF00]">({vehicleQuantity} Vehicle{Number(vehicleQuantity) > 1 ? 's' : ''})</span>
                  </span>
                </div>
              )}

              <div className="flex justify-between text-xs border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Payment Mode:</span>
                <span className="font-bold text-[#D4FF00]">
                  {paymentMethod === 'cod' ? 'Cash on Arrival' : 'Online Card Payment'}
                </span>
              </div>
              <div className={`flex justify-between text-xs ${isRecurring ? 'border-b border-neutral-800 pb-2' : ''}`}>
                <span className="text-neutral-400">Payment Status:</span>
                <span className="font-bold text-emerald-400">
                  {paymentMethod === 'cod' ? 'Pending (Pay upon arrival)' : 'Paid Successfully'}
                </span>
              </div>
              {isRecurring && (
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Subscription:</span>
                  <span className="font-bold text-white">Recurring &middot; {recurringFrequency}</span>
                </div>
              )}
            </div>

            <div className="pt-4">
              <Link 
                href="/" 
                className="inline-block bg-[#D4FF00] hover:bg-[#bce400] text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition shadow-lg shadow-[#D4FF00]/15"
              >
                Return To Home
              </Link>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleFinalCheckout} className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 md:p-8 space-y-8">
            <div>
              <h2 className="text-xl font-black uppercase tracking-wider mb-2">Order Summary</h2>
              <p className="text-xs text-neutral-400">Verify your chosen options before final placement.</p>
            </div>

            {/* Service Summary Card */}
            <div className="bg-[#161616] border border-neutral-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between text-xs border-b border-neutral-800 pb-3">
                <span className="text-neutral-400">Selected Service</span>
                <span className="font-bold text-[#D4FF00]">{service}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-neutral-800 pb-3">
                <span className="text-neutral-400">Package Details</span>
                <span className="font-bold">{pkg}</span>
              </div>

              {/* Vehicle Type & Quantity Display in Summary Card */}
              {vehicleType && (
                <div className="flex justify-between text-xs border-b border-neutral-800 pb-3">
                  <span className="text-neutral-400">Vehicle Type & Qty</span>
                  <span className="font-bold text-right">
                    {vehicleType} <span className="text-[#D4FF00]">({vehicleQuantity} Vehicle{Number(vehicleQuantity) > 1 ? 's' : ''})</span>
                  </span>
                </div>
              )}

              <div className="flex justify-between text-xs border-b border-neutral-800 pb-3">
                <span className="text-neutral-400">Date & Time</span>
                <span className="font-bold text-neutral-300">{date} / {time}</span>
              </div>
              {isRecurring && (
                <div className="flex justify-between text-xs border-b border-neutral-800 pb-3">
                  <span className="text-neutral-400">Subscription</span>
                  <span className="font-bold text-[#D4FF00]">Recurring &middot; {recurringFrequency}</span>
                </div>
              )}
              <div className="flex justify-between text-xs pt-1">
                <span className="text-neutral-400 font-bold uppercase">Total Payable</span>
                <span className="font-black text-[#D4FF00] text-base">QAR {price}</span>
              </div>
            </div>

            {/* Payment Options Selection */}
            <div className="space-y-3">
              <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Select Payment Method</label>
              
              <div className="grid grid-cols-1 gap-3">
                {/* Option 1: Cash on Arrival */}
                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border transition flex items-center justify-between cursor-pointer ${paymentMethod === 'cod' ? 'border-[#D4FF00] bg-neutral-900' : 'border-neutral-800 bg-[#161616]'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-[#D4FF00]' : 'border-neutral-600'}`}>
                      {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-[#D4FF00]"></div>}
                    </div>
                    <div>
                      <span className="font-extrabold text-xs uppercase block">Cash on Arrival</span>
                      <span className="text-[10px] text-neutral-400">Pay cash directly to our team upon arrival</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#D4FF00]/15 text-[#D4FF00] px-2.5 py-1 rounded-md font-bold">Cash</span>
                </div>

                {/* Option 2: Online Card Payment */}
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border transition flex items-center justify-between cursor-pointer ${paymentMethod === 'card' ? 'border-[#D4FF00] bg-neutral-900' : 'border-neutral-800 bg-[#161616]'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#D4FF00]' : 'border-neutral-600'}`}>
                      {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-[#D4FF00]"></div>}
                    </div>
                    <div>
                      <span className="font-extrabold text-xs uppercase block">Online Card Payment</span>
                      <span className="text-[10px] text-neutral-400">Pay securely online via Credit / Debit Card</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#D4FF00]/15 text-[#D4FF00] px-2.5 py-1 rounded-md font-bold">Online</span>
                </div>
              </div>
            </div>

            {/* Dynamic Card Form Fields (Only shows if 'card' is selected) */}
            {paymentMethod === 'card' && (
              <div className="bg-[#161616] border border-neutral-800 rounded-2xl p-6 space-y-4 animate-fadeIn">
                <h3 className="text-xs font-black uppercase text-[#D4FF00] tracking-wider mb-2">Enter Card Information</h3>
                
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="4000 1234 5678 9010"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00]"
                    required={paymentMethod === 'card'}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00]"
                      required={paymentMethod === 'card'}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      placeholder="123"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00]"
                      required={paymentMethod === 'card'}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-xs text-red-400 font-semibold">
                {submitError}
              </div>
            )}

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4FF00] hover:bg-[#bce400] text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl transition shadow-lg shadow-[#D4FF00]/15 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <span>{loading ? 'Processing...' : `Confirm & Pay QAR ${price} (${paymentMethod === 'cod' ? 'Cash on Arrival' : 'Online Card'})`}</span>
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center text-[#D4FF00]">Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}