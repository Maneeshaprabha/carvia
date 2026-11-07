"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Car, 
  Hash, 
  DollarSign, 
  Gauge,
  Palette
} from 'lucide-react';

export default function AddVehiclePage() {
  const [formData, setFormData] = useState({
    vin: '', make: '', model: '', year: '', 
    price: '', mileage: '', color: '', type: 'SUV'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl mx-auto p-4 md:p-8"
    >
      <div className="flex items-center gap-4 mb-8">
        <Link href="/inventory" className="p-2 border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Add New Vehicle</h1>
          <p className="text-neutral-500 text-sm mt-1">Enter the details to list a new vehicle in your inventory.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] border border-neutral-100 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 mb-6">Vehicle Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">VIN / Stock ID</label>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input type="text" name="vin" placeholder="Enter VIN" className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Make</label>
                <div className="relative">
                  <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input type="text" name="make" placeholder="e.g. Porsche" className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Model</label>
                <div className="relative">
                  <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input type="text" name="model" placeholder="e.g. 911 GT3" className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Year</label>
                <input type="number" name="year" placeholder="2024" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Color</label>
                <div className="relative">
                  <Palette className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input type="text" name="color" placeholder="e.g. Guards Red" className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Body Type</label>
                <select name="type" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-neutral-700">
                  <option>Coupe</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Truck</option>
                  <option>Wagon</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Media */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] border border-neutral-100 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 mb-6">Pricing & Status</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Listing Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input type="number" name="price" placeholder="0.00" className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Mileage</label>
                <div className="relative">
                  <Gauge className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input type="text" name="mileage" placeholder="e.g. 12,000" className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-neutral-100 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Vehicle Images</h2>
            <div className="border-2 border-dashed border-neutral-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-neutral-50 hover:border-red-300 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-red-100 transition-colors">
                <Upload className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-sm font-semibold text-neutral-700 mb-1">Click to upload photos</p>
              <p className="text-xs text-neutral-400">JPG, PNG up to 10MB</p>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
            <Save size={18} /> Save Vehicle to Inventory
          </button>
        </div>
      </div>
    </motion.div>
  );
}