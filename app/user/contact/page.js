'use client'

import { Mail, Phone, Linkedin } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa' // Using react-icons for WhatsApp

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-8 mt-8 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mt-8 mb-10 text-gray-800 dark:text-white">
          Get in <span className="text-orange-500">Touch</span>
        </h2>

        <div className="bg-blue-50 dark:bg-gray-900/60 rounded-xl shadow-sm p-8 space-y-6">
          <p className="text-gray-700 dark:text-gray-300 text-center text-lg">
            Feel free to reach out to me for collaborations, opportunities, or just a friendly chat.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:items-center flex-wrap">
            {/* Email */}
            <a
              href="mailto:vishwajitmavalankar54339@gmail.com"
              className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors"
            >
              <Mail size={20} />
              <span className="break-all">vishwajitmavalankar54339@gmail.com</span>
            </a>

            {/* Phone */}
            <a
              href="tel:+917741839179"
              className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors"
            >
              <Phone size={20} />
              <span>+91 7741839179</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/917741839179"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors"
            >
              <FaWhatsapp size={20} className="text-green-500" />
              <span>WhatsApp</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/vishwajit-mavalankar-406206240/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
