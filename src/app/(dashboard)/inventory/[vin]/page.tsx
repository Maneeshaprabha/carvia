import Link from "next/link";
import { ArrowLeft, CarFront, Calendar, Hash, DollarSign } from "lucide-react";

export default async function VehicleDetailsPage({
  params,
}: {
  params: Promise<{ vin: string }>;
}) {
  const { vin } = await params;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link href="/inventory" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-red-600">
        <ArrowLeft size={17} /> Back to Inventory
      </Link>

      <div className="rounded-2xl border border-gray-100 bg-white p-7">
        <div className="flex flex-wrap items-center gap-4">
          <div className="rounded-2xl bg-red-50 p-4 text-red-600">
            <CarFront size={35} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Vehicle Details</h1>
            <p className="mt-1 text-sm text-gray-400">{vin}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {[
            { label: "Vehicle ID", value: vin, icon: Hash },
            { label: "Model", value: "Vehicle information pending", icon: CarFront },
            { label: "Year", value: "Not specified", icon: Calendar },
            { label: "Price", value: "Not specified", icon: DollarSign },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-xl bg-gray-50 p-5">
                <div className="flex items-center gap-2 text-gray-400">
                  <Icon size={17} />
                  <span className="text-xs">{item.label}</span>
                </div>
                <p className="mt-3 font-bold text-gray-900">{item.value}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-7 rounded-xl border border-orange-100 bg-orange-50 p-4 text-sm text-orange-700">
          This is a placeholder vehicle details page. Connect it to your vehicle database to display actual records.
        </p>
      </div>
    </div>
  );
}