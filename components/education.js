// components/EducationTimeline.jsx

import React from 'react';
import TimelineItem from '@/components/TimelineItem'; // Ensure this path is correct

const EducationTimeline = () => {
    // Education data formatted for the TimelineItem component
    const educationData = [
        {
            title: "MCA (Master of Computer Applications)",
            subtitle: "2022 - 2024 | CGPA: 8.36",
            institution: "Finolex Academy of Management and Technology, Ratnagiri",
            description: "Completed post-graduation focusing on advanced software development and management.",
            dotColor: "orange"
        },
        {
            title: "B.Sc. Computer Science",
            subtitle: "2019 - 2022 | CGPA: 9.79",
            institution: "Nya. Tatyasaheb Athalye Arts, Ved. S.R. Sapre Commerce and Vid. Dadasaheb Pitre Science College (Autonomous), Devrukh",
            description: "Graduated with Honors from a prestigious autonomous college.",
            dotColor: "dark"
        },
        {
            title: "Higher Secondary Certificate (HSC)",
            subtitle: "2018 - 2019 | 52.00%",
            institution: "Paisa Fund High School, Sangmeshwar",
            description: "Focused on foundational science subjects during higher secondary education.",
            dotColor: "orange"
        },
        {
            title: "Secondary School Certificate (SSC)",
            subtitle: "2016 - 2017 | 76.40%",
            institution: "Paisa Fund High School, Sangmeshwar",
            description: "Successfully completed secondary school education with distinction.",
            dotColor: "dark"
        }
    ];

    return (
        <section id="education" className="py-8 mt-10 transition-colors duration-300">
            <div className="container mx-auto mt-16 px-4 max-w-5xl">
                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 ">
                    My <span className="text-orange-500">Education</span>
                </h2>

                <div className="flex flex-col bg-orange-50 pt-10 pr-8">
                    {educationData.map((edu, index) => (
                        <TimelineItem
                            key={index}
                            company={edu.title}          // Degree/Certificate
                            dateRange={edu.subtitle}     // Years + CGPA/%
                            position={edu.institution}   // Institution name
                            description={edu.description} // Extra info
                            isOrangeDot={edu.dotColor === "orange"}
                            isLastItem={index === educationData.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationTimeline;
