'use client'

import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Loader2 } from 'lucide-react' // Importing a loading spinner

export default function AdminSettingsPage() {
  const [admin, setAdmin] = useState({ email: '', name: '', password: '' })
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  // Mocked API Calls for the Canvas environment
  const mockFetchAdmin = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    return {
      ok: true,
      json: async () => ({ email: 'vishwajit@admin.com', name: 'Vishwajit Mavalankar' })
    };
  };

  const mockUpdateAdmin = async (updateData) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    if (updateData.name === 'error') {
      return { ok: false, json: async () => ({ error: 'Simulated update failure.' }) };
    }
    return { ok: true, json: async () => ({ message: 'Admin details updated successfully!' }) };
  };

  // Fetch admin info on mount
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        // const res = await fetch('/api/admin', { method: 'GET' }) // Original line
        const res = await mockFetchAdmin() // Using mock for Canvas
        const data = await res.json()

        if (!res.ok) {
          toast.error(data.error || 'Failed to fetch admin info')
          return
        }

        // Simulating the fetch result
        setAdmin({ email: data.email || '', name: data.name || '', password: '' })
      } catch (err) {
        console.error(err)
        toast.error('Something went wrong while fetching admin info')
      } finally {
        setLoading(false)
      }
    }

    fetchAdmin()
  }, [])

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updateData = { email: admin.email, name: admin.name }
    if (admin.password) updateData.password = admin.password

    setUpdating(true)
    try {
      // const res = await fetch('/api/admin', { // Original lines
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updateData),
      // })
      const res = await mockUpdateAdmin(updateData) // Using mock for Canvas

      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Failed to update admin')
        return
      }

      toast.success(data.message || 'Admin updated successfully')
      setAdmin((prev) => ({ ...prev, password: '' }))
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong while updating admin')
    } finally {
      setUpdating(false)
    }
  }

  // Loading state with spinner
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        <p className="ml-3 text-lg text-gray-700 dark:text-gray-300">Loading admin info...</p>
      </div>
    )

  return (
    // Updated background and min-height for portfolio look
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors">
      <Toaster />
      {/* Updated card styling for modern look and dark mode compatibility */}
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl transition-colors border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white border-b pb-3 border-orange-400">
          Admin <span className="text-orange-500">Settings</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-2">

          {/* Email Input */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={admin.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors"
              required
            />
          </div>

          {/* Name Input */}
          <div>
            <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={admin.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">New Password</label>
            <input
              type="password"
              name="password"
              value={admin.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={updating}
            // Updated button color to match the orange accent
            className="w-full mt-4 px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:bg-orange-400 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
          >
            {updating ? (
              <span className="flex items-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Updating...
              </span>
            ) : (
              'Update Admin'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}