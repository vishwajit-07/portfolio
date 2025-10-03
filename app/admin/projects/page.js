'use client'

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Plus, X, Loader2, Trash2, Edit2 } from "lucide-react";

// --- Modal Component ---
const ProjectFormModal = ({ isOpen, onClose, onSubmit, project, setProject, isSubmitting }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-md z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4 border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold">{project.id ? "Edit Project" : "Add New Project"}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-orange-500">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="grid gap-3">
          <input
            name="title"
            placeholder="Project Title"
            value={project.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="description"
            placeholder="Description (Optional)"
            value={project.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="codeLink"
            placeholder="GitHub Link"
            value={project.codeLink}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="liveLink"
            placeholder="Live Demo Link"
            value={project.liveLink}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="imageUrl"
            placeholder="Image URL"
            value={project.imageUrl}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="languages"
            placeholder="Languages (comma separated)"
            value={project.languages}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="software"
            placeholder="Software/Tools (comma separated)"
            value={project.software}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 flex justify-center items-center"
          >
            {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : project.id ? "Update" : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [project, setProject] = useState({
    id: "", title: "", description: "", codeLink: "", liveLink: "", imageUrl: "", languages: "", software: ""
  });

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.map(p => ({
        ...p,
        languages: Array.isArray(p.languages) ? p.languages.join(", ") : "",
        software: Array.isArray(p.software) ? p.software.join(", ") : ""
      })));
    } catch (error) {
      toast.error("Failed to fetch projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Add / Update project
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...project,
      languages: project.languages.split(",").map(s => s.trim()),
      software: project.software ? project.software.split(",").map(s => s.trim()) : []
    };

    try {
      const res = await fetch(`/api/projects${project.id ? `?id=${project.id}` : ""}`, {
        method: project.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      toast.success(project.id ? "Updated!" : "Added!");
      setIsModalOpen(false);
      setProject({ id: "", title: "", description: "", codeLink: "", liveLink: "", imageUrl: "", languages: "", software: "" });
      fetchProjects();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete project
  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      toast.success("Deleted!");
      fetchProjects();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Edit project
  const handleEdit = (p) => {
    setProject({
      id: p.id || "",
      title: p.title || "",
      description: p.description || "",
      codeLink: p.codeLink || "",
      liveLink: p.liveLink || "",
      imageUrl: p.imageUrl || "",
      languages: Array.isArray(p.languages) ? p.languages.join(", ") : "",
      software: Array.isArray(p.software) ? p.software.join(", ") : ""
    });
    setIsModalOpen(true);
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><Loader2 className="animate-spin w-8 h-8 text-orange-500" /></div>;

  return (
    <div className="min-h-screen p-4 mt-16bg-gray-50 dark:bg-gray-900">
      <Toaster />
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Projects</h1>
          <button
            onClick={() => { setProject({ id: "", title: "", description: "", codeLink: "", liveLink: "", imageUrl: "", languages: "", software: "" }); setIsModalOpen(true); }}
            className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 flex items-center"
          >
            <Plus className="mr-1" /> Add
          </button>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-gray-500">    No projects in the database. Add a new project to get started!
          </p>
        ) : (
          <div className="space-y-2">
            {projects.map(p => (
              <div key={p.id} className="bg-white dark:bg-gray-800 p-3 rounded shadow flex justify-between items-center">
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Tech: {p.languages}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(p)} className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center"><Edit2 size={14} className="mr-1" /> Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 flex items-center"><Trash2 size={14} className="mr-1" /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        project={project}
        setProject={setProject}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
