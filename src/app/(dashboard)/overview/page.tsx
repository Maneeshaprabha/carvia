'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Bell, Settings, Filter, Plus, Calendar, 
  ArrowUpRight, ArrowDownRight, Clock, ChevronDown, CheckCircle2, 
  MoreVertical, Link2, DownloadCloud, FileText, CheckSquare,
  AlertCircle, Car
} from 'lucide-react';

// --- MOCK DATA ---
const mockDeals = [
  {
    id: 'DEAL-8001',
    customer: 'Sarah Jenkins',
    role: 'Cash Buyer',
    vehicle: '2024 BMW X5',
    status: 'Pending',
    time: 'Closes in 2 days',
    amount: 68750.00,
    avatar: 'https://i.pravatar.cc/150?img=47'
  },
  {
    id: 'DEAL-8002',
    customer: 'Michael Chang',
    role: 'Financing',
    vehicle: '2023 Audi Q7',
    status: 'Approved',
    time: 'Closes in 4 days',
    amount: 51480.00,
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: 'DEAL-8003',
    customer: 'James Carter',
    role: 'Lease',
    vehicle: '2024 Porsche 911',
    status: 'Pending',
    time: 'Closes in 5 days',
    amount: 147980.00,
    avatar: 'https://i.pravatar.cc/150?img=68',
    active: true
  },
  {
    id: 'DEAL-8004',
    customer: 'Amanda Ray',
    role: 'Financing',
    vehicle: '2024 Range Rover',
    status: 'Approved',
    time: 'Closes in 16 days',
    amount: 95230.00,
    avatar: 'https://i.pravatar.cc/150?img=32'
  },
  {
    id: 'DEAL-8005',
    customer: 'Robert Fox',
    role: 'Cash Buyer',
    vehicle: '2022 Lexus RX',
    status: 'Approved',
    time: 'Closes in 19 days',
    amount: 46880.00,
    avatar: 'https://i.pravatar.cc/150?img=52'
  }
];

export default function DealershipDashboard() {
  const [activeTab, setActiveTab] = useState('Pending');

  return (
    <div className="w-full font-sans text-neutral-800 flex justify-center">
      {/* Main Container - matching the rounded white card of the reference */}
      <div className="w-full max-w-[1440px] bg-white rounded-[2rem] shadow-sm border border-neutral-100 overflow-hidden flex flex-col">
        
        {/* 1. TOP NAVIGATION */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-neutral-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/* Logo replacement */}
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <div>
                <h1 className="text-lg font-bold leading-tight text-neutral-900 tracking-tight">Carvia</h1>
                <p className="text-[10px] text-neutral-500 font-medium tracking-wider">SMART DEALERSHIP</p>
              </div>
            </div>
            <div className="ml-4 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-bold text-neutral-700">
              240
            </div>
          </div>

          {/* Center Pill Nav */}
          <nav className="hidden lg:flex items-center bg-[#1c1d22] rounded-full p-1.5 shadow-lg">
            <NavPill label="Overview" active />
            <NavPill label="Inventory" />
            <NavPill label="Sales" />
            <NavPill label="Service" />
            <NavPill label="Fleet" />
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <IconButton icon={<FileText size={18} />} />
            <IconButton icon={<CheckSquare size={18} />} />
            <IconButton icon={<Calendar size={18} />} />
            <IconButton icon={<DownloadCloud size={18} />} />
            <div className="w-px h-6 bg-neutral-200 mx-1"></div>
            <IconButton icon={<Settings size={18} />} />
            <IconButton icon={<Bell size={18} />} badge />
            <div className="w-10 h-10 ml-2 rounded-full overflow-hidden border-2 border-neutral-100">
              <img src="https://i.pravatar.cc/150?img=33" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <main className="p-8 flex-1 overflow-y-auto custom-scrollbar bg-white">
          
          {/* 2. HEADER */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors">
                <ArrowLeft size={20} className="text-neutral-600" />
              </button>
              <div>
                <h2 className="text-3xl font-bold text-neutral-900">Dealership Overview</h2>
                <p className="text-neutral-500 text-sm mt-0.5">Manage and track your active inventory, sales pipeline, and deals.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-xl border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors shadow-sm">
                <Filter size={18} className="text-neutral-600" />
              </button>
              <button className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center gap-2 font-medium transition-colors shadow-lg shadow-red-600/20">
                <Plus size={18} />
                Add Vehicle
              </button>
            </div>
          </div>

          {/* 3. FOUR STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            
            {/* Card 1: Active Inventory */}
            <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-sm font-semibold text-neutral-800">Active Inventory Value</h3>
                <Car size={16} className="text-red-500" />
              </div>
              <div>
                <p className="text-3xl font-bold text-neutral-900 mb-2">$ 2,450,850.00</p>
                <p className="text-xs font-medium text-green-500 flex items-center gap-1">
                  <ArrowUpRight size={14} /> 4.5% <span className="text-neutral-400">from last month</span>
                </p>
              </div>
              {/* Decorative Graphic (Simulating desk setup from ref) */}
              <div className="absolute -bottom-2 right-2 opacity-80 pointer-events-none">
                 <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 70L40 70L50 50L80 50L90 70L110 70" stroke="#e5e7eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="65" cy="30" r="15" fill="#f3f4f6"/>
                  <rect x="55" y="45" width="20" height="15" fill="#e5e7eb" rx="2"/>
                </svg>
              </div>
            </div>

            {/* Card 2: Vehicles Sold */}
            <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-sm font-semibold text-neutral-800">Vehicles Sold (This Month)</h3>
                <Calendar size={16} className="text-red-500" />
              </div>
              <div>
                <p className="text-3xl font-bold text-neutral-900 mb-2">142 <span className="text-lg text-neutral-500 font-medium">units</span></p>
                <p className="text-xs font-medium text-green-500 flex items-center gap-1">
                  <ArrowUpRight size={14} /> 12.2% <span className="text-neutral-400">from last month</span>
                </p>
              </div>
              {/* Mini Bar Chart */}
              <div className="flex items-end gap-2 h-14 mt-4 w-full">
                {[30, 45, 20, 60, 80, 50, 95].map((height, i) => (
                  <div key={i} className="flex-1 bg-red-100 rounded-t-sm hover:bg-red-600 transition-colors cursor-pointer group relative" style={{ height: `${height}%` }}>
                    {i === 4 && <div className="absolute inset-0 bg-red-500 rounded-t-sm"></div>}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-neutral-400 font-medium mt-1 px-1 uppercase">
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
            </div>

            {/* Card 3: Average Days on Lot */}
            <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-sm font-semibold text-neutral-800">Average Days on Lot</h3>
                <Clock size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-neutral-900 mb-2">16 <span className="text-lg text-neutral-500 font-medium">days</span></p>
                <p className="text-xs font-medium text-blue-500 flex items-center gap-1">
                  <ArrowDownRight size={14} /> 2 days <span className="text-neutral-400">from last month</span>
                </p>
              </div>
              {/* Mini Line Chart */}
              <div className="h-16 mt-3 w-full relative">
                <svg viewBox="0 0 100 40" className="w-full h-full preserve-3d overflow-visible">
                  <path d="M0 35 Q 15 35, 20 25 T 40 20 T 55 15 T 75 10 T 100 5" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="20" cy="25" r="2.5" fill="white" stroke="#ef4444" strokeWidth="1.5"/>
                  <circle cx="40" cy="20" r="2.5" fill="white" stroke="#ef4444" strokeWidth="1.5"/>
                  <circle cx="55" cy="15" r="2.5" fill="white" stroke="#ef4444" strokeWidth="1.5"/>
                  <circle cx="75" cy="10" r="2.5" fill="white" stroke="#ef4444" strokeWidth="1.5"/>
                  <circle cx="100" cy="5" r="3" fill="#ef4444" />
                </svg>
              </div>
            </div>

            {/* Card 4: Projected Revenue */}
            <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between">
               <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-semibold text-neutral-800">Projected Revenue</h3>
                <button className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50">
                  <ArrowUpRight size={12} className="text-neutral-600" />
                </button>
              </div>
              <div className="flex items-end gap-2 mb-4">
                <p className="text-3xl font-bold text-neutral-900">$ 1,186,540.00</p>
                <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-xs font-semibold rounded mb-1">Pipeline</span>
              </div>
              
              {/* Payment Methods */}
              <div className="flex items-end gap-2 mt-auto">
                <div className="flex-1 bg-neutral-50 rounded-xl p-3 border border-neutral-100 flex flex-col justify-between h-[72px]">
                  <p className="text-[10px] font-bold text-neutral-500 mb-1">45%</p>
                  <p className="text-xs font-bold text-neutral-800 mt-auto">Cash</p>
                </div>
                {/* Active Payment Box (Red instead of purple) */}
                <div className="flex-1 bg-red-600 rounded-xl p-3 shadow-lg shadow-red-600/20 flex flex-col justify-between h-[84px] transform translate-y-2">
                  <p className="text-[10px] font-bold text-red-200 mb-1">35%</p>
                  <p className="text-xs font-bold text-white mt-auto">Finance</p>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                   <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100 flex flex-col justify-between h-[50px]">
                    <p className="text-[10px] font-bold text-neutral-500">20% Lease</p>
                  </div>
                  <button className="w-full bg-[#1c1d22] text-white text-[10px] font-bold py-2 rounded-lg hover:bg-black transition-colors">
                    View Pipeline
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. FILTERS ROW */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-neutral-100 px-3 py-2 rounded-xl text-sm font-semibold text-neutral-700">
              Active filters <span className="bg-neutral-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">2</span>
            </div>
            <FilterDropdown label="All Makes" />
            <FilterDropdown label="All Statuses" />
            <DateFilter label="November 2023" />
            <DateFilter label="December 2023" />
            
            <div className="ml-auto relative w-[240px]">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Enter VIN or Deal #" 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all bg-white"
              />
            </div>
          </div>

          {/* 5. DARK SECTION (Bottom split layout) */}
          <div className="bg-[#1c1c24] rounded-[2rem] p-6 lg:p-8 flex flex-col lg:flex-row gap-6 relative mt-12 min-h-[500px]">
            
            {/* Hovering Tabs (Simulating the top notch from reference) */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full p-1.5 flex items-center shadow-lg border border-neutral-100">
              <TabBtn label="All Deals" />
              <TabBtn label="Completed" count="12" />
              <TabBtn label="Pending" count="5" active />
            </div>

            {/* LEFT COLUMN: List */}
            <div className="w-full lg:w-[35%] flex flex-col mt-4 lg:mt-0">
              <h3 className="text-white font-bold mb-6 px-2">Pending Deals</h3>
              <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2 h-[450px]">
                {mockDeals.map((deal) => (
                  <div 
                    key={deal.id} 
                    className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-colors ${
                      deal.active 
                        ? 'bg-red-600 shadow-lg shadow-red-600/20' 
                        : 'bg-[#24252f] hover:bg-[#2c2d38]'
                    }`}
                  >
                    <img src={deal.avatar} alt={deal.customer} className="w-10 h-10 rounded-full bg-neutral-800 object-cover border-2 border-transparent" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`font-bold text-sm ${deal.active ? 'text-white' : 'text-neutral-200'}`}># {deal.id}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          deal.active ? 'bg-white text-red-600' : 'bg-[#353746] text-neutral-300'
                        }`}>
                          {deal.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className={`text-xs ${deal.active ? 'text-red-100' : 'text-neutral-500'}`}>{deal.time}</p>
                        <p className={`font-bold text-sm ${deal.active ? 'text-white' : 'text-neutral-200'}`}>
                          $ {(deal.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Detail View */}
            <div className="w-full lg:w-[65%] bg-[#4f5370]/10 border border-white/5 rounded-3xl p-6 lg:p-8 flex flex-col mt-4 lg:mt-0">
              
              {/* Detail Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex gap-12">
                  <div>
                    <p className="text-xs text-neutral-400 font-medium mb-2">Deal details</p>
                    <div className="flex items-center gap-3">
                      <h2 className="text-3xl font-bold text-white"># DEAL-8003</h2>
                      <span className="bg-[#353746] text-neutral-300 text-[10px] font-bold px-2.5 py-1 rounded-full">Pending</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 font-medium mb-2">Vehicle</p>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">2024 Porsche 911</h3>
                      <div className="w-5 h-5 rounded bg-red-500 flex items-center justify-center text-white text-[10px]"><Car size={12}/></div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-neutral-400 font-medium mb-2">Customer</p>
                  <div className="flex items-center gap-3 bg-[#1c1c24] py-1.5 px-2 rounded-full border border-white/5 pr-4">
                     <img src={mockDeals[2].avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                     <div className="text-left">
                       <p className="text-sm font-bold text-white leading-tight">James Carter</p>
                       <p className="text-[10px] text-neutral-400">Lease Agreement</p>
                     </div>
                  </div>
                </div>
              </div>

              {/* Line Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-auto">
                <LineItemCard amount="135,500.00" title="Base Price" />
                <LineItemCard amount="1,850.00" title="Dealer Fees" />
                <LineItemCard amount="10,630.00" title="Taxes & Registration" />
                <button className="bg-transparent border border-dashed border-neutral-600 rounded-2xl flex flex-col items-center justify-center p-6 text-neutral-400 hover:text-white hover:border-neutral-400 transition-colors min-h-[110px]">
                  <Plus size={20} className="mb-2" />
                  <span className="text-sm font-medium">Add Add-on</span>
                </button>
              </div>

              {/* Detail Footer (Totals) */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-end justify-between">
                <div className="flex gap-12">
                  <div>
                    <p className="text-xs text-neutral-400 font-medium mb-1">Sub Total</p>
                    <p className="text-xl font-bold text-white">$ 137,350.00</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 font-medium mb-1">Taxes</p>
                    <p className="text-xl font-bold text-white">$ 10,630.00</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 font-medium mb-1">Total Due</p>
                    <p className="text-xl font-bold text-white">$ 147,980.00</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-neutral-300 hover:bg-white/10 transition-colors">
                    <Link2 size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-neutral-300 hover:bg-white/10 transition-colors">
                    <Calendar size={18} />
                  </button>
                  <button className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                    Finalize Deal
                  </button>
                </div>
              </div>

            </div>

            {/* Extra settings icon floating top right of dark box */}
            <div className="absolute top-6 right-6 flex items-center gap-2 text-neutral-400">
               <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                 <CheckSquare size={16} />
               </button>
               <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                 <MoreVertical size={16} />
               </button>
            </div>

          </div>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #d4d4d4; }
      `}} />
    </div>
  );
}

// --- SUB COMPONENTS ---

function NavPill({ label, active }) {
  return (
    <button className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
      active ? 'bg-red-600 text-white' : 'text-neutral-400 hover:text-white hover:bg-white/10'
    }`}>
      {label}
    </button>
  );
}

function IconButton({ icon, badge }) {
  return (
    <button className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors relative border border-transparent">
      {icon}
      {badge && (
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
      )}
    </button>
  );
}

function FilterDropdown({ label }) {
  return (
    <button className="flex items-center gap-2 bg-white border border-neutral-200 px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-700 hover:border-neutral-300 transition-colors shadow-sm">
      {label}
      <ChevronDown size={16} className="text-neutral-400" />
    </button>
  );
}

function DateFilter({ label }) {
  return (
    <button className="flex items-center gap-2 bg-white border border-neutral-200 px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-700 hover:border-neutral-300 transition-colors shadow-sm">
      {label}
      <Calendar size={16} className="text-neutral-400" />
    </button>
  );
}

function TabBtn({ label, count, active }) {
  return (
    <button className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${
      active ? 'bg-red-600 text-white shadow-md' : 'text-neutral-500 hover:text-neutral-800'
    }`}>
      {label}
      {count && (
        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
          active ? 'bg-white text-red-600' : 'bg-neutral-100 text-neutral-500'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}

function LineItemCard({ amount, title }) {
  return (
    <div className="bg-[#1c1c24] rounded-2xl p-5 border border-white/5 relative group cursor-pointer hover:border-red-500/50 transition-colors">
      <p className="text-xl font-bold text-white mb-6">$ {amount} <span className="text-neutral-500 font-normal absolute right-5 top-5 opacity-0 group-hover:opacity-100 transition-opacity text-sm"><ArrowUpRight size={16}/></span></p>
      <p className="text-sm text-neutral-400 font-medium">{title}</p>
    </div>
  );
}