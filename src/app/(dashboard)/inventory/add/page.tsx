"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Plus, Trash2 } from 'lucide-react';

export default function AddVehiclePage() {
  const [formData, setFormData] = useState({
    vin: '#VIN-40921',
    make: 'Porsche',
    model: '911 Carrera',
    year: '2024',
    price: '164900',
    mileage: '15 mi',
    color: 'Guards Red',
    engine: '3.0L Twin-Turbo Flat-6',
    drivetrain: 'RWD',
    transmission: '8-Speed PDK',
    status: 'Available',
    location: 'Showroom Floor A',
    keys: '2 Sets',
    notes: '',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Available': return 'bg-[#bbf7d0] text-[#14532d]'; 
      case 'Reserved': return 'bg-[#fde68a] text-[#78350f]'; 
      case 'In Transit': return 'bg-[#a5f3fc] text-[#164e63]'; 
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] bg-white rounded-[2rem] border border-neutral-200 shadow-sm overflow-hidden">
      
      {/* Clean Top Header */}
      <div className="px-8 py-5 border-b border-neutral-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <Link 
            href="/inventory" 
            className="w-9 h-9 border border-neutral-200 rounded-xl flex items-center justify-center text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-extrabold text-neutral-900 tracking-tight">Add Vehicle</h1>
            <p className="text-xs text-neutral-400 font-medium">Enter vehicle details to add to dealership stock</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href="/inventory"
            className="px-4 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </Link>
          <button className="bg-[#e60000] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-red-700 transition-colors shadow-sm">
            Save Vehicle
          </button>
        </div>
      </div>

      {/* Scrollable Form Body */}
      <div className="flex-1 overflow-y-auto p-8 bg-[#f6f7f9] custom-scrollbar">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: Form Fields (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Basic Information */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-sm">
              <h2 className="text-sm font-extrabold text-neutral-900 mb-5 pb-3 border-b border-neutral-100">
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Stock / VIN Number</label>
                  <input 
                    type="text" 
                    name="vin" 
                    value={formData.vin}
                    onChange={handleChange}
                    placeholder="#VIN-00000"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition-all" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Make</label>
                  <input 
                    type="text" 
                    name="make" 
                    value={formData.make}
                    onChange={handleChange}
                    placeholder="e.g. Porsche"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition-all" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Model</label>
                  <input 
                    type="text" 
                    name="model" 
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g. 911 GT3"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition-all" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Year</label>
                  <input 
                    type="number" 
                    name="year" 
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition-all" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Exterior Color</label>
                  <input 
                    type="text" 
                    name="color" 
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="e.g. Guards Red"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition-all" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Status</label>
                  <select 
                    name="status" 
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition-all"
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="In Transit">In Transit</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing & Specifications */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-sm">
              <h2 className="text-sm font-extrabold text-neutral-900 mb-5 pb-3 border-b border-neutral-100">
                Pricing & Specifications
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Price ($)</label>
                  <input 
                    type="number" 
                    name="price" 
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition-all" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Mileage</label>
                  <input 
                    type="text" 
                    name="mileage" 
                    value={formData.mileage}
                    onChange={handleChange}
                    placeholder="e.g. 120 mi"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition-all" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Engine</label>
                  <input 
                    type="text" 
                    name="engine" 
                    value={formData.engine}
                    onChange={handleChange}
                    placeholder="e.g. 4.0L V8"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition-all" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Drivetrain</label>
                  <select 
                    name="drivetrain" 
                    value={formData.drivetrain}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition-all"
                  >
                    <option value="AWD">AWD</option>
                    <option value="RWD">RWD</option>
                    <option value="FWD">FWD</option>
                    <option value="4WD">4WD</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Lot Location</label>
                  <input 
                    type="text" 
                    name="location" 
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Showroom Floor A"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition-all" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Keys Available</label>
                  <input 
                    type="text" 
                    name="keys" 
                    value={formData.keys}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition-all" 
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Internal Notes (Optional)</label>
                <textarea 
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add inspection notes, service history, or package details..."
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Photo Upload & Card Preview (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Vehicle Photos */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-sm">
              <h2 className="text-sm font-extrabold text-neutral-900 mb-4">
                Vehicle Photos
              </h2>

              {/* Main Preview Image */}
              <div className="w-full h-44 rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden mb-3 relative group">
                <img src={formData.imageUrl} alt="Vehicle" className="w-full h-full object-cover" />
              </div>

              {/* Image URL Input or Upload Box */}
              <div className="mb-3">
                <label className="text-[11px] font-bold text-neutral-500 mb-1 block">Image URL</label>
                <input 
                  type="text" 
                  name="imageUrl" 
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Paste image link..."
                  className="w-full px-3 py-2 bg-[#f8f9fa] border border-neutral-200 rounded-xl text-xs font-medium text-neutral-800 focus:bg-white focus:outline-none focus:border-neutral-900" 
                />
              </div>

              <div className="border border-dashed border-neutral-300 rounded-xl p-4 flex items-center justify-center gap-2.5 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-400 transition-all cursor-pointer">
                <Upload size={16} />
                <span className="text-xs font-bold">Upload from device</span>
              </div>
            </div>

            {/* Clean Card Preview (Matches Inventory List Card) */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-extrabold text-neutral-400 uppercase tracking-wider">
                  List Card Preview
                </h2>
              </div>

              <div className="p-4 rounded-2xl border border-neutral-200 bg-white">
                <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100">
                  <span className="text-sm font-extrabold text-neutral-900">{formData.vin || '#VIN-00000'}</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${getStatusBadge(formData.status)}`}>
                    {formData.status}
                  </span>
                </div>

                <div className="pt-3 flex justify-between items-end gap-3">
                  <div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase">
                      {formData.year} • {formData.make}
                    </p>
                    <h3 className="text-sm font-extrabold text-neutral-900">
                      {formData.model || 'Vehicle Model'}
                    </h3>
                    <p className="text-xs font-extrabold text-neutral-900 mt-2">
                      ${Number(formData.price || 0).toLocaleString()}
                    </p>
                  </div>

                  <div className="w-28 h-18 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden flex-shrink-0">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}