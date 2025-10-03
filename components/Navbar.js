// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation"; // ✅ usePathname
// import { CircleUser, LogOut, Menu as MenuIcon, X } from "lucide-react";
// import { useAuth } from "@/context/UserContext";

// export default function Navbar() {
//   const router = useRouter();
//   const pathname = usePathname(); // ✅ current route path
//   const { isLoggedIn, role, logout } = useAuth();

//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ FIX added back
//   useEffect(() => {
//     console.log("User role:", role);
//   }, [role, isLoggedIn]);
//   const publicLinks = [
//     { name: "Home", url: "/" },
//     { name: "Education", url: "/user/Education" },
//     { name: "Experience", url: "/user/Experience" },
//     { name: "Resume", url: "/user/resume" },
//     { name: "Projects", url: "/user/projects" },
//     { name: "Contact", url: "/user/contact" },
//   ];

//   const adminLinks = [
//     { name: "Settings", url: "/admin/settings" },
//     { name: "Projects", url: "/admin/projects" },
//     { name: "Resume", url: "/admin/resume" },
//     { name: "Education", url: "/admin/education" },
//     { name: "Experience", url: "/admin/experience" },
//     { name: "Contact", url: "/admin/contact" },
//   ];

//   const currentLinks = isLoggedIn && role === "admin" ? adminLinks : publicLinks;
//   const handleAuthClick = () => {
//     setIsMenuOpen(false);
//     setIsDrawerOpen(false);
//     if (isLoggedIn) {
//       logout();
//       router.push("/");
//     } else {
//       router.push("/login");
//     }
//   };

//   const renderLink = (link) => {
//     const isActive = pathname === link.url; // ✅ check with current path
//     return (
//       <li key={link.name}>
//         <Link
//           href={link.url}
//           className={`relative px-6 py-2 rounded-full transition-colors duration-200 ${isActive
//             ? "text-white font-semibold bg-orange-400 shadow-md"
//             : "hover:text-orange-400"
//             }`}
//           onClick={() => setIsDrawerOpen(false)} // close drawer when clicking link
//         >
//           {link.name}
//         </Link>
//       </li>
//     );
//   };

//   return (
//     <nav className="w-full flex justify-center fixed top-0 z-50">
//       <div className="flex justify-between items-center w-full max-w-6xl px-4 py-6">

//         {/* ✅ Logo */}
//         <div className="flex items-center gap-2">
//           <Image
//             src="/images/icon.png"
//             alt="Logo"
//             width={40}
//             height={40}
//             className="rounded-full cursor-pointer"
//             onClick={() => router.push("/")}
//           />
//         </div>

//         {/* ✅ Centered Navbar */}
//         <div className="bg-black rounded-full px-2.5 py-1 flex justify-center items-center shadow-lg flex-shrink-0 mx-auto">
//           <ul className="flex gap-5 text-white font-medium items-center">
//             {currentLinks.slice(0, 3).map(renderLink)}

//             {/* Dropdown Menu with Auth Icon */}
//             <li className="flex items-center relative px-2">
//               {isMenuOpen && (
//                 <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center space-y-3 pt-3">
//                   <button
//                     onClick={handleAuthClick}
//                     title={isLoggedIn ? "Logout" : "Login"}
//                     className="w-10 h-10 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-500 transition-colors"
//                   >
//                     {isLoggedIn ? <LogOut size={20} /> : <CircleUser size={20} />}
//                   </button>
//                 </div>
//               )}

//               <button
//                 onClick={() => setIsMenuOpen((prev) => !prev)}
//                 title="Toggle Menu"
//                 className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-orange-600 transition-colors focus:outline-none"
//               >
//                 <MenuIcon size={20} />
//               </button>
//             </li>

//             {currentLinks.slice(3).map(renderLink)}
//           </ul>
//         </div>

//         {/* ✅ Mobile Drawer Toggle */}
//         <button
//           onClick={() => setIsDrawerOpen(true)}
//           className="md:hidden w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-orange-600 transition-colors focus:outline-none"
//         >
//           <MenuIcon size={20} />
//         </button>
//       </div>

//       {/* ✅ Side Drawer */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-black text-white p-6 transform transition-transform duration-300 ease-in-out z-50 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//       >
//         <button
//           onClick={() => setIsDrawerOpen(false)}
//           className="absolute top-4 right-4 text-gray-400 hover:text-white"
//         >
//           <X size={24} />
//         </button>

//         <ul className="flex flex-col gap-5 mt-12">
//           {currentLinks.map(renderLink)}
//           <li>
//             <button
//               onClick={handleAuthClick}
//               className="flex items-center gap-3 bg-gray-700 px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors"
//             >
//               {isLoggedIn ? <LogOut size={20} /> : <CircleUser size={20} />}
//               {isLoggedIn ? "Logout" : "Login"}
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Backdrop */}
//       {isDrawerOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={() => setIsDrawerOpen(false)}
//         />
//       )}
//     </nav>
//   );
// }
// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { CircleUser, LogOut, Menu as MenuIcon, X } from "lucide-react";
// import { useAuth } from "@/context/UserContext";

// export default function Navbar() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { isLoggedIn, role, logout } = useAuth();

//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("home"); // Track visible section

//   useEffect(() => {
//     const sections = ["home", "education", "experience", "resume", "projects", "contact"];

//     const handleScroll = () => {
//       const scrollPos = window.scrollY + 100; // adjust offset if navbar height
//       for (let i = sections.length - 1; i >= 0; i--) {
//         const section = document.getElementById(sections[i]);
//         if (section && scrollPos >= section.offsetTop) {
//           setActiveSection(sections[i]);
//           break;
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // set active on load

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const publicLinks = [
//     { name: "Home", url: "/#home" },
//     { name: "Education", url: "/#education" },
//     { name: "Experience", url: "/#experience" },
//     { name: "Resume", url: "/#resume" },
//     { name: "Projects", url: "/#projects" },
//     { name: "Contact", url: "/#contact" },
//   ];

//   const adminLinks = [
//     { name: "Settings", url: "/admin/settings" },
//     { name: "Projects", url: "/admin/projects" },
//     { name: "Resume", url: "/admin/resume" },
//     { name: "Education", url: "/admin/education" },
//     { name: "Experience", url: "/admin/experience" },
//     { name: "Contact", url: "/admin/contact" },
//   ];

//   const currentLinks = isLoggedIn && role === "admin" ? adminLinks : publicLinks;

//   const handleAuthClick = () => {
//     setIsMenuOpen(false);
//     setIsDrawerOpen(false);
//     if (isLoggedIn) {
//       logout();
//       router.push("/");
//     } else {
//       router.push("/login");
//     }
//   };

//   const handleLinkClick = (url) => {
//     setIsDrawerOpen(false);
//     setIsMenuOpen(false);

//     if (url.includes("#")) {
//       const [path, hash] = url.split("#");
//       if (pathname === path) {
//         const el = document.getElementById(hash);
//         if (el) el.scrollIntoView({ behavior: "smooth" });
//       } else {
//         router.push(url);
//       }
//     } else {
//       router.push(url);
//     }
//   };

//   const renderLink = (link) => {
//     const sectionId = link.url.split("#")[1];
//     const isActive = sectionId === activeSection;

//     return (
//       <li key={link.name}>
//         <button
//           onClick={() => handleLinkClick(link.url)}
//           className={`relative px-6 py-2 rounded-full transition-colors duration-200 ${isActive
//               ? "text-white font-semibold bg-orange-400 shadow-md"
//               : "hover:text-orange-400"
//             }`}
//         >
//           {link.name}
//         </button>
//       </li>
//     );
//   };

//   return (
//     <nav className="w-full flex justify-center fixed top-0 z-50">
//       <div className="flex justify-between items-center w-full max-w-6xl px-4 py-6">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <Image
//             src="/images/icon.png"
//             alt="Logo"
//             width={40}
//             height={40}
//             className="rounded-full cursor-pointer"
//             onClick={() => router.push("/")}
//           />
//         </div>

//         {/* Centered Navbar */}
//         <div className="bg-white border border-orange-600 rounded-full px-2.5 py-1 flex justify-center items-center shadow-lg flex-shrink-0 mx-auto">
//           <ul className="flex gap-5 font-medium items-center">
//             {currentLinks.slice(0, 3).map(renderLink)}
//             <li className="flex items-center relative px-2">
//               {isMenuOpen && (
//                 <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center space-y-3 pt-3">
//                   <button
//                     onClick={handleAuthClick}
//                     title={isLoggedIn ? "Logout" : "Login"}
//                     className="w-10 h-10 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-500 transition-colors"
//                   >
//                     {isLoggedIn ? <LogOut size={20} /> : <CircleUser size={20} />}
//                   </button>
//                 </div>
//               )}
//               <button
//                 onClick={() => setIsMenuOpen((prev) => !prev)}
//                 title="Toggle Menu"
//                 className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-orange-600 transition-colors focus:outline-none"
//               >
//                 <MenuIcon size={20} />
//               </button>
//             </li>
//             {currentLinks.slice(3).map(renderLink)}
//           </ul>
//         </div>

//         {/* Mobile Drawer Toggle */}
//         <button
//           onClick={() => setIsDrawerOpen(true)}
//           className="md:hidden w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-orange-600 transition-colors focus:outline-none"
//         >
//           <MenuIcon size={20} />
//         </button>
//       </div>

//       {/* Side Drawer */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-black text-white p-6 transform transition-transform duration-300 ease-in-out z-50 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//       >
//         <button
//           onClick={() => setIsDrawerOpen(false)}
//           className="absolute top-4 right-4 text-gray-400 hover:text-white"
//         >
//           <X size={24} />
//         </button>

//         <ul className="flex flex-col gap-5 mt-12">
//           {currentLinks.map((link) => (
//             <li key={link.name}>
//               <button
//                 onClick={() => handleLinkClick(link.url)}
//                 className={`px-4 py-2 rounded-lg w-full text-left transition-colors ${link.url.split("#")[1] === activeSection
//                     ? "bg-orange-400 text-white"
//                     : "hover:bg-orange-500"
//                   }`}
//               >
//                 {link.name}
//               </button>
//             </li>
//           ))}
//           <li>
//             <button
//               onClick={handleAuthClick}
//               className="flex items-center gap-3 bg-gray-700 px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors w-full"
//             >
//               {isLoggedIn ? <LogOut size={20} /> : <CircleUser size={20} />}
//               {isLoggedIn ? "Logout" : "Login"}
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Backdrop */}
//       {isDrawerOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={() => setIsDrawerOpen(false)}
//         />
//       )}
//     </nav>
//   );
// }
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CircleUser, LogOut, Menu as MenuIcon, X, Home, BookOpen, Briefcase, FileText, Layers, Mail } from "lucide-react";
import { useAuth } from "@/context/UserContext";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, role, logout } = useAuth();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track which section is in view
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
    { name: "Home", url: "/#home", icon: <Home size={20} /> },
    { name: "Education", url: "/#education", icon: <BookOpen size={20} /> },
    { name: "Experience", url: "/#experience", icon: <Briefcase size={20} /> },
    { name: "Resume", url: "/#resume", icon: <FileText size={20} /> },
    { name: "Projects", url: "/#projects", icon: <Layers size={20} /> },
    { name: "Contact", url: "/#contact", icon: <Mail size={20} /> },
  ];

  const adminLinks = [
    { name: "Settings", url: "/admin/settings", icon: <FileText size={20} /> },
    { name: "Projects", url: "/admin/projects", icon: <Layers size={20} /> },
    { name: "Resume", url: "/admin/resume", icon: <FileText size={20} /> },
    { name: "Education", url: "/admin/education", icon: <BookOpen size={20} /> },
    { name: "Experience", url: "/admin/experience", icon: <Briefcase size={20} /> },
    { name: "Contact", url: "/admin/contact", icon: <Mail size={20} /> },
  ];

  const currentLinks = isLoggedIn && role === "admin" ? adminLinks : publicLinks;

  const handleAuthClick = () => {
    setIsMenuOpen(false);
    setIsDrawerOpen(false);
    if (isLoggedIn) {
      logout();
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  const handleLinkClick = (url) => {
    setIsDrawerOpen(false);
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

  // Render links with pill effect
  const renderLink = (link, showIconOnly = false) => {
    const sectionId = link.url.split("#")[1];
    const isActive = sectionId === activeSection;
    return (
      <li key={link.name}>
        <button
          onClick={() => handleLinkClick(link.url)}
          className={`relative px-6 py-2 rounded-full transition-colors duration-200 flex items-center justify-center ${isActive
            ? "text-white font-semibold bg-orange-400 shadow-md"
            : "hover:text-orange-400"
            }`}
        >
          {showIconOnly ? link.icon : link.name}
        </button>
      </li>
    );
  };

  return (
    <nav className="w-full flex justify-center fixed top-0 z-50">
      <div className="flex justify-between items-center w-full max-w-6xl px-4 py-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/icon.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:flex bg-white border border-orange-600 rounded-full px-2.5 py-1 justify-center items-center shadow-lg flex-shrink-0 mx-auto">
          <ul className="flex gap-5 font-medium items-center">
            {currentLinks.map((link) => renderLink(link))}
            {/* Auth icon dropdown */}
            <li className="flex items-center relative px-2">
              {isMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center space-y-3 pt-3">
                  <button
                    onClick={handleAuthClick}
                    title={isLoggedIn ? "Logout" : "Login"}
                    className="w-10 h-10 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-500 transition-colors"
                  >
                    {isLoggedIn ? <LogOut size={20} /> : <CircleUser size={20} />}
                  </button>
                </div>
              )}
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                title="Toggle Menu"
                className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-orange-600 transition-colors focus:outline-none"
              >
                <MenuIcon size={20} />
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Navbar (only icons) */}
        <div className="flex md:hidden bg-orange-50 p-1 rounded-full shadow-lg">
          <ul className="flex list-none">
            {currentLinks.map((link) => renderLink(link, true))}
            <li>
              <button
                onClick={handleAuthClick}
                className="w-10 h-10 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-500 transition-colors"
              >
                {isLoggedIn ? <LogOut size={20} /> : <CircleUser size={20} />}
              </button>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
