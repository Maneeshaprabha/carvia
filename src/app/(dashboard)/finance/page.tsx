"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Wallet,
  ArrowUpRight,
  Download,
  Calendar
} from 'lucide-react';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export default function FinanceDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-[1440px] mx-auto p-4 md:p-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Financial Overview</h1>
          <p className="text-neutral-500 text-sm mt-1">Track revenue, expenses, payments and dealership profitability.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors font-medium text-sm shadow-sm">
            <Calendar size={16} /> This Month
          </button>
          <button className="flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-black transition-colors shadow-lg text-sm">
            <Download size={16} /> Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Gross Revenue", value: 284500, icon: DollarSign, trend: "+12.5%", color: "text-green-600", bg: "bg-green-50" },
          { title: "Total Expenses", value: 216260, icon: TrendingDown, trend: "-2.4%", color: "text-red-600", bg: "bg-red-50" },
          { title: "Net Profit", value: 68240, icon: TrendingUp, trend: "+8.1%", color: "text-emerald-600", bg: "bg-emerald-50" },
          { title: "Pending Receivables", value: 12800, icon: Wallet, trend: "3 deals", color: "text-orange-600", bg: "bg-orange-50" },
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-[2rem] p-6 border border-neutral-100 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-semibold text-neutral-500">{item.title}</span>
              <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                <item.icon size={20} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-neutral-900 mb-2">{formatCurrency(item.value)}</h3>
            <p className="text-xs font-medium text-neutral-500 flex items-center">
              <ArrowUpRight size={14} className="mr-1 text-neutral-400" /> 
              <span className={item.color}>{item.trend}</span> <span className="ml-1">vs last month</span>
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-[2rem] border border-neutral-100 p-8 shadow-sm">
          <h3 className="text-lg font-bold text-neutral-900 mb-6">Revenue Breakdown</h3>
          <div className="space-y-6">
            {[
              { name: "New Vehicle Sales", amount: 185000, percentage: 65, color: "bg-red-600" },
              { name: "Used Vehicle Sales", amount: 60000, percentage: 21, color: "bg-neutral-800" },
              { name: "Service & Maintenance", amount: 25000, percentage: 9, color: "bg-neutral-400" },
              { name: "Financing & Fees", amount: 14500, percentage: 5, color: "bg-neutral-200" },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-neutral-700">{item.name}</span>
                  <span className="font-bold text-neutral-900">{formatCurrency(item.amount)}</span>
                </div>
                <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-neutral-100 p-8 shadow-sm">
          <h3 className="text-lg font-bold text-neutral-900 mb-6">Recent Transactions</h3>
          <div className="space-y-4">
            {[
              { id: "TRX-0992", desc: "Vehicle Purchase - Trade-in", date: "Today, 10:45 AM", amount: -12500 },
              { id: "TRX-0993", desc: "Deal Down Payment", date: "Yesterday", amount: 8000 },
              { id: "TRX-0994", desc: "Service Center Invoice", date: "Oct 28, 2026", amount: 1240 },
              { id: "TRX-0995", desc: "Dealership Rent & Utilities", date: "Oct 25, 2026", amount: -8500 },
            ].map((trx, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-neutral-100 hover:bg-neutral-50 transition-colors">
                <div>
                  <p className="font-bold text-sm text-neutral-900">{trx.desc}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{trx.id} • {trx.date}</p>
                </div>
                <span className={`font-bold ${trx.amount > 0 ? 'text-green-600' : 'text-neutral-900'}`}>
                  {trx.amount > 0 ? '+' : ''}{formatCurrency(trx.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}