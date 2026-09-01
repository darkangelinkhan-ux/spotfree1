'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../../../component/Navbar';
import Footer from '../../../component/Footer';

export default function BookingSubscriptionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPlan = searchParams.get('plan') || 'Monthly Plan';
  const initialPrice = searchParams.get('price') || 'QAR 249';
  const initialType = searchParams.get('type') || 'carwash';

  const [selectedService, setSelectedService] = useState<'carwash' | 'cleaning'>(
    initialType === 'cleaning' ? 'cleaning' : 'carwash'
  );
  const [selectedPlanName, setSelectedPlanName] = useState(initialPlan);
  const [selectedPrice, setSelectedPrice] = useState(initialPrice);
  const [frequency, setFrequency] = useState('Weekly');
  const [startDate, setStartDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [vehicleCount, setVehicleCount] = useState('1 Vehicle');
  const [vehicleType, setVehicleType] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Nayi state Thank You screen ke liye
  const [isSubmitted, setIsSubmitted] = useState(false);

  const carWashPlans = [
    { name: 'Monthly Plan', price: 'QAR 249', desc: '2 Car Washes • 1 Interior Cleaning • Priority Booking' },
    { name: 'Annual Plan', price: 'QAR 2,499', desc: '24 Car Washes • 12 Interior Cleaning • Priority Booking' },
    { name: 'Dedicated Staff', price: 'QAR 3,999', desc: 'Dedicated Cleaner • Unlimited Services • Priority Booking' },
  ];

  const cleaningPlans = [
    { name: 'Home Upkeep Monthly', price: 'QAR 399', desc: '4 Monthly Cleaning Sessions • Eco-Friendly' },
    { name: 'Villa Deep Sanitation', price: 'QAR 2,999', desc: '12 Deep Cleaning Sessions • Specialized' },
    { name: 'Corporate & Office Care', price: 'QAR 4,999', desc: 'Dedicated Crew • Daily Maintenance' },
  ];

  const currentPlans = selectedService === 'carwash' ? carWashPlans : cleaningPlans;

  const handleActivate = async () => {
    setSubmitError('');

    if (!customerName || !customerPhone || !customerEmail) {
      setSubmitError('Please fill in your name, email, and phone number.');
      return;
    }

    if (!startDate) {
      setSubmitError('Please select a start date.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          service: selectedService,
          plan: selectedPlanName,
          price: selectedPrice,
          frequency,
          startDate,
          preferredTime,
          vehicleCount,
          vehicleType,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        // Success hone par Thank You screen activate ho jayegi
        setIsSubmitted(true);
      } else {
        setSubmitError(data.message || 'Failed to submit request. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitError('An error occurred while submitting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans selection:bg-[#D4FF00] selection:text-black">
      {/* Navbar Integration */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-36 pb-20">
        {isSubmitted ? (
          /* --- THANK YOU SUCCESS SCREEN --- */
          <div className="max-w-xl mx-auto bg-[#121212] border border-neutral-800 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl my-12">
            <div className="w-20 h-20 bg-[#D4FF00]/10 border border-[#D4FF00] text-[#D4FF00] rounded-full flex items-center justify-center text-4xl mx-auto">
              ✓
            </div>
            <div>
              <p className="text-[#D4FF00] text-xs font-black uppercase tracking-[0.25em] mb-2">SUCCESSFULLY COMPLETED</p>
              <h2 className="text-3xl font-black uppercase tracking-tight text-white">Thank You for Your Request!</h2>
              <p className="text-sm text-neutral-400 mt-3">
                Your membership request for <strong className="text-white">{selectedPlanName}</strong> has been successfully submitted. We have sent a confirmation email and will contact you shortly.
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-left space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Service:</span>
                <span className="font-bold text-white uppercase">{selectedService}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Selected Plan:</span>
                <span className="font-bold text-[#D4FF00]">{selectedPlanName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Total Price:</span>
                <span className="font-bold text-white">{selectedPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Start Date:</span>
                <span className="font-bold text-white">{startDate}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full bg-[#D4FF00] hover:bg-[#bce400] text-black font-extrabold text-xs uppercase tracking-wider py-4 rounded-full transition shadow-lg cursor-pointer"
            >
              Return to Home →
            </button>
          </div>
        ) : (
          /* --- NORMAL BOOKING FORM --- */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Steps Section */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Step 01: Choose Service */}
              <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 text-[#D4FF00] text-xs font-black flex items-center justify-center">01</span>
                  <div>
                    <h3 className="text-lg font-black uppercase text-white">Choose Service</h3>
                    <p className="text-xs text-neutral-400">Select the membership service.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedService('carwash');
                      setSelectedPlanName('Monthly Plan');
                      setSelectedPrice('QAR 249');
                    }}
                    className={`p-5 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between ${
                      selectedService === 'carwash' ? 'border-[#D4FF00] bg-neutral-900' : 'border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <h4 className="font-extrabold text-sm uppercase mb-1 text-white">Car Wash & Detailing</h4>
                      <p className="text-xs text-neutral-400">Recurring vehicle care</p>
                    </div>
                    <span className="text-[#D4FF00] font-bold">→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedService('cleaning');
                      setSelectedPlanName('Home Upkeep Monthly');
                      setSelectedPrice('QAR 399');
                    }}
                    className={`p-5 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between ${
                      selectedService === 'cleaning' ? 'border-[#D4FF00] bg-neutral-900' : 'border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <h4 className="font-extrabold text-sm uppercase mb-1 text-white">Hospitality & Cleaning</h4>
                      <p className="text-xs text-neutral-400">Recurring cleaning care</p>
                    </div>
                    <span className="text-[#D4FF00] font-bold">→</span>
                  </button>
                </div>
              </div>

              {/* Step 02: Choose Membership */}
              <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 text-[#D4FF00] text-xs font-black flex items-center justify-center">02</span>
                  <div>
                    <h3 className="text-lg font-black uppercase text-white">Choose Membership</h3>
                    <p className="text-xs text-neutral-400">Select your membership plan.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {currentPlans.map((p, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedPlanName(p.name);
                        setSelectedPrice(p.price);
                      }}
                      className={`p-5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                        selectedPlanName === p.name ? 'border-[#D4FF00] bg-neutral-900' : 'border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <h4 className="font-extrabold text-sm uppercase mb-1 text-white">{p.name}</h4>
                        <p className="text-xs text-neutral-400">{p.desc}</p>
                      </div>
                      <span className="text-[#D4FF00] font-black text-sm">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 03: Service Frequency */}
              <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 text-[#D4FF00] text-xs font-black flex items-center justify-center">03</span>
                  <div>
                    <h3 className="text-lg font-black uppercase text-white">Service Frequency</h3>
                    <p className="text-xs text-neutral-400">How often would you like the service?</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['Weekly', 'Monthly', 'Dedicated'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFrequency(f)}
                      className={`py-4 px-3 rounded-2xl text-xs font-extrabold uppercase border transition cursor-pointer ${
                        frequency === f ? 'border-[#D4FF00] bg-neutral-900 text-[#D4FF00]' : 'border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {f}
                      <span className="block text-[10px] text-neutral-500 font-normal mt-1">
                        {f === 'Weekly' ? 'Every week' : f === 'Monthly' ? 'Every month' : 'Custom schedule'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 04: Schedule */}
              <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 text-[#D4FF00] text-xs font-black flex items-center justify-center">04</span>
                  <div>
                    <h3 className="text-lg font-black uppercase text-white">Schedule</h3>
                    <p className="text-xs text-neutral-400">Choose your preferred start date and time.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-2">Start Date *</label>
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4FF00]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-2">Preferred Time</label>
                    <input
                      type="time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4FF00]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 05: Service Preferences */}
              <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 text-[#D4FF00] text-xs font-black flex items-center justify-center">05</span>
                  <div>
                    <h3 className="text-lg font-black uppercase text-white">Service Preferences</h3>
                    <p className="text-xs text-neutral-400">Tell us more about your requirements.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-2">Number of Vehicles</label>
                    <select
                      value={vehicleCount}
                      onChange={(e) => setVehicleCount(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4FF00]"
                    >
                      <option>1 Vehicle</option>
                      <option>2 Vehicles</option>
                      <option>3+ Vehicles</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-2">Vehicle Type / Location Notes</label>
                    <input
                      type="text"
                      placeholder="SUV, Sedan, Pickup..."
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4FF00]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 06: Your Details */}
              <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 text-[#D4FF00] text-xs font-black flex items-center justify-center">06</span>
                  <div>
                    <h3 className="text-lg font-black uppercase text-white">Your Details</h3>
                    <p className="text-xs text-neutral-400">Tell us how we can contact you.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-2">Phone Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="+974 XXXX XXXX"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00]"
                  />
                </div>
              </div>

            </div>

            {/* Right Sticky Membership Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 sticky top-28 shadow-xl">
                <p className="text-[#D4FF00] text-[10px] font-black uppercase tracking-[0.25em] mb-1">MEMBERSHIP SUMMARY</p>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6 text-white">Your Plan</h3>

                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-6 flex items-center gap-3">
                  <span className="text-xl">🚗</span>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Service</span>
                    <span className="text-xs font-black uppercase text-white">{selectedService === 'carwash' ? 'Car Wash & Detailing' : 'Hospitality & Cleaning'}</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs font-medium text-neutral-300 border-b border-neutral-800 pb-6 mb-6">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Membership</span>
                    <span className="font-bold text-[#D4FF00]">{selectedPlanName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Frequency</span>
                    <span className="font-bold text-white">{frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Start Date</span>
                    <span className="font-bold text-white">{startDate || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Vehicle/Notes</span>
                    <span className="font-bold text-white">{vehicleType || 'Not specified'}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold uppercase text-neutral-400">Membership Price</span>
                  <span className="text-2xl font-black text-[#D4FF00]">{selectedPrice}</span>
                </div>

                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-xs text-red-400 font-semibold mb-4">
                    {submitError}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleActivate}
                  disabled={loading}
                  className="w-full bg-[#D4FF00] hover:bg-[#bce400] text-black font-extrabold text-xs uppercase tracking-wider py-4 rounded-full transition shadow-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Activate Membership →'}
                </button>

                <p className="text-[10px] text-center text-neutral-500 mt-4">
                  Your membership request will be reviewed before activation.
                </p>
              </div>
            </div>

          </div>
        )}
      </main>

      {/* Footer Integration */}
      <Footer />
    </div>
  );
}