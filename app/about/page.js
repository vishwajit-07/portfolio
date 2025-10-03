import { prisma } from '@/lib/prisma'

export default async function AboutPage() {
  const profile = await prisma.profile.findFirst()

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="pt-20 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4 py-16">
        <div className="md:col-span-2 space-y-8">
          <h1 className="text-3xl font-bold">About Me</h1>
          <p className="text-gray-300">{profile?.bio}</p>

          <div className="space-y-2">
            <p><strong>Name:</strong> {profile?.name}</p>
            <p><strong>Role:</strong> {profile?.role}</p>
            <p><strong>Email:</strong> {profile?.email}</p>
            <p><strong>Phone:</strong> {profile?.phone}</p>
            <p><strong>Address:</strong> {profile?.address}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
