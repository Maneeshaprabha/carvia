import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const vehicles = [
  {
    vin: "CAR-2026-001",
    name: "Toyota Corolla",
    year: "2024",
    type: "Sedan",
    price: "$24,500",
    status: "Available",
  },
  {
    vin: "CAR-2026-002",
    name: "Honda Civic",
    year: "2023",
    type: "Sedan",
    price: "$22,800",
    status: "Sold",
  },
  {
    vin: "CAR-2026-003",
    name: "BMW X5",
    year: "2025",
    type: "SUV",
    price: "$68,900",
    status: "Available",
  },
  {
    vin: "CAR-2026-004",
    name: "Mercedes-Benz C-Class",
    year: "2024",
    type: "Luxury",
    price: "$45,000",
    status: "Reserved",
  },
];

export default function VehicleTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <div>
          <h3 className="font-bold text-gray-900">Recent Vehicles</h3>
          <p className="mt-1 text-xs text-gray-400">
            Latest vehicles added to inventory
          </p>
        </div>

        <Link
          href="/inventory"
          className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700"
        >
          View All <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">
          <thead className="bg-gray-50">
            <tr className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <th className="px-5 py-4">Vehicle</th>
              <th className="px-5 py-4">Year</th>
              <th className="px-5 py-4">Type</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.vin} className="hover:bg-gray-50">
                <td className="px-5 py-4">
                  <Link
                    href={`/inventory/${vehicle.vin}`}
                    className="font-semibold text-gray-800 hover:text-red-600"
                  >
                    {vehicle.name}
                  </Link>
                  <p className="mt-1 text-[10px] text-gray-400">
                    {vehicle.vin}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-gray-500">
                  {vehicle.year}
                </td>
                <td className="px-5 py-4 text-sm text-gray-500">
                  {vehicle.type}
                </td>
                <td className="px-5 py-4 text-sm font-bold text-gray-900">
                  {vehicle.price}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                      vehicle.status === "Available"
                        ? "bg-green-50 text-green-600"
                        : vehicle.status === "Sold"
                          ? "bg-gray-100 text-gray-500"
                          : "bg-orange-50 text-orange-600"
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}