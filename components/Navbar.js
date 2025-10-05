"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  CircleUser,
  LogOut,
  Menu as MenuIcon,
  Home,
  BookOpen,
  Briefcase,
  FileText,
  Layers,
  Mail,
} from "lucide-react";
import { useAuth } from "@/context/UserContext";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, role, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll section
  useEffect(() => {
    const sections = ["home", "education", "experience", "resume", "projects", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollPos >= section.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const publicLinks = [
    { name: "Home", url: "/#home", icon: <Home size={22} /> },
    { name: "Education", url: "/#education", icon: <BookOpen size={22} /> },
    { name: "Experience", url: "/#experience", icon: <Briefcase size={22} /> },
    { name: "Resume", url: "/#resume", icon: <FileText size={22} /> },
    { name: "Projects", url: "/#projects", icon: <Layers size={22} /> },
    { name: "Contact", url: "/#contact", icon: <Mail size={22} /> },
  ];

  const adminLinks = [
    { name: "Settings", url: "/admin/settings", icon: <FileText size={22} /> },
    { name: "Projects", url: "/admin/projects", icon: <Layers size={22} /> },
    { name: "Resume", url: "/admin/resume", icon: <FileText size={22} /> },
    { name: "Education", url: "/admin/education", icon: <BookOpen size={22} /> },
    { name: "Experience", url: "/admin/experience", icon: <Briefcase size={22} /> },
    { name: "Contact", url: "/admin/contact", icon: <Mail size={22} /> },
  ];

  const currentLinks = isLoggedIn && role === "admin" ? adminLinks : publicLinks;

  const handleAuthClick = () => {
    setIsMenuOpen(false);
    if (isLoggedIn) {
      logout();
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  const handleLinkClick = (url) => {
    setIsMenuOpen(false);
    if (url.includes("#")) {
      const [path, hash] = url.split("#");
      if (pathname === path) {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(url);
      }
    } else {
      router.push(url);
    }
  };

  // --- REVISED renderLink function ---
  const renderLink = (link, isMobile = false) => {
    const sectionId = link.url.split("#")[1];
    const isActive = sectionId === activeSection;

    // Mobile view logic (uses icon-only) - unchanged
    if (isMobile) {
      return (
        <li key={link.name}>
          <button
            onClick={() => handleLinkClick(link.url)}
            className={`relative flex flex-col items-center justify-center text-sm font-medium transition-all duration-200 
              ${isActive ? "text-orange-500" : "text-gray-700 hover:text-orange-400"}`}
          >
            <span
              className={`flex items-center justify-center rounded-full transition-all duration-200 
                ${isActive ? "bg-orange-400 text-white" : "bg-transparent"} 
                p-2 sm:p-3`}
            >
              {link.icon}
            </span>
          </button>
        </li>
      );
    }

    // Desktop view logic - NEW STYLING
    return (
      <li key={link.name}>
        <button
          onClick={() => handleLinkClick(link.url)}
          className={`relative flex items-center gap-2 px-3 py-1 text-sm font-semibold transition-colors duration-200 
            ${isActive ? "text-white bg-orange-400 rounded-full py-2 shadow-md" : "text-gray-700 hover:text-orange-500 py-2 hover:bg-orange-50/50 rounded-full"}`}
        >
          <span className="flex items-center justify-center">{link.icon}</span>
          <span>{link.name}</span>
        </button>
      </li>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50  bg-orange-100 backdrop-blur-lg border-b border-orange-100">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-4 py-2 sm:py-3">

        {/* --- REVISED Desktop Navbar Structure --- */}
        <div className="rounded-3xl bg-orange-50 border-2 border-orange-400 py-2 px-2 hidden md:flex items-center justify-between w-full">
          {/* Logo/Name Placeholder */}
          <div className="text-xl font-bold text-gray-800 tracking-wider">
            PORTFOLIO
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center gap-1">
            {currentLinks.map((link) => renderLink(link))}
          </ul>

          {/* Auth Button */}
          <button
            onClick={handleAuthClick}
            title={isLoggedIn ? "Logout" : "Login"}
            className="w-10 h-10 bg-orange-400 text-white rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition-colors"
          >
            {isLoggedIn ? <LogOut size={20} /> : <CircleUser size={20} />}
          </button>
        </div>

        {/* Mobile Navbar - UNCHANGED */}
        <div className="flex md:hidden w-full rounded-3xl bg-orange-50 shadow-md">
          <ul className="flex justify-around items-center w-full py-2 px-2 sm:px-4">
            {currentLinks.map((link) => renderLink(link, true))}
            <li>
              <button
                onClick={handleAuthClick}
                title={isLoggedIn ? "Logout" : "Login"}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-md hover:bg-orange-500 transition-colors"
              >
                {isLoggedIn ? <LogOut size={18} /> : <CircleUser size={18} />}
              </button>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}