'use client'

import { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Plus, X, Loader2, Trash2, GraduationCap } from "lucide-react"

// --- Mocks for Canvas Environment ---
// In a real Next.js environment, replace these with actual imports and context
const useRouter = () => ({ push: (url) => console.log(`Navigating to ${url}`) })
const useAuth = () => ({
    isLoggedIn: true,
    role: "admin",
    logout: () => console.log("User logged out.")
});

// Mock Initial Education Data
const initialEducation = [
    { id: "1", degree: "M.Tech in AI", collegeName: "IIT Bombay", passoutYear: 2023, cgpa: 9.5 },
    { id: "2", degree: "B.E. in Computer Science", collegeName: "VJTI Mumbai", passoutYear: 2021, cgpa: 8.8 },
];

// Mock API Callbacks
const mockFetchEducation = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return initialEducation;
};

const mockAddEducation = async (education) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newId = (Math.random() * 1000).toFixed(0);
    return { ...education, id: newId };
};

const mockDeleteEducation = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (id === "error") throw new Error("Mock delete failure");
    return { success: true };
};
// --- End Mocks ---

// Custom Tailwind/Lucide Components (copied from AdminProjectsPage)
const Card = ({ children, className = "" }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-200 dark:border-gray-700 ${className}`}>
        {children}
    </div>
);

const CardTitle = ({ children }) => (
    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{children}</h2>
);

const Input = ({ placeholder, value, onChange, type = "text", required = false, name }) => (
    <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors placeholder:text-gray-500 dark:placeholder:text-gray-400"
    />
);

const Button = ({ children, onClick, type = "button", disabled = false, className = "" }) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center ${className}`}
    >
        {children}
    </button>
);

// --- Modal Component for Education ---
const EducationFormModal = ({ isOpen, onClose, onSubmit, newEducation, setNewEducation, isSubmitting }) => {

    if (!isOpen) return null;

    const handleChange = (e) => {
        let value = e.target.value;
        const name = e.target.name;

        // Convert number inputs to actual numbers
        if (name === 'passoutYear') {
            value = parseInt(value, 10) || '';
        } else if (name === 'cgpa') {
            value = parseFloat(value) || '';
        }

        setNewEducation({ ...newEducation, [name]: value });
    };

    return (
        // Backdrop
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[60] flex items-center justify-center p-4" onClick={onClose}>
            {/* Modal Content */}
            <div
                className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 relative transition-transform transform scale-100"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className="flex justify-between items-center border-b pb-3 mb-4 border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Add New <span className="text-orange-500">Education</span></h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-orange-500 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="grid gap-4">
                    <Input
                        name="degree"
                        placeholder="Degree/Qualification (e.g., B.E. Computer Science)"
                        value={newEducation.degree}
                        onChange={handleChange}
                        required={true}
                    />
                    <Input
                        name="collegeName"
                        placeholder="College or University Name"
                        value={newEducation.collegeName}
                        onChange={handleChange}
                        required={true}
                    />

                    {/* Passout Year (Int) */}
                    <Input
                        name="passoutYear"
                        type="number"
                        placeholder="Passout Year (e.g., 2021)"
                        value={newEducation.passoutYear === 0 ? '' : newEducation.passoutYear}
                        onChange={handleChange}
                        required={true}
                    />

                    {/* CGPA (Float?) */}
                    <Input
                        name="cgpa"
                        type="number"
                        placeholder="CGPA/Percentage (Optional, e.g., 9.5 or 85)"
                        value={newEducation.cgpa === 0 ? '' : newEducation.cgpa}
                        onChange={handleChange}
                    />

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
                            <span className="flex items-center"><Plus size={20} className="mr-2" /> Add Education</span>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

// --- Main Component ---
export default function EducationPage() {
    const router = useRouter()
    // Mocking auth status check (assuming success for display)
    const { isLoggedIn, role } = useAuth();

    const [education, setEducation] = useState([])
    const [newEducation, setNewEducation] = useState({
        degree: "", collegeName: "", passoutYear: null, cgpa: null
    })
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false) // For button loading state
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    // Mocked Auth Check (Replace with real logic if outside Canvas)
    useEffect(() => {
        // Simulate auth check success based on mock
        if (!isLoggedIn || role !== "admin") {
            setLoading(false);
        } else {
            setLoading(false)
        }
    }, [router, isLoggedIn, role])

    // ✅ Fetch education only if admin (Mocked)
    useEffect(() => {
        if (!loading && isLoggedIn && role === "admin") {
            mockFetchEducation()
                .then(data => setEducation(data))
                .catch(err => toast.error("Failed to load education records."))
        }
    }, [loading, isLoggedIn, role])

    const addEducation = async (e) => {
        e.preventDefault()

        // Basic validation for required fields
        if (!newEducation.degree || !newEducation.collegeName || !newEducation.passoutYear) {
            toast.error("Please fill in all required fields (Degree, College Name, Passout Year).");
            return;
        }

        setIsSubmitting(true);

        // Prepare payload, ensuring numerical fields are numbers
        const payload = {
            ...newEducation,
            passoutYear: parseInt(newEducation.passoutYear, 10),
            cgpa: newEducation.cgpa ? parseFloat(newEducation.cgpa) : null,
        }

        try {
            const data = await mockAddEducation(payload); // Using mock

            setEducation([...education, data])
            setNewEducation({ degree: "", collegeName: "", passoutYear: null, cgpa: null })
            setIsModalOpen(false);
            toast.success("Education record added successfully!")
        } catch (error) {
            console.error(error);
            toast.error("Failed to add education record")
        } finally {
            setIsSubmitting(false);
        }
    }

    const deleteEducation = async (id) => {
        try {
            await mockDeleteEducation(id); // Using mock

            setEducation(education.filter(e => e.id !== id))
            toast.success("Education record deleted!")
        } catch (error) {
            toast.error("Failed to delete education record")
        }
    }

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            <p className="ml-3 text-lg text-gray-700 dark:text-gray-300">Checking access...</p>
        </div>
    )

    // Conditional rendering based on mock
    if (!isLoggedIn || role !== "admin") return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-center text-red-500">Access denied! Admins only.</p>
        </div>
    );


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <Toaster />
            <div className="max-w-4xl mx-auto space-y-8">
                <header className="flex justify-between items-center border-b pb-4 border-gray-200 dark:border-gray-700">
                    <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
                        Manage <span className="text-orange-500">Education</span>
                    </h1>

                    {/* Orange Accent Button to open Modal */}
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-orange-500 text-white hover:bg-orange-600 shadow-lg"
                    >
                        <Plus size={20} className="mr-2" />
                        Add New Education
                    </Button>
                </header>

                {/* Education List */}
                <div className="space-y-4">
                    {education.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400 mt-12">No education records found. Add one to get started!</p>
                    ) : (
                        education.map(edu => (
                            <Card key={edu.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div className="space-y-1 mb-4 sm:mb-0">
                                    <CardTitle>{edu.degree}</CardTitle>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        **{edu.collegeName}** | Passout: {edu.passoutYear}
                                        {edu.cgpa &&
                                            <span className="ml-3 font-semibold text-orange-500">
                                                CGPA: {edu.cgpa}
                                            </span>
                                        }
                                    </p>
                                </div>

                                <Button
                                    onClick={() => deleteEducation(edu.id)}
                                    className="bg-red-600 text-white hover:bg-red-700"
                                >
                                    <Trash2 size={16} className="mr-2" />
                                    Delete
                                </Button>
                            </Card>
                        ))
                    )}
                </div>
            </div>

            {/* Education Form Modal */}
            <EducationFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={addEducation}
                newEducation={newEducation}
                setNewEducation={setNewEducation}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}
