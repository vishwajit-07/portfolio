// components/WorkExperience.jsx
import React from 'react';
import TimelineItem from '@/components/TimelineItem'; // Adjust path if needed

const Experience = () => {
    // Define your experience data
    const experiences = [
        {
            company: "Pleximus Inc.",
            dateRange: "Feb 2024 - Jun 2024",
            position: "Software Developer Intern (PHP Laravel)",
            description: "Collaborated with a team of experienced web developers at Pleximus Inc. to gain hands-on frontend and backend development experience.",
            dotColor: "dark"
        },
        {
            company: "Codveda",
            dateRange: "Aug 2025 - Sep 2025",
            position: "Frontend Developer Intern (Next.js)",
            description: "Built responsive web interfaces using ReactJS, HTML, CSS, and JavaScript. Integrated APIs and collaborated with backend team. Improved UI performance and user experience.",
            dotColor: "orange"
        },
    ];

    return (
        <section id="experience" className="py-8 mt-8 dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-4xl font-bold text-center mt-8 mb-10 text-gray-800 dark:text-white">
                    My Work <span className="text-orange-500">Experience</span>
                </h2>

                <div className="flex flex-col bg-blue-50 pt-10 pr-8">
                    {experiences.map((exp, index) => (
                        <TimelineItem
                            key={index}
                            company={exp.company}
                            dateRange={exp.dateRange}
                            position={exp.position}
                            description={exp.description}
                            isOrangeDot={exp.dotColor === "orange"}
                            isLastItem={index === experiences.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
