import Link from "next/link";
import { Plus, Search, Filter, CarFront } from "lucide-react";

const inventory = [
  { vin: "CAR-2026-001", name: "Toyota Corolla", year: 2024, price: 24500, status: "Available", type: "Sedan" },
  { vin: "CAR-2026-002", name: "Honda Civic", year: 2023, price: 22800, status: "Sold", type: "Sedan" },
  { vin: "CAR-2026-003", name: "BMW X5", year: 2025, price: 68900, status: "Available", type: "SUV" },
  { vin: "CAR-2026-004", name: "Mercedes-Benz C-Class", year: 2024, price: 45000, status: "Reserved", type: "Luxury" },
  { vin: "CAR-2026-005", name: "Toyota RAV4", year: 2025, price: 38900, status: "Available", type: "SUV" },
];

export default function InventoryPage() {
  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Vehicle Inventory</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your dealership vehicles and stock.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700">
          <Plus size={18} /> Add Vehicle
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Total Vehicles", "248"],
          ["Available", "168"],
          ["Reserved / Sold", "80"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-sm text-gray-500">{label}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-gray-900">{value}</h2>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5">
          <div>
            <h3 className="font-bold text-gray-900">All Vehicles</h3>
            <p className="mt-1 text-xs text-gray-400">Manage your current inventory</p>
          </div>

          <div className="flex gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
              <Search size={16} className="text-gray-400" />
              <input
                placeholder="Search vehicles..."
                className="w-32 text-xs outline-none sm:w-48"
              />
            </div>
            <button aria-label="Filter vehicles" className="rounded-xl border border-gray-200 p-2 text-gray-500 hover:bg-gray-50">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-5 py-4">Vehicle</th>
                <th className="px-5 py-4">VIN / ID</th>
                <th className="px-5 py-4">Year</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inventory.map((vehicle) => (
                <tr key={vehicle.vin} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <Link href={`/inventory/${vehicle.vin}`} className="flex items-center gap-3 font-semibold text-gray-800 hover:text-red-600">
                      <span className="rounded-lg bg-red-50 p-2 text-red-600"><CarFront size={19} /></span>
                      {vehicle.name}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-400">{vehicle.vin}</td>
                  <td className="px-5 py-4 text-sm text-gray-500">{vehicle.year}</td>
                  <td className="px-5 py-4 text-sm text-gray-500">{vehicle.type}</td>
                  <td className="px-5 py-4 text-sm font-bold text-gray-900">
                    ${vehicle.price.toLocaleString("en-US")}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                      vehicle.status === "Available"
                        ? "bg-green-50 text-green-600"
                        : vehicle.status === "Sold"
                          ? "bg-gray-100 text-gray-500"
                          : "bg-orange-50 text-orange-600"
                    }`}>
                      {vehicle.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}