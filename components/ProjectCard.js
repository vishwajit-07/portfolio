// components/ProjectCard.js
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ProjectCard({ project }){
  return (
    <motion.article whileHover={{ scale: 1.03 }} className="bg-white rounded-lg shadow p-4">
      <Image src={project.image} alt={project.title} width={800} height={450} className="rounded" />
      <h3 className="mt-3 font-semibold">{project.title}</h3>
      <p className="text-sm mt-2">{project.description}</p>
      <div className="mt-4 flex gap-3">
        <a href={project.live} className="text-sm underline">Live</a>
        <a href={project.repo} className="text-sm underline">Code</a>
      </div>
    </motion.article>
  )
}


