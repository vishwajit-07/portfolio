'use client'
import { useState, useEffect } from "react"

export default function SkillsPage() {
  const [skills, setSkills] = useState([])
  const [newSkill, setNewSkill] = useState({ title: "", desc: "", icon: "" })

  useEffect(() => {
    fetch("/api/skills").then(res => res.json()).then(data => setSkills(data))
  }, [])

  const addSkill = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSkill)
    })
    const data = await res.json()
    setSkills([...skills, data])
    setNewSkill({ title: "", desc: "", icon: "" })
  }

  const deleteSkill = async (id) => {
    await fetch(`/api/skills/${id}`, { method: "DELETE" })
    setSkills(skills.filter(s => s.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Skills</h1>

      {/* Add Skill */}
      <form onSubmit={addSkill} className="space-y-2 max-w-md">
        {["title","desc","icon"].map((field) => (
          <input
            key={field}
            placeholder={field}
            value={newSkill[field]}
            onChange={(e) => setNewSkill({ ...newSkill, [field]: e.target.value })}
            className="w-full p-2 border rounded"
          />
        ))}
        <button className="px-4 py-2 bg-green-600 text-white rounded">Add Skill</button>
      </form>

      {/* Skills list */}
      <ul className="mt-6 space-y-2">
        {skills.map(skill => (
          <li key={skill.id} className="flex justify-between bg-white p-3 rounded shadow">
            <span>{skill.title} - {skill.desc}</span>
            <button onClick={() => deleteSkill(skill.id)} className="text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
