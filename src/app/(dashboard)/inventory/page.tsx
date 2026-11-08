"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Gauge, 
  Settings2, 
  MoreHorizontal, 
  X,
  Phone,
  Mail,
  FileText,
  Plus,
  Copy,
  Check,
  Sparkles,
  Calendar,
  ShieldCheck,
  Fuel,
  ArrowUpRight
} from 'lucide-react';

const inventoryData = [
  { 
    id: '#VIN-88210', make: 'Porsche', model: '911 GT3 RS', year: 2024, price: 241300, 
    status: 'Available', stage: 2, mileage: '120 mi', color: 'Guards Red', engine: '4.0L Flat-6 NA', 
    drivetrain: 'RWD', fuel: 'Petrol', keys: '2 Sets', condition: 99, daysInStock: 12,
    location: 'Showroom Floor • Zone A4', dateAdded: 'Oct 25, 2026', rep: 'Alex Mercer',
    repRole: 'Senior Sales Executive', repAvatar: 'https://i.pravatar.cc/150?img=33',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=85'
  },
  { 
    id: '#VIN-55092', make: 'Tesla', model: 'Model S Plaid', year: 2024, price: 89990, 
    status: 'Reserved', stage: 3, mileage: '45 mi', color: 'Obsidian Black', engine: 'Tri-Motor 1,020 hp', 
    drivetrain: 'AWD', fuel: 'Electric', keys: '2 Key Cards', condition: 100, daysInStock: 5,
    location: 'Delivery Bay 1 • VIP', dateAdded: 'Nov 02, 2026', rep: 'Sarah Jenkins',
    repRole: 'EV Specialist', repAvatar: 'https://i.pravatar.cc/150?img=47',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=85'
  },
  { 
    id: '#VIN-33411', make: 'BMW', model: 'M5 Competition', year: 2023, price: 118500, 
    status: 'Available', stage: 2, mileage: '4,200 mi', color: 'Alpine White', engine: '4.4L V8 Twin-Turbo', 
    drivetrain: 'M xDrive', fuel: 'Petrol', keys: '2 Sets + Display', condition: 96, daysInStock: 19,
    location: 'North Lot • Row B3', dateAdded: 'Oct 18, 2026', rep: 'David Kim',
    repRole: 'Sales Advisor', repAvatar: 'https://i.pravatar.cc/150?img=12',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=85'
  },
  { 
    id: '#VIN-99021', make: 'Mercedes-AMG', model: 'G 63 Wagon', year: 2024, price: 184900, 
    status: 'Sold', stage: 4, mileage: '18 mi', color: 'Night Black Magno', engine: '4.0L V8 Biturbo', 
    drivetrain: '4MATIC', fuel: 'Petrol', keys: '2 Sets', condition: 100, daysInStock: 3,
    location: 'Customer Handover Lounge', dateAdded: 'Nov 04, 2026', rep: 'Alex Mercer',
    repRole: 'Senior Sales Executive', repAvatar: 'https://i.pravatar.cc/150?img=33',
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=800&auto=format&fit=crop&q=85'
  },
  { 
    id: '#VIN-11204', make: 'Audi', model: 'RS6 Avant GT', year: 2024, price: 136800, 
    status: 'In Transit', stage: 1, mileage: '15 mi', color: 'Nardo Gray', engine: '4.0L TFSI V8', 
    drivetrain: 'Quattro AWD', fuel: 'Hybrid / Petrol', keys: '2 Sets', condition: 98, daysInStock: 2,
    location: 'En Route • Carrier #TX-452', dateAdded: 'Nov 05, 2026', rep: 'Marcus Cole',
    repRole: 'Fleet Coordinator', repAvatar: 'https://i.pravatar.cc/150?img=68',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=85'
  },
  { 
    id: '#VIN-77419', make: 'Lamborghini', model: 'Huracán Sterrato', year: 2024, price: 278900, 
    status: 'Available', stage: 2, mileage: '95 mi', color: 'Verde Gea Matte', engine: '5.2L V10 NA', 
    drivetrain: 'AWD', fuel: 'Petrol', keys: '2 Sets', condition: 100, daysInStock: 8,
    location: 'Showroom Centerpiece', dateAdded: 'Oct 29, 2026', rep: 'Sarah Jenkins',
    repRole: 'Exotics Specialist', repAvatar: 'https://i.pravatar.cc/150?img=47',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop&q=85'
  },
];

const pipelineSteps = ['Inbound', 'Inspected', 'Showroom', 'Reserved', 'Sold'];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
};

// Modern SaaS badge styling inspired by reference image
const getStatusBadge = (status: string) => {
  switch(status) {
    case 'Available': 
      return 'bg-[#bbf7d0] text-[#14532d] border border-[#86efac]/60'; 
    case 'Reserved': 
      return 'bg-[#fde68a] text-[#78350f] border border-[#fcd34d]/60'; 
    case 'In Transit': 
      return 'bg-[#a5f3fc] text-[#164e63] border border-[#67e8f9]/60'; 
    case 'Sold': 
      return 'bg-[#e5e7eb] text-[#374151] border border-[#d1d5db]'; 
    default: 
      return 'bg-neutral-100 text-neutral-700';
  }
};

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(inventoryData[0]);
  const [copiedVin, setCopiedVin] = useState(false);

  // Dynamic Tab Counts & Filtering
  const filteredVehicles = useMemo(() => {
    return inventoryData.filter((v) => {
      const matchesTab = activeTab === 'All' || v.status === activeTab;
      const matchesSearch = 
        v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const tabs = [
    { name: 'All', count: inventoryData.length },
    { name: 'Available', count: inventoryData.filter(v => v.status === 'Available').length },
    { name: 'Reserved', count: inventoryData.filter(v => v.status === 'Reserved').length },
    { name: 'In Transit', count: inventoryData.filter(v => v.status === 'In Transit').length },
    { name: 'Sold', count: inventoryData.filter(v => v.status === 'Sold').length },
  ];

  const handleCopyVin = (vin: string) => {
    navigator.clipboard.writeText(vin);
    setCopiedVin(true);
    setTimeout(() => setCopiedVin(false), 1800);
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] gap-5 overflow-hidden select-none">
      
      {/* LEFT PANEL: Master Vehicle Cards Grid */}
      <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-neutral-200/80 shadow-[0_2px_20px_rgba(0,0,0,0.02)] overflow-hidden">
        
        {/* Top Bar: Title, Search & Add CTA */}
        <div className="px-7 pt-6 pb-4 flex flex-wrap items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-3">
            <h1 className="text-[26px] font-extrabold text-neutral-900 tracking-tight">Inventory</h1>
            <span className="px-2.5 py-1 bg-red-50 text-[#e60000] font-extrabold text-xs rounded-full border border-red-100">
              Live Stock
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Search Input */}
            <div className="relative w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search VIN, model, or lot..." 
                className="w-full pl-10 pr-8 py-2.5 bg-[#f8f9fa] border border-neutral-200/80 rounded-xl text-xs font-semibold text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-[#e60000] focus:ring-2 focus:ring-[#e60000]/10 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            
            <button className="p-2.5 bg-[#f8f9fa] border border-neutral-200/80 rounded-xl text-neutral-600 hover:bg-neutral-100 transition-colors">
              <SlidersHorizontal size={16} />
            </button>

            {/* ADD VEHICLE BUTTON */}
            <Link 
              href="/inventory/add" 
              className="flex items-center gap-2 bg-[#e60000] text-white px-4 py-2.5 rounded-xl font-bold hover:bg-red-700 active:scale-[0.99] transition-all shadow-md shadow-red-600/20 text-xs whitespace-nowrap"
            >
              <Plus size={16} strokeWidth={2.5} /> Add Vehicle
            </Link>
          </div>
        </div>

        {/* Modern Pill & Underline Tabs */}
        <div className="px-7 border-b border-neutral-100 flex items-center gap-6 bg-white overflow-x-auto custom-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button 
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 py-3 border-b-2 transition-all whitespace-nowrap relative ${
                  isActive 
                    ? 'border-[#e60000] text-neutral-900' 
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <span className="font-extrabold text-[13px]">{tab.name}</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-neutral-900 text-white' 
                    : 'bg-neutral-100 text-neutral-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards Scroll Container */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#f6f7f9] custom-scrollbar">
          {filteredVehicles.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-12 h-12 rounded-2xl bg-neutral-200/60 flex items-center justify-center text-neutral-500 mb-3">
                <Search size={20} />
              </div>
              <p className="text-sm font-bold text-neutral-800">No vehicles match your filter</p>
              <p className="text-xs text-neutral-400 mt-1">Try clearing your search query or switching tabs.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredVehicles.map((vehicle) => {
                const isSelected = selectedVehicle.id === vehicle.id;
                return (
                  <motion.div 
                    layout
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className={`p-5 rounded-2xl transition-all cursor-pointer bg-white flex flex-col justify-between relative overflow-hidden group ${
                      isSelected 
                        ? 'border-2 border-[#e60000] shadow-[0_8px_30px_rgba(230,0,0,0.08)] ring-4 ring-[#e60000]/10' 
                        : 'border border-neutral-200/70 hover:border-[#e60000]/50 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
                    }`}
                  >
                    {/* Card Top: VIN & Status Pill */}
                    <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-extrabold text-neutral-900 tracking-tight">
                          {vehicle.id}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#e60000] animate-pulse" />
                        )}
                      </div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-wide ${getStatusBadge(vehicle.status)}`}>
                        {vehicle.status}
                      </span>
                    </div>
                    
                    {/* Card Body: Metadata Left + Cutout Style Car Image Right */}
                    <div className="pt-3.5 flex justify-between items-end gap-3">
                      <div className="space-y-2.5 flex-1 min-w-0">
                        <div>
                          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                            {vehicle.year} • {vehicle.make}
                          </p>
                          <h3 className="text-[15px] font-extrabold text-neutral-900 truncate">
                            {vehicle.model}
                          </h3>
                          <p className="text-[11px] font-medium text-neutral-500 truncate mt-0.5">
                            {vehicle.location}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 pt-1">
                          <div>
                            <p className="text-[10px] font-bold text-neutral-400 uppercase">Price</p>
                            <p className="text-xs font-extrabold text-neutral-900">{formatCurrency(vehicle.price)}</p>
                          </div>
                          <div className="h-6 w-[1px] bg-neutral-100" />
                          <div>
                            <p className="text-[10px] font-bold text-neutral-400 uppercase">Assigned To</p>
                            <p className="text-xs font-bold text-neutral-700 truncate">{vehicle.rep}</p>
                          </div>
                        </div>
                      </div>

                      {/* Right Image Container */}
                      <div className="w-36 h-24 rounded-xl bg-neutral-100 border border-neutral-200/60 overflow-hidden flex-shrink-0 relative">
                        <img 
                          src={vehicle.image} 
                          alt={vehicle.model} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: Ultra-Modern Inspector Drawer (Matches Shipment #US00121 reference) */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedVehicle.id}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 15 }}
          transition={{ duration: 0.2 }}
          className="w-full lg:w-[460px] xl:w-[510px] flex flex-col bg-white rounded-[2rem] border border-neutral-200/80 shadow-[0_2px_20px_rgba(0,0,0,0.02)] overflow-hidden"
        >
          {/* Inspector Top Header */}
          <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-extrabold text-neutral-900 tracking-tight">
                Stock {selectedVehicle.id}
              </h2>
              <button 
                onClick={() => handleCopyVin(selectedVehicle.id)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                title="Copy VIN"
              >
                {copiedVin ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Link 
                href={`/inventory/${selectedVehicle.id.replace('#', '')}`}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
              >
                Full Page <ArrowUpRight size={13} />
              </Link>
              <button className="p-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-500 rounded-xl transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* Inspector Scroll Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4 bg-[#f6f7f9]">
            
            {/* 1. Primary Summary Card with Pipeline Stepper */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200/70 shadow-sm space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`inline-block text-[10px] font-extrabold px-2.5 py-1 rounded-md mb-2 ${getStatusBadge(selectedVehicle.status)}`}>
                    {selectedVehicle.status}
                  </span>
                  <h3 className="text-xl font-extrabold text-neutral-900 leading-tight">
                    {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-400 mt-0.5">
                    {selectedVehicle.color} • Listed {selectedVehicle.dateAdded}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Retail Price</p>
                  <p className="text-xl font-extrabold text-[#e60000]">{formatCurrency(selectedVehicle.price)}</p>
                </div>
              </div>

              {/* Hero Image + Meta Split */}
              <div className="grid grid-cols-12 gap-4 items-center pt-1">
                <div className="col-span-7 space-y-3 text-xs">
                  <div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Showroom Location</p>
                    <p className="font-bold text-neutral-800 mt-0.5">{selectedVehicle.location}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-neutral-400 uppercase">Sales Rep</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <img src={selectedVehicle.repAvatar} className="w-5 h-5 rounded-full object-cover" alt="" />
                        <span className="font-bold text-neutral-800">{selectedVehicle.rep}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-5 h-24 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
                  <img src={selectedVehicle.image} alt={selectedVehicle.model} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Horizontal Dealership Pipeline Stepper (Just like reference image) */}
              <div className="pt-3 border-t border-neutral-100">
                <div className="relative flex items-center justify-between">
                  <div className="absolute left-0 right-0 top-1.5 h-[2px] bg-neutral-200 -z-0" />
                  <div 
                    className="absolute left-0 top-1.5 h-[2px] bg-[#e60000] transition-all duration-300 -z-0" 
                    style={{ width: `${(selectedVehicle.stage / (pipelineSteps.length - 1)) * 100}%` }}
                  />
                  {pipelineSteps.map((step, idx) => {
                    const isCompleted = idx <= selectedVehicle.stage;
                    const isCurrent = idx === selectedVehicle.stage;
                    return (
                      <div key={step} className="flex flex-col items-center z-10">
                        <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                          isCurrent 
                            ? 'bg-[#e60000] border-[#e60000] ring-4 ring-red-600/20' 
                            : isCompleted 
                            ? 'bg-neutral-900 border-neutral-900' 
                            : 'bg-white border-neutral-300'
                        }`} />
                        <span className={`text-[10px] mt-2 font-bold ${
                          isCurrent ? 'text-neutral-900 font-extrabold' : isCompleted ? 'text-neutral-600' : 'text-neutral-400'
                        }`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. Middle Bento Grid: Inspection Metrics & Lot Map View */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Left Box: Vehicle Telemetry & Inspection Score */}
              <div className="bg-white p-4 rounded-2xl border border-neutral-200/70 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold text-neutral-900">Inspection Metrics</span>
                  <MoreHorizontal size={14} className="text-neutral-400" />
                </div>

                <div className="flex items-center justify-between my-1">
                  <div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">Odometer</p>
                    <p className="text-sm font-extrabold text-neutral-900">{selectedVehicle.mileage}</p>
                  </div>
                  {/* Circular Score Ring */}
                  <div className="relative w-12 h-12 rounded-full flex items-center justify-center bg-neutral-50 border-4 border-[#e60000]">
                    <span className="text-[11px] font-extrabold text-neutral-900">{selectedVehicle.condition}%</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-neutral-400">Lot Aging</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <span 
                        key={dot} 
                        className={`w-2 h-2 rounded-full ${dot <= 3 ? 'bg-neutral-900' : 'bg-neutral-200'}`} 
                      />
                    ))}
                    <span className="ml-1 font-extrabold text-neutral-800">{selectedVehicle.daysInStock}d</span>
                  </div>
                </div>
              </div>

              {/* Right Box: Simulated Lot Map Card */}
              <div className="bg-white rounded-2xl border border-neutral-200/70 shadow-sm overflow-hidden flex flex-col">
                <div 
                  className="h-28 w-full relative flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: '#eef2f6',
                    backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                    backgroundSize: '12px 12px'
                  }}
                >
                  {/* Decorative simulated roads/zones */}
                  <div className="absolute inset-0 opacity-40 pointer-events-none">
                    <div className="w-full h-3 bg-white rotate-12 translate-y-8" />
                    <div className="w-3 h-full bg-white -rotate-12 translate-x-16" />
                  </div>
                  <button className="relative z-10 flex items-center gap-1.5 bg-neutral-900 text-white px-3.5 py-2 rounded-xl text-[11px] font-bold shadow-lg hover:bg-[#e60000] transition-colors">
                    <MapPin size={13} /> Lot Map View
                  </button>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-neutral-900">Bay Telemetry</span>
                    <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Active GPS</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 font-medium truncate mt-1">
                    {selectedVehicle.location}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Technical Specs Progress Card */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200/70 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-neutral-900">Technical Specifications</h4>
                <span className="text-[11px] font-extrabold text-neutral-900">150-Pt Certified</span>
              </div>

              {/* Readiness Progress Bar */}
              <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-neutral-900 rounded-full transition-all duration-500" 
                  style={{ width: `${selectedVehicle.condition}%` }} 
                />
              </div>

              <div className="grid grid-cols-3 gap-3 pt-1 text-xs">
                <div className="bg-[#f8f9fa] p-3 rounded-xl border border-neutral-100">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Powertrain</p>
                  <p className="font-extrabold text-neutral-900 mt-0.5 truncate">{selectedVehicle.engine}</p>
                </div>
                <div className="bg-[#f8f9fa] p-3 rounded-xl border border-neutral-100">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Drivetrain</p>
                  <p className="font-extrabold text-neutral-900 mt-0.5">{selectedVehicle.drivetrain}</p>
                </div>
                <div className="bg-[#f8f9fa] p-3 rounded-xl border border-neutral-100">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Keys / Fobs</p>
                  <p className="font-extrabold text-neutral-900 mt-0.5">{selectedVehicle.keys}</p>
                </div>
              </div>
            </div>

            {/* 4. Assigned Specialist Card */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-200/70 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedVehicle.repAvatar} 
                  alt={selectedVehicle.rep} 
                  className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <p className="text-xs font-extrabold text-neutral-900">{selectedVehicle.rep}</p>
                  <p className="text-[11px] font-medium text-neutral-400">{selectedVehicle.repRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors">
                  <Phone size={14} />
                </button>
                <button className="w-8 h-8 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors">
                  <Mail size={14} />
                </button>
              </div>
            </div>

          </div>
          
          {/* Sticky Bottom Actions */}
          <div className="p-4 border-t border-neutral-100 bg-white grid grid-cols-2 gap-3">
            <Link 
              href={`/inventory/${selectedVehicle.id.replace('#', '')}`}
              className="py-3 px-4 border border-neutral-200 rounded-xl font-bold text-neutral-700 hover:bg-neutral-50 text-xs transition-colors flex items-center justify-center"
            >
              View Full Dossier
            </Link>
            <button className="py-3 px-4 bg-[#e60000] rounded-xl font-bold text-white hover:bg-red-700 shadow-md shadow-red-600/20 text-xs transition-colors flex items-center justify-center gap-2">
              <FileText size={15} /> Launch Deal Desk
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}