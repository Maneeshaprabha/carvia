"use client";

import { useState } from "react";
import Link from "next/link";
import { CarFront, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Login UI is ready. Connect your authentication backend to sign in.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa] p-5">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        <div className="hidden flex-col justify-between bg-red-600 p-12 text-white md:flex">
          <div className="flex items-center gap-3">
            <CarFront size={34} />
            <h1 className="text-3xl font-extrabold">Carvia.</h1>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[3px] text-red-200">
              Dealership Management
            </p>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight">
              Manage your dealership. Drive your success.
            </h2>
            <p className="mt-5 text-sm leading-7 text-red-100">
              One powerful platform to manage inventory, customers, vehicle
              sales and financial performance.
            </p>
          </div>

          <p className="text-xs text-red-200">
            © 2026 Carvia. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-12">
          <div className="mb-8 md:hidden">
            <div className="flex items-center gap-2 text-red-600">
              <CarFront size={30} />
              <h1 className="text-2xl font-extrabold">Carvia.</h1>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to access your dealership dashboard.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 focus-within:border-red-500">
                <Mail size={18} className="text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 focus-within:border-red-500">
                <LockKeyhole size={18} className="text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full text-sm outline-none"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/login" className="text-xs font-semibold text-red-600">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-red-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-100 transition hover:bg-red-700"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400">
            Secure dealership management powered by Carvia.
          </p>
        </div>
      </div>
    </main>
  );
}