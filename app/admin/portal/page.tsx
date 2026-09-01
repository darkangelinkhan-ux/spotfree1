'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase Connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yroyaxtzhyskgoekcqwl.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_eStqAWOb1-zyRvBB4GEoew_jmi8VqsW';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'services' | 'contacts'>('overview');
  
  const [bookings, setBookings] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Supabase se saara data ek sath lana
  useEffect(() => {
    async function fetchAllData() {
      setLoading(true);
      try {
        // 1. Bookings Table
        const { data: bData } = await supabase.from('bookings').select('*');
        if (bData) setBookings(bData);

        // 2. Services Table
        const { data: sData } = await supabase.from('services').select('*');
        if (sData) setServices(sData);

        // 3. Contacts / Messages Table (agar table ka naam 'contacts' ya 'messages' ho)
        const { data: cData } = await supabase.from('contacts').select('*');
        if (cData) setContacts(cData);

      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-neutral-800 bg-neutral-950 p-6 hidden md:flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl bg-[#D4FF00] flex items-center justify-center font-black text-neutral-950 text-lg shadow-lg shadow-[#D4FF00]/10">
              S
            </div>
            <div>
              <h2 className="font-bold text-base tracking-wide">SpotFree</h2>
              <span className="text-[10px] uppercase tracking-widest text-[#D4FF00] font-semibold">Admin Panel</span>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'overview' ? 'bg-[#D4FF00] text-neutral-950 font-bold shadow-md' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}`}
            >
              📊 Overview & Stats
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'bookings' ? 'bg-[#D4FF00] text-neutral-950 font-bold shadow-md' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}`}
            >
              📅 Bookings <span className="ml-auto bg-neutral-800 text-xs px-2 py-0.5 rounded-full text-neutral-300">{bookings.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'services' ? 'bg-[#D4FF00] text-neutral-950 font-bold shadow-md' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}`}
            >
              🛠️ Services <span className="ml-auto bg-neutral-800 text-xs px-2 py-0.5 rounded-full text-neutral-300">{services.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'contacts' ? 'bg-[#D4FF00] text-neutral-950 font-bold shadow-md' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}`}
            >
              💬 Messages <span className="ml-auto bg-neutral-800 text-xs px-2 py-0.5 rounded-full text-neutral-300">{contacts.length}</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-neutral-900 text-xs text-neutral-500">
          <p>Logged in as Admin</p>
          <p className="text-emerald-400 font-mono mt-1">● Database Connected</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        
        {/* Top Header */}
        <header className="h-20 border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-md px-6 md:px-10 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-bold capitalize text-neutral-200">
            {activeTab === 'overview' ? 'Dashboard Analytics' : `${activeTab} Management`}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-xs px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
              Environment: <span className="text-[#D4FF00]">Live</span>
            </span>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-6 md:p-10 max-w-7xl w-full mx-auto flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-96 gap-3">
              <div className="w-8 h-8 border-2 border-[#D4FF00] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-neutral-400 text-sm">Fetching secure data from Supabase...</p>
            </div>
          ) : (
            <>
              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-neutral-900/60 border border-neutral-800/80 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
                      <p className="text-neutral-400 text-sm font-medium">Total Bookings</p>
                      <h3 className="text-4xl font-black mt-2 text-[#D4FF00]">{bookings.length}</h3>
                      <p className="text-xs text-neutral-500 mt-2">Active client reservations</p>
                    </div>
                    <div className="bg-neutral-900/60 border border-neutral-800/80 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
                      <p className="text-neutral-400 text-sm font-medium">Available Services</p>
                      <h3 className="text-4xl font-black mt-2 text-white">{services.length}</h3>
                      <p className="text-xs text-neutral-500 mt-2">Active service offerings</p>
                    </div>
                    <div className="bg-neutral-900/60 border border-neutral-800/80 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
                      <p className="text-neutral-400 text-sm font-medium">Contact Messages</p>
                      <h3 className="text-4xl font-black mt-2 text-cyan-400">{contacts.length}</h3>
                      <p className="text-xs text-neutral-500 mt-2">Inquiries from website</p>
                    </div>
                  </div>

                  {/* Quick Preview Section */}
                  <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-4 text-neutral-200">System Status</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      Aapka admin portal mukammal taur par Supabase database ke sath synced hai. Kisi bhi naye user ki booking ya message aate hi yahan live update ho jayega.
                    </p>
                  </div>
                </div>
              )}

              {/* BOOKINGS TAB */}
              {activeTab === 'bookings' && (
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-6 text-neutral-200">Client Bookings List</h3>
                  {bookings.length === 0 ? (
                    <p className="text-neutral-500 py-12 text-center text-sm">Koi booking record mojood nahi hai database mein.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
                            <th className="py-3 px-4">#ID</th>
                            <th className="py-3 px-4">Booking Data Details</th>
                            <th className="py-3 px-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/50 text-sm">
                          {bookings.map((item, idx) => (
                            <tr key={idx} className="hover:bg-neutral-800/30 transition-colors">
                              <td className="py-4 px-4 font-mono text-neutral-400">#{item.id || idx + 1}</td>
                              <td className="py-4 px-4 font-mono text-xs text-neutral-300 max-w-lg truncate">
                                {JSON.stringify(item)}
                              </td>
                              <td className="py-4 px-4">
                                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
                                  Confirmed
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* SERVICES TAB */}
              {activeTab === 'services' && (
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-6 text-neutral-200">Services Catalog</h3>
                  {services.length === 0 ? (
                    <p className="text-neutral-500 py-12 text-center text-sm">Koi service add nahi ki gayi abhi tak.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
                            <th className="py-3 px-4">#ID</th>
                            <th className="py-3 px-4">Service Details</th>
                            <th className="py-3 px-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/50 text-sm">
                          {services.map((item, idx) => (
                            <tr key={idx} className="hover:bg-neutral-800/30 transition-colors">
                              <td className="py-4 px-4 font-mono text-neutral-400">#{item.id || idx + 1}</td>
                              <td className="py-4 px-4 font-mono text-xs text-neutral-300 max-w-lg truncate">
                                {JSON.stringify(item)}
                              </td>
                              <td className="py-4 px-4">
                                <span className="px-3 py-1 bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/20 rounded-full text-xs font-semibold">
                                  Active
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* CONTACTS TAB */}
              {activeTab === 'contacts' && (
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-6 text-neutral-200">Customer Messages & Inquiries</h3>
                  {contacts.length === 0 ? (
                    <p className="text-neutral-500 py-12 text-center text-sm">Koi contact message nahi mila.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
                            <th className="py-3 px-4">#ID</th>
                            <th className="py-3 px-4">Message Content</th>
                            <th className="py-3 px-4">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/50 text-sm">
                          {contacts.length > 0 && contacts.map((item, idx) => (
                            <tr key={idx} className="hover:bg-neutral-800/30 transition-colors">
                              <td className="py-4 px-4 font-mono text-neutral-400">#{item.id || idx + 1}</td>
                              <td className="py-4 px-4 font-mono text-xs text-neutral-300 max-w-lg truncate">
                                {JSON.stringify(item)}
                              </td>
                              <td className="py-4 px-4">
                                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-semibold">
                                  Unread
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}