"use client";

import Image from "next/image";
import toast from "react-hot-toast";

export default function Home() {
    const handleHelloClick = () => {
        toast.success("Welcome to my portfolio!", {
            duration: 1500,
            icon: "👋",
            style: {
                backgroundColor: "#ffffff",
                color: "#FFA726",
                border: "2px solid #fb923c",
                borderRadius: "12px",
                padding: "16px 44px",
                marginTop: "60px",
                fontWeight: "600",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            },
        });
    };

    const technicalSkills = [
        "React.js",
        "Next.js",
        "JavaScript",
        "HTML5",
        "Tailwind CSS",
    ];

    return (
        <section
            id="home"
            className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-center py-8 px-6 pt-16 relative md:pt-26 md:gap-16"
        >
            {/* 🟠 IMAGE FIRST ON MOBILE */}
            <div className="md:w-1/2 order-1 md:order-2 flex flex-col items-center relative mt-4 mb-4 md:mt-0 max-w-sm">
                {/* ✅ Combined Circle + Image Wrapper */}
                <div
                    className="
            relative flex items-center justify-center
            w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 mt-6
          "
                >
                    {/* Orange Circle */}
                    <div
                        className="
    absolute inset-0 rounded-full
    bg-gradient-to-tr from-orange-400 via-orange-300 to-orange-500
    scale-100 sm:scale-105 md:scale-110
    border-6 border-white
    shadow-2xl shadow-orange-700
    filter blur-xl
    opacity-80
  "
                    ></div>


                    {/* Profile Image */}
                    <Image
                        src="/images/profile.png"
                        alt="Vishwajit"
                        fill
                        className="
              object-contain rounded-full relative z-10
              scale-110 sm:scale-105 md:scale-100
            "
                    />
                </div>
            </div>

            {/* 🧑‍💻 TEXT SECOND ON MOBILE */}
            <div className="md:w-1/2 order-2 md:order-1 space-y-2 mt-2 max-w-lg text-center md:text-left">
                <button
                    onClick={handleHelloClick}
                    className="font-semibold text-white bg-orange-400 rounded-full px-4 py-1 hover:bg-orange-300 transition"
                >
                    Hello!
                </button>

                <h1 className="text-3xl sm:text-4xl font-bold leading-tight md:text-5xl">
                    I&apos;m <span className="text-orange-400">Vishwajit Mavalankar</span>, <br />
                    Frontend Developer
                </h1>

                <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                    MCA graduate and aspiring Software Developer proficient in JavaScript
                    and actively developing projects using React and Next.js. I am
                    self-motivated, thrive on learning new technologies, and possess the
                    foundational knowledge needed to quickly integrate into a motivated
                    team environment and take on technical challenges.
                </p>

                {/* --- TECHNICAL SKILLS SECTION --- */}
                <div className="space-y-3">
                    <h2 className="font-bold text-3xl text-gray-800">
                        <span className="text-orange-400">Technical</span> Skills
                    </h2>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {technicalSkills.map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1 bg-orange-400 text-white border border-orange-400 hover:bg-orange-500 rounded-full text-sm font-medium shadow-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
