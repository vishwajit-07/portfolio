'use client'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import React from 'react' // Added standard React import

// NOTE: The lines below are commented out because the Canvas environment does not support Next.js routing.
// When you copy this file into your Next.js project, UNCOMMENT the next two lines to enable actual navigation.
// import { useRouter } from 'next/navigation' 

// NOTE: External component simulations and imports (Toaster, Button, Input, Label, useRouter)
// have been replaced with standard React state and native HTML elements for simplicity.

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(''); // State to display success/error messages

  // const router = useRouter() // UNCOMMENT THIS LINE IN YOUR NEXT.JS PROJECT

  // Simplified navigation (logging the path) to work in the Canvas
  // This simulates router.push() when running in the Canvas.
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // *** ORIGINAL BACKEND LOGIC PRESERVED, with local message handling and token processing ***
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        // ✅ Store JWT & user info in localStorage
        if (data.token && data.admin) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.admin));
          console.log("JWT Token:", data.token);
          console.log("Admin info:", data.admin);
        }

        setMessage("Login successful! Redirecting...");

        // Redirect to admin page or home
        router.push("/admin/settings");
      } else {
        setMessage(`Login failed: ${data.error || "Invalid credentials."}`);
      }
    } catch (err) {
      setLoading(false);
      setMessage("Network error or connection failed.");
    }
  };



  return (
    // Light Theme UI Container (White and Orange Palette)
    <div className="flex items-center justify-center min-h-screen bg-orange-200 font-sans">

      <form
        onSubmit={handleSubmit}
        // White card on light background
        className="bg-orange-50 p-8 rounded-xl w-full max-w-md space-y-6 shadow-2xl border border-gray-200"
      >
        {/* Dark text and Orange Accent for Title */}
        <h1 className="text-2xl font-extrabold text-center text-gray-900">
          Admin <span className="text-orange-500">Login</span>
        </h1>

        <div className="space-y-4">
          <div className="space-y-2">
            {/* Dark label text */}
            <label htmlFor="email" className="text-sm font-medium leading-none text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              // Light input field styling
              className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-shadow duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            {/* Dark label text */}
            <label htmlFor="password" className="text-sm font-medium leading-none text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              // Light input field styling
              className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-shadow duration-200"
              required
            />
          </div>
        </div>

        {/* Message Display (Replaces Toast) */}
        {message && (
          <p className={`text-center font-medium text-sm rounded-lg p-2 ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          // Orange Accent Button Styling
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md h-10 px-4 py-2 shadow-lg transition-transform transform hover:scale-[1.01] active:scale-95 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-xs text-center text-gray-600 pt-2">
          Note: This form attempts to fetch data from <span className="font-mono text-orange-600">/api/auth/login</span>.
        </p>
      </form>
    </div>
  )
}
