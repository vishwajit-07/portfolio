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
  },
  {
    id: 2,
    title: 'Community Connect (Next.js 15)',
    subtitle:
      'A community-driven platform to report public issues (potholes, broken streetlights, garbage) where others can upvote, comment, and track progress.',
    tech: ['Next.js 15', 'React', 'JavaScript'],
    apps: [],
    database: 'MongoDB',
    liveUrl: 'https://community-connect-9a529utkm.vercel.app/',
  },
  {
    id: 3,
    title: 'Job Portal',
    subtitle: 'Reduce complexity and manage all hiring operations digitally.',
    tech: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'MongoDB'],
    apps: ['VS Code'],
    database: 'MongoDB',
    liveUrl: null,
  },
  {
    id: 4,
    title: 'News Express (React.js)',
    subtitle:
      'Delivers latest top headlines and breaking news across categories: entertainment, science, tech, health, sports & business.',
    tech: ['React', 'JavaScript', 'HTML'],
    apps: ['VS Code', 'Node'],
    database: null,
    liveUrl: null,
  },
  {
    id: 5,
    title: 'Text Utilis (React.js)',
    subtitle:
      'A small utility app with an easy UI for quick text formatting to speed up content editing tasks.',
    tech: ['React', 'JavaScript', 'HTML'],
    apps: ['VS Code', 'Node'],
    database: null,
    liveUrl: null,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-8 mt-8 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-center mt-8 mb-10 text-gray-800 dark:text-white">
          My <span className="text-orange-500">Projects</span>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.id}
              className="bg-blue-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col h-full shadow-sm"
            >
              <header className="mb-3">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{p.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{p.subtitle}</p>
              </header>

              <div className="mt-3 flex-1">
                <dl className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  {p.tech && (
                    <div>
                      <dt className="font-medium text-gray-900 dark:text-white">Tech</dt>
                      <dd className="mt-1 flex flex-wrap gap-2">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 rounded-full bg-white/80 dark:bg-gray-800 border text-gray-800 dark:text-gray-200"
                          >
                            {t}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}

                  {p.apps && p.apps.length > 0 && (
                    <div>
                      <dt className="font-medium text-gray-900 dark:text-white">Apps / Tools</dt>
                      <dd className="mt-1 text-gray-600 dark:text-gray-300">{p.apps.join(', ')}</dd>
                    </div>
                  )}

                  {p.database && (
                    <div>
                      <dt className="font-medium text-gray-900 dark:text-white">Database</dt>
                      <dd className="mt-1 text-gray-600 dark:text-gray-300">{p.database}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <footer className="mt-4 flex items-center justify-between">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {p.liveUrl ? <span className="inline-block">Live demo available</span> : <span>Local / internal project</span>}
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

                  {/* If you later add repo links, you can add a Repo button here */}
                  <button
                    onClick={() => {
                      // optional: open a modal with more details (hook + modal) — placeholder for now
                      // For client-side modal, add state & modal component in this file or lift up.
                      alert(`${p.title}\n\n${p.subtitle}`)
                    }}
                    className="text-sm px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Details
                  </button>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
