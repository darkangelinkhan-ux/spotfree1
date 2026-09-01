'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

export default function BookingPage() {
  const router = useRouter();

  // State management for interactive booking form
  const [selectedService, setSelectedService] = useState('Car Wash & Detailing');
  const [selectedPackage, setSelectedPackage] = useState('Exterior Wash');
  const [vehicleType, setVehicleType] = useState(''); // <-- Alag state vehicle type ke liye
  const [vehicleQuantity, setVehicleQuantity] = useState('1'); // <-- Alag state quantity ke liye
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState('Weekly');

  // Define packages based on selected service
  const carWashPackages = [
    { name: 'Exterior Wash', desc: 'Professional exterior wash at your location.', price: '60' },
    { name: 'Interior Cleaning', desc: 'Deep interior cleaning for a fresh cabin.', price: '80' },
    { name: 'Full Detailing', desc: 'Complete interior and exterior detailing.', price: '180' },
    { name: 'Paint Polish', desc: 'Professional paint polish and finish care.', price: '220' },
  ];

  const hospitalityPackages = [
    { name: 'Home Cleaning', desc: 'Professional cleaning for your home.', price: '120' },
    { name: 'Villa Cleaning', desc: 'Detailed cleaning for villas and larger homes.', price: '250' },
    { name: 'Office Cleaning', desc: 'Reliable cleaning for professional spaces.', price: '180' },
    { name: 'Deep Cleaning', desc: 'Complete deep cleaning service.', price: '220' },
  ];

  const currentPackages = selectedService === 'Hospitality & Cleaning' ? hospitalityPackages : carWashPackages;

  // Handle live location fetching
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    setUseCurrentLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
          const data = await response.json();
          if (data && data.display_name) {
            setAddress(data.display_name);
          } else {
            setAddress(`Lat: ${lat}, Lon: ${lon}`);
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          setAddress(`Lat: ${lat}, Lon: ${lon}`);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error(error);
        alert('Unable to retrieve your location. Please check browser permissions.');
        setIsLocating(false);
        setUseCurrentLocation(false);
      }
    );
  };

  // Find price of selected package
  const getSelectedPrice = () => {
    const pkg = currentPackages.find((p) => p.name === selectedPackage);
    return pkg ? pkg.price : '60';
  };

  // Handle Form Submit & Redirect to Checkout Page with Query Parameters
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !email || !date || !time || !address) {
      alert('Baraye meherbani saari required fields fill karein!');
      return;
    }

    if (selectedService === 'Car Wash & Detailing' && !vehicleType) {
      alert('Baraye meherbani vehicle type mention karein!');
      return;
    }

    setIsSubmitting(true);

    const price = getSelectedPrice();

    // Construct URL query parameters to pass booking details to checkout page
    const queryParams = new URLSearchParams({
      service: selectedService,
      package: selectedPackage,
      ...(selectedService === 'Car Wash & Detailing' && { 
        vehicleType: vehicleType,
        vehicleQuantity: vehicleQuantity 
      }),
      price: price,
      date: date,
      time: time,
      address: address,
      instructions: instructions,
      fullName: fullName,
      phone: phone,
      email: email,
      isRecurring: String(isRecurring),
      recurringFrequency: isRecurring ? recurringFrequency : '',
    });

    // Redirect to Checkout Page
    router.push(`/checkout?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans selection:bg-[#D4FF00] selection:text-black">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 text-center overflow-hidden border-b border-neutral-900">
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-xs font-black text-[#D4FF00] uppercase tracking-[0.25em] mb-3">SPOTFREE BOOKING</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none mb-4 text-white">
            BOOK YOUR <br />
            <span className="text-[#D4FF00]">SERVICE.</span>
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm max-w-lg mx-auto">
            Professional car care and cleaning services delivered directly to your location.
          </p>
        </div>
      </section>

      {/* Main Booking Form Container */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <form onSubmit={handleCheckout} className="space-y-8">

          {/* Step 01: Select Service */}
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-700 text-[#D4FF00] text-xs font-black flex items-center justify-center">01</span>
              <div>
                <h2 className="text-lg font-black uppercase tracking-wider">Select Service</h2>
                <p className="text-xs text-neutral-400">What service do you need?</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                onClick={() => {
                  setSelectedService('Car Wash & Detailing');
                  setSelectedPackage('Exterior Wash');
                }}
                className={`cursor-pointer p-5 rounded-2xl border transition flex items-center justify-between ${selectedService === 'Car Wash & Detailing' ? 'border-[#D4FF00] bg-neutral-900' : 'border-neutral-800 bg-[#161616] hover:border-neutral-700'}`}
              >
                <div>
                  <h3 className="font-extrabold text-sm uppercase mb-1">Car Wash & Detailing</h3>
                  <p className="text-xs text-neutral-400">Mobile car care</p>
                </div>
                <svg className={`w-5 h-5 ${selectedService === 'Car Wash & Detailing' ? 'text-[#D4FF00]' : 'text-neutral-600'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>

              <div 
                onClick={() => {
                  setSelectedService('Hospitality & Cleaning');
                  setSelectedPackage('Home Cleaning');
                }}
                className={`cursor-pointer p-5 rounded-2xl border transition flex items-center justify-between ${selectedService === 'Hospitality & Cleaning' ? 'border-[#D4FF00] bg-neutral-900' : 'border-neutral-800 bg-[#161616] hover:border-neutral-700'}`}
              >
                <div>
                  <h3 className="font-extrabold text-sm uppercase mb-1">Hospitality & Cleaning</h3>
                  <p className="text-xs text-neutral-400">Home & commercial cleaning</p>
                </div>
                <svg className={`w-5 h-5 ${selectedService === 'Hospitality & Cleaning' ? 'text-[#D4FF00]' : 'text-neutral-600'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </div>

          {/* Step 02: Vehicle Type & Quantity (Only shows if Car Wash is selected) */}
          {selectedService === 'Car Wash & Detailing' && (
            <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-700 text-[#D4FF00] text-xs font-black flex items-center justify-center">02</span>
                <div>
                  <h2 className="text-lg font-black uppercase tracking-wider">Vehicle Details</h2>
                  <p className="text-xs text-neutral-400">Specify your vehicle type and how many vehicles you have.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Vehicle Type / Model</label>
                  <input
                    type="text"
                    placeholder="e.g., Toyota Land Cruiser / Sedan"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] transition"
                    required={selectedService === 'Car Wash & Detailing'}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Quantity (Vehicles)</label>
                  <input
                    type="number"
                    min="1"
                    value={vehicleQuantity}
                    onChange={(e) => setVehicleQuantity(e.target.value)}
                    className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] transition"
                    required={selectedService === 'Car Wash & Detailing'}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 03: Choose Package */}
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-700 text-[#D4FF00] text-xs font-black flex items-center justify-center">
                {selectedService === 'Car Wash & Detailing' ? '03' : '02'}
              </span>
              <div>
                <h2 className="text-lg font-black uppercase tracking-wider">Choose Package</h2>
                <p className="text-xs text-neutral-400">Select the service package for {selectedService}.</p>
              </div>
            </div>

            <div className="space-y-3">
              {currentPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  onClick={() => setSelectedPackage(pkg.name)}
                  className={`cursor-pointer p-5 rounded-2xl border transition flex items-center justify-between ${selectedPackage === pkg.name ? 'border-[#D4FF00] bg-neutral-900' : 'border-neutral-800 bg-[#161616] hover:border-neutral-700'}`}
                >
                  <div>
                    <h3 className="font-extrabold text-sm uppercase mb-1">{pkg.name}</h3>
                    <p className="text-xs text-neutral-400">{pkg.desc}</p>
                  </div>
                  <span className="text-[#D4FF00] font-black text-sm whitespace-nowrap">QAR {pkg.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 04: Date & Time */}
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-700 text-[#D4FF00] text-xs font-black flex items-center justify-center">
                {selectedService === 'Car Wash & Detailing' ? '04' : '03'}
              </span>
              <div>
                <h2 className="text-lg font-black uppercase tracking-wider">Date & Time</h2>
                <p className="text-xs text-neutral-400">Choose your preferred schedule.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Preferred Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#D4FF00] transition [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert cursor-pointer"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Preferred Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#D4FF00] transition [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert cursor-pointer"
                  required
                />
              </div>
            </div>

            {/* Subscription / Recurring Option */}
            <div className="mt-6 pt-6 border-t border-neutral-800">
              <div
                onClick={() => setIsRecurring(!isRecurring)}
                className={`cursor-pointer p-4 rounded-xl border transition flex items-center justify-between ${isRecurring ? 'border-[#D4FF00] bg-neutral-900' : 'border-neutral-800 bg-[#161616]'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center ${isRecurring ? 'border-[#D4FF00] bg-[#D4FF00]' : 'border-neutral-600'}`}>
                    {isRecurring && (
                      <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <span className="font-extrabold text-xs uppercase block">Make This A Recurring Booking</span>
                    <span className="text-[10px] text-neutral-400">Save time with an automatic repeat schedule.</span>
                  </div>
                </div>
                <span className="text-[10px] bg-[#D4FF00]/15 text-[#D4FF00] px-2.5 py-1 rounded-md font-bold">Subscription</span>
              </div>

              {isRecurring && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {['Weekly', 'Bi-Weekly', 'Monthly'].map((freq) => (
                    <div
                      key={freq}
                      onClick={() => setRecurringFrequency(freq)}
                      className={`cursor-pointer text-center p-3 rounded-xl border transition text-xs font-bold uppercase tracking-wider ${recurringFrequency === freq ? 'border-[#D4FF00] bg-neutral-900 text-[#D4FF00]' : 'border-neutral-800 bg-[#161616] text-neutral-400 hover:border-neutral-700'}`}
                    >
                      {freq}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Step 05: Service Location */}
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-700 text-[#D4FF00] text-xs font-black flex items-center justify-center">
                {selectedService === 'Car Wash & Detailing' ? '05' : '04'}
              </span>
              <div>
                <h2 className="text-lg font-black uppercase tracking-wider">Service Location</h2>
                <p className="text-xs text-neutral-400">Where should we deliver the service?</p>
              </div>
            </div>

            <div className="space-y-4">
              <div 
                onClick={handleGetLocation}
                className={`cursor-pointer p-4 rounded-xl border transition flex items-center justify-between ${useCurrentLocation ? 'border-[#D4FF00] bg-neutral-900' : 'border-neutral-800 bg-[#161616]'}`}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#D4FF00]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span className="font-extrabold text-xs uppercase">
                    {isLocating ? 'Detecting Location...' : 'Use My Current Location'}
                  </span>
                </div>
                <svg className="w-5 h-5 text-[#D4FF00]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Address / Building / Villa</label>
                <input
                  type="text"
                  placeholder="Enter your complete address or use GPS button above"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] transition"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Additional Instructions</label>
                <textarea
                  rows={3}
                  placeholder="Gate number, parking details, building information..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full bg-[#161616] border border-neutral-800 rounded-xl p-4 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* Step 06: Your Details */}
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-700 text-[#D4FF00] text-xs font-black flex items-center justify-center">
                {selectedService === 'Car Wash & Detailing' ? '06' : '05'}
              </span>
              <div>
                <h2 className="text-lg font-black uppercase tracking-wider">Your Details</h2>
                <p className="text-xs text-neutral-400">Tell us how we can contact you.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] transition"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Phone Number</label>
                <input
                  type="text"
                  placeholder="+974 XXXX XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4FF00] transition"
                  required
                />
              </div>
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

          {/* Submit / Proceed to Checkout Section */}
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[#D4FF00] text-[10px] font-black uppercase tracking-[0.25em] mb-1">SECURE STEP</p>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">Proceed To Checkout</h3>
              <p className="text-neutral-400 text-xs mt-1">Review details and choose payment method.</p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto bg-[#D4FF00] hover:bg-[#bce400] text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition shadow-lg shadow-[#D4FF00]/15 whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <span>{isSubmitting ? 'Loading...' : 'Proceed To Checkout'}</span>
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

        </form>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}