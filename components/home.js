"use client";

import Image from "next/image";
import toast from 'react-hot-toast'; // Import toast (Toaster is in app/layout.js)

// Removed: useRouter, CircleUser, Menu, isMenuOpen, toggleMenu, handleLoginClick

export default function Home() {
    // 1. Toast Function 
    const handleHelloClick = () => {
        toast.success('Welcome to my portfolio!', {
            duration: 1500,
            icon: '👋', // Using a wave emoji for a friendly touch
            style: {
                backgroundColor: '#1f2937', // Dark background (similar to the black navbar)
                color: '#ffffff', // White text
                border: '2px solid #fb923c', // Orange border (orange-400)
                borderRadius: '12px',
                padding: '16px 24px',
                fontWeight: '600',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            },
        });
    };

    return (
        // Adjusted max-w-7xl to max-w-6xl for slightly more contained content.
        // Changed justify-between to justify-center and added gap-16 to shift content visually toward the center/right.
        <section id="home" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center py-12 px-6 pt-26 relative md:gap-16">

            {/* Left side text */}
            <div className="md:w-1/2 space-y-6 max-w-lg"> {/* Added max-w-lg to constrain text width */}

                {/* WELCOME TOAST BUTTON */}
                <button
                    onClick={handleHelloClick}
                    className="font-semibold text-white bg-orange-400 border border-black rounded-full px-4 py-1 hover:bg-orange-300 transition"
                >
                    Hello!
                </button>

                {/* Added dark:text-white */}
                <h1 className="text-4xl md:text-5xl font-bold">
                    I&apos;m <span className="text-orange-400">Vishwajit Mavalankar</span>, <br />
                    Frontend Developer
                </h1>
                {/* Added dark:text-gray-300 */}
                <p className="text-gray-700">
                    MCA graduate and aspiring Software Developer proficient in JavaScript and actively developing projects using React and Next.js. I am self-motivated, thrive on learning new technologies, and possess the foundational knowledge needed to quickly integrate into a motivated team environment and take on technical challenges.
                </p>

            </div>

            {/* Right side image */}
            <div className="md:w-1/2 flex flex-col items-center relative mt-10 md:mt-0 max-w-sm">
                {/* Orange Circle - Stays orange, but maybe darker in dark mode for contrast */}
                <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-orange-300 absolute bottom-0"></div>

                {/* Profile Image */}
                <Image
                    src="/images/profile.png"
                    alt="Vishwajit"
                    width={350}
                    height={350}
                    className="relative z-10 object-cover"
                />

                {/* Added dark:text-white */}
                <p className="mt-4 font-semibold text-xl ">Fresher</p>
            </div>
        </section>
    );
}
