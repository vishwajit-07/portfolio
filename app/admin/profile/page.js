"use client"

import { useRouter } from "next/navigation"
import { toast, Toaster } from "react-hot-toast"
import { Button } from "@/components/ui/button"

export default function AdminProfile({ user }) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" })
      if (res.ok) {
        toast.success("Logged out successfully!")
        router.push("/login")
      } else {
        toast.error("Logout failed")
      }
    } catch (err) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <Toaster position="top-center" />
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold">👤 Admin Profile</h1>
        <p><span className="font-semibold">Email:</span> {user?.email}</p>
        <p><span className="font-semibold">Role:</span> {user?.role}</p>

        <Button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          Logout
        </Button>
      </div>
    </div>
  )
}
