import { getUpcomingStudentLessons } from '@/utils/data/student/data'
import { CalendarIcon } from 'lucide-react'

export default async function UpcomingLessonsCard({ studentId }: { studentId: string }) {
  const lessons = await getUpcomingStudentLessons(studentId)
  const hasLessons = lessons && lessons.length > 0

  return (
    <div className="w-full bg-white shadow-sm rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-4">
        <CalendarIcon className="w-5 h-5 text-pink-500" />
        <h2 className="text-lg font-semibold text-gray-800">Upcoming Lessons</h2>
      </div>

      {!hasLessons ? (
        <div className="text-center text-sm text-gray-600">
          You don&apos;t have any upcoming lessons yet.
        </div>
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <div
              key={`${lesson.id}-${index}`}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
            >
              <p className="text-base font-medium text-gray-800">
                With: {lesson.tutor.first_name} {lesson.tutor.last_name}
              </p>
              <p className="text-sm text-gray-600">
                Start Time: <span className="font-semibold">{lesson.start_at}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
