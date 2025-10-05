'use client'

import React from 'react'

const projects = [
  {
    id: 1,
    title: 'Hiring Management System (EmployeeHUB)',
    subtitle: 'Design a user-friendly web application for managing and recording HR operations digitally.',
    tech: ['PHP', 'Laravel 11', 'JavaScript', 'HTML', 'CSS'],
    apps: ['VS Code', 'XAMPP'],
    database: 'MySQL',
    liveUrl: null,
    repoUrl: 'https://github.com/vishwajit-07/Employee_HUB_PHP_Laravel', // Add your repo link
  },
  {
    id: 2,
    title: 'Community Connect (Next.js 15)',
    subtitle:
      'A community-driven platform to report public issues (potholes, broken streetlights, garbage) where others can upvote, comment, and track progress.',
    tech: ['Next.js 15', 'React', 'JavaScript'],
    apps: ['VS Code, CLoudinary, Gmail SMTP (for password reset)'],
    database: 'MongoDB',
    liveUrl: 'https://community-connect-9a529utkm.vercel.app/',
    repoUrl: 'https://github.com/vishwajit-07/community-connect',
  },
  {
    id: 3,
    title: 'Job Portal',
    subtitle: 'Reduce complexity and manage all hiring operations digitally.',
    tech: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'MongoDB'],
    apps: ['VS Code', 'Cloudinary', 'Gmail SMTP (for password reset)'],
    database: 'MongoDB',
    liveUrl: null,
    repoUrl: 'https://github.com/vishwajit-07/Job_Portal',
  },
  {
    id: 4,
    title: 'News Express (React.js)',
    subtitle:
      'Delivers latest top headlines and breaking news across categories: entertainment, science, tech, health, sports & business.',
    tech: ['React', 'JavaScript', 'HTML'],
    apps: ['VS Code', 'Node', 'ExpressJS'],
    database: null,
    liveUrl: null,
    repoUrl: 'https://github.com/vishwajit-07/News_App',
  },
  {
    id: 5,
    title: 'Text Utilis (React.js)',
    subtitle:
      'A small utility app with an easy UI for quick text formatting to speed up content editing tasks.',
    tech: ['React', 'JavaScript', 'HTML'],
    apps: ['VS Code', 'NodeJS', 'ExpressJS'],
    database: null,
    liveUrl: null,
    repoUrl: 'https://github.com/vishwajit-07/Text_Utils',
  },
  {
    id: 6,
    title: 'Notebook App (React.js)',
    subtitle: 'A personal notebook app where users can register/login, create, edit, and delete notes. Secure and user-friendly interface.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT Authentication'],
    apps: ['VS Code', 'Postman', 'Node.js'],
    database: 'MongoDB',
    liveUrl: null, // Add if deployed somewhere
    repoUrl: 'https://github.com/vishwajit-07/I_Notebook', // Replace with your repo link
  },

]

export default function Projects() {
  return (
    <section id="projects" className="py-8 mt-10  transition-colors duration-300">
      <div className="container mx-auto px-4 mt-16 max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800 ">
          My <span className="text-orange-500">Projects</span>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.id}
              className="bg-orange-50 border-gray-200 rounded-xl p-5 flex flex-col h-full shadow-sm"
            >
              <header className="mb-3">
                <h3 className="text-xl font-semibold text-gray-800">{p.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{p.subtitle}</p>
              </header>

              <div className="mt-3 flex-1">
                <dl className="text-sm text-gray-700 space-y-2">
                  {p.tech && (
                    <div>
                      <dt className="font-medium text-gray-900">Tech</dt>
                      <dd className="mt-1 flex flex-wrap gap-2">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 rounded-full bg-white/80 border border-orange-500 text-gray-800"
                          >
                            {t}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}

                  {p.apps && p.apps.length > 0 && (
                    <div>
                      <dt className="font-medium text-gray-900 ">Apps / Tools</dt>
                      <dd className="mt-1 text-gray-600 ">{p.apps.join(', ')}</dd>
                    </div>
                  )}

                  {p.database && (
                    <div>
                      <dt className="font-medium text-gray-900 ">Database</dt>
                      <dd className="mt-1 text-gray-600 ">{p.database}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <footer className="mt-4 flex items-center justify-between">
                <div className="text-xs text-gray-600 ">
                  {p.liveUrl ? <span>Live demo available</span> : <span>Local / internal project</span>}
                </div>

                <div className="flex gap-2">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm px-3 py-1 rounded-md bg-orange-500 text-white hover:bg-orange-600"
                    >
                      Live
                    </a>
                  )}

                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm px-3 py-1 rounded-md border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                    >
                      Repo
                    </a>
                  )}
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
