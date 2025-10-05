'use client'

import { Mail, Phone, Linkedin } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

export default function Contact() {
  return (
    <section id="contact" className="py-8 mt-10 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 mt-16 max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-800">
          Get in <span className="text-orange-500">Touch</span>
        </h2>

        <p className="text-center text-lg text-gray-800 pb-4">
          Click any of the options below to reach out directly:
        </p>

        <div className="flex flex-col gap-6 w-full ">
          {/* Email */}
          <a
            href="mailto:vishwajitmavalankar54339@gmail.com"
            className="flex items-center gap-4 w-full border border-orange-600 bg-white rounded-lg shadow-lg px-6 py-4 hover:bg-orange-50 transition-colors"
          >
            <Mail size={30} className="text-red-500" />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">Email Me</span>
              <span className="text-gray-500 text-sm">Click here to send an email</span>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+917741839179"
            className="flex items-center gap-4 w-full border border-orange-600 bg-white rounded-lg shadow-lg px-6 py-4 hover:bg-orange-50 transition-colors"
          >
            <Phone size={30} className="text-blue-500" />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">Call Me : <span className='text-orange-500 font-semibold'>+91 7741839179</span></span>
              <span className="text-gray-500  text-sm">Click to call directly</span>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/917741839179"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full border border-orange-600 bg-white rounded-lg shadow-lg px-6 py-4 hover:bg-orange-50 transition-colors"
          >
            <FaWhatsapp size={30} className="text-green-500" />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">WhatsApp</span>
              <span className="text-green-500 text-sm">Click Here to direct chat with me on WhatsApp</span>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/vishwajit-mavalankar-406206240/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full border border-orange-600 bg-white rounded-lg shadow-lg px-6 py-4 hover:bg-orange-50 transition-colors"
          >
            <Linkedin size={30} className="text-blue-600" />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">LinkedIn</span>
              <span className="text-blue-600 text-sm">Click here view my professional profile</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
