
import { prisma } from '@/lib/prisma'

export default async function ResumePage() {
  // ✅ Fetch profile with resumeUrl
  const profile = await prisma.userPortfolio.findFirst()

  return (
    <section
      id="resume"
      className="py-8 mt-8 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-4xl font-bold text-center mt-8 mb-10 text-gray-800 dark:text-white">
          My <span className="text-orange-500">Resume</span>
        </h2>

        <h3 className="text-2xl text-orange-500 font-semibold mb-4 text-center md:text-left">
          Preview
        </h3>

        {profile?.resumeUrl ? (
          <div className="w-full h-[400px] sm:h-[500px] md:h-[700px] border rounded-lg overflow-hidden">
            <iframe
              src={profile.resumeUrl} // ✅ dynamic from DB
              className="w-full h-full"
              title="Resume Preview"
            ></iframe>
          </div>
        ) : (
          <p className="text-gray-500 text-center md:text-left">
            Resume not uploaded yet.
          </p>
        )}
      </div>
    </section>
  )
}
