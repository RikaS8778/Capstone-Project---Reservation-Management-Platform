import { getUpcomingLessons } from '@/utils/data'

export default async function UpcomingLessonsCard({ tutorId }: { tutorId: string }) {
  // Fetch upcoming lessons from the DB
  const lessons = await getUpcomingLessons(tutorId)

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="text-sm font-semibold text-gray-500 mb-2">Upcoming Lessons</h3>
      <ul className="space-y-2 text-sm">
        {lessons.length === 0 ? (
          <li className="text-gray-400">No upcoming lessons</li>
        ) : (
          lessons.slice(0, 3).map((lesson) => (
            <li key={lesson.id} className="text-gray-700">
              {`${lesson.student.first_name} ${lesson.student.last_name}`} - {lesson.start_time}
            </li>
          ))
        )}
      </ul>
      <div className="mt-2 text-right">
        <a href="/tutor/reservations" className="text-sm text-purple-600 hover:underline">
          View All
        </a>
      </div>
    </div>
  )
}
