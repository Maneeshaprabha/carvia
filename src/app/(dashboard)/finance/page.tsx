import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

export default function FinancePage() {
  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Financial Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track revenue, expenses, payments and dealership profitability.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Total Revenue", value: "$284,500", icon: DollarSign },
          { title: "Total Expenses", value: "$216,260", icon: TrendingDown },
          { title: "Net Profit", value: "$68,240", icon: TrendingUp },
          { title: "Pending Payments", value: "$12,800", icon: Wallet },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{item.title}</p>
                <div className="rounded-xl bg-red-50 p-3 text-red-600">
                  <Icon size={21} />
                </div>
              </div>
              <h2 className="mt-4 text-2xl font-extrabold text-gray-900">{item.value}</h2>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h3 className="font-bold text-gray-900">Financial Summary</h3>
        <p className="mt-1 text-xs text-gray-400">Sample dealership financial data</p>

        <div className="mt-6 space-y-6">
          {[
            { name: "Vehicle Sales Revenue", amount: "$245,000", width: "86%", color: "bg-red-500" },
            { name: "Other Income", amount: "$39,500", width: "35%", color: "bg-blue-500" },
            { name: "Operating Expenses", amount: "$216,260", width: "76%", color: "bg-orange-400" },
            { name: "Net Profit", amount: "$68,240", width: "24%", color: "bg-green-500" },
          ].map((item) => (
            <div key={item.name}>
              <div className="mb-2 flex justify-between gap-3 text-sm">
                <span className="text-gray-500">{item.name}</span>
                <strong className="text-gray-900">{item.amount}</strong>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className={`h-full rounded-full ${item.color}`} style={{ width: item.width }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}