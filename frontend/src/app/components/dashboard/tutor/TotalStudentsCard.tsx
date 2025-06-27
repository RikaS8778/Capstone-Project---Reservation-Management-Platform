// app/components/tutor/dashboard/TotalStudentsCard.tsx

import { getTotalStudents } from "@/utils/data"

export default async function TotalStudentsCard({ tutorId }: { tutorId: string }) {
  // Fetch total number of students for this tutor
  const total = await getTotalStudents(tutorId)

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="text-sm font-semibold text-gray-500">Total Students</h3>
      <p className="mt-2 text-3xl font-bold text-gray-900">
        {total ?? 0}
      </p>
    </div>
  )
}
