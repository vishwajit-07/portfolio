"use client";
import { useState, useEffect } from "react";

export default function ResumePage() {
  const [file, setFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null); // ✅ token in state

  // Get token from localStorage on client-side
  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);

    if (!t) return;

    // Fetch latest resume
    fetch("/api/upload-resume", {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.resumeUrl) setResumeUrl(data.resumeUrl);
      });
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF");
    if (!token) return alert("User not logged in");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-resume", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }, // ✅ send token
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setResumeUrl(data.data.resumeUrl);
      alert("Resume uploaded successfully!");
    } else {
      alert(data.error || "Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-12 py-12 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-orange-600 mb-8">
        Upload & Preview Resume
      </h1>

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-xl shadow-xl border border-orange-300 w-full max-w-md"
      >
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Select Resume (PDF)
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border border-orange-300 rounded-lg p-2 mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>
      </form>

      {/* Preview Section */}
      {resumeUrl && (
        <div className="mt-10 w-full max-w-5xl h-[80vh] border-4 border-orange-400 rounded-lg shadow-2xl overflow-hidden">
          <iframe
            src={resumeUrl}
            title="Resume Preview"
            className="w-full h-full"
          ></iframe>
        </div>
      )}
    </div>
  );
}
