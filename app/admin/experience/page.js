'use client'

import { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Plus, X, Loader2, Trash2 } from "lucide-react"

// -------------------- MOCKS --------------------
// Replace with actual API calls
const useRouter = () => ({ push: (url) => console.log(`Navigating to ${url}`) })
const useAuth = () => ({ isLoggedIn: true, role: "admin", logout: () => console.log("User logged out.") })

const initialExperiences = [
  { id: "1", companyName: "Innovatech Solutions", role: "Lead Frontend Architect", startDate: "2021-01-01", endDate: "2023-09-01", description: "Managed frontend team and implemented micro-frontend architecture." },
  { id: "2", companyName: "Creative Digital Agency", role: "Senior Software Engineer", startDate: "2018-03-01", endDate: "2020-12-01", description: "Developed high-traffic e-commerce solutions." },
]

const mockFetchExperiences = async () => {
  await new Promise(r => setTimeout(r, 500))
  return initialExperiences
}

const mockAddExperience = async (exp) => {
  await new Promise(r => setTimeout(r, 500))
  const newId = (Math.random() * 1000).toFixed(0)
  return { ...exp, id: newId }
}

const mockDeleteExperience = async (id) => {
  await new Promise(r => setTimeout(r, 500))
  return { success: true }
}

// -------------------- UI Components --------------------
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-lg p-5 border border-gray-200 ${className}`}>
    {children}
  </div>
)

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold text-gray-800 mb-2">{children}</h2>
)

const Input = ({ placeholder, value, onChange, type = "text", name, required = false }) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 text-gray-800 transition-colors placeholder:text-gray-500"
  />
)

const Button = ({ children, onClick, type = "button", disabled = false, className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center ${className}`}
  >
    {children}
  </button>
)

// -------------------- Modal Component --------------------
const ExperienceFormModal = ({ isOpen, onClose, onSubmit, newExp, setNewExp, isSubmitting }) => {
  if (!isOpen) return null

  const handleChange = (e) => {
    setNewExp({ ...newExp, [e.target.name]: e.target.value })
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-md z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4 border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">Add New <span className="text-orange-500">Experience</span></h3>
          <button onClick={onClose} className="text-gray-500 hover:text-orange-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4">
          <Input name="companyName" placeholder="Company Name" value={newExp.companyName} onChange={handleChange} required />
          <Input name="role" placeholder="Role" value={newExp.role} onChange={handleChange} />
          <Input name="startDate" type="date" placeholder="Start Date" value={newExp.startDate} onChange={handleChange} required />
          <Input name="endDate" type="date" placeholder="End Date" value={newExp.endDate} onChange={handleChange} />
          <Input name="description" placeholder="Description" value={newExp.description} onChange={handleChange} />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 bg-orange-500 text-white hover:bg-orange-600 shadow-md"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Adding...
              </span>
            ) : (
              <span className="flex items-center"><Plus size={20} className="mr-2" /> Add Experience</span>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

// -------------------- Main Component --------------------
export default function ExperiencePage() {
  const router = useRouter()
  const { isLoggedIn, role } = useAuth()

  const [experiences, setExperiences] = useState([])
  const [newExp, setNewExp] = useState({ companyName: "", role: "", startDate: "", endDate: "", description: "" })
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Hydration-safe
  useEffect(() => { setIsClient(true) }, [])

  useEffect(() => {
    if (isClient && isLoggedIn && role === "admin") {
      mockFetchExperiences().then(data => setExperiences(data)).finally(() => setLoading(false))
    }
  }, [isClient, isLoggedIn, role])

  const addExperience = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const data = await mockAddExperience(newExp)
      setExperiences([...experiences, data])
      setNewExp({ companyName: "", role: "", startDate: "", endDate: "", description: "" })
      setIsModalOpen(false)
      toast.success("Experience added successfully!")
    } catch {
      toast.error("Failed to add experience")
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteExperience = async (id) => {
    try {
      await mockDeleteExperience(id)
      setExperiences(experiences.filter(exp => exp.id !== id))
      toast.success("Experience deleted!")
    } catch {
      toast.error("Failed to delete experience")
    }
  }

  if (!isClient) return null // SSR safe

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      <p className="ml-3 text-lg text-gray-700">Loading experiences...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b pb-4 border-gray-200">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Manage <span className="text-orange-500">Experience</span>
          </h1>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 text-white hover:bg-orange-600 shadow-lg"
          >
            <Plus size={20} className="mr-2" />
            Add New Experience
          </Button>
        </header>

        {/* Experience List */}
        <div className="space-y-4">
          {experiences.length === 0 ? (
            <p className="text-center text-gray-500 mt-12">No experiences found. Add one to get started!</p>
          ) : (
            experiences.map(exp => (
              <Card key={exp.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="space-y-1 mb-4 sm:mb-0">
                  <CardTitle>{exp.role || "No Role"} @ {exp.companyName}</CardTitle>
                  <p className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </p>
                  {exp.description && <p className="text-sm text-gray-700 mt-1">{exp.description}</p>}
                </div>
                <Button
                  onClick={() => deleteExperience(exp.id)}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  <Trash2 size={16} className="mr-2" /> Delete
                </Button>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Experience Modal */}
      <ExperienceFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addExperience}
        newExp={newExp}
        setNewExp={setNewExp}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
