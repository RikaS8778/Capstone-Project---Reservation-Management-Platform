import { redirect } from 'next/navigation'
import { getUserInfo } from '@/utils/data/data'
import TutorInfoCard from '@/app/components/dashboard/student/TutorInfoCard'
import { getStudentDashboardData } from '@/utils/data/student/data'
import StudentTicketsCard from '@/app/components/dashboard/student/StudentTicketsCard'
import UpcomingLessonsCard from '@/app/components/dashboard/student/UpcomingLessonsCard'
import PurchasableTicketsCard from '@/app/components/dashboard/student/PurchasableTicketsCard'


export default async function StudentDashboardPage() {
  const { user, userInfo, error } = await getUserInfo()

  if (!userInfo || error) {
    redirect('/login?error=unauthorized')
  }

  if (!userInfo.first_name || !userInfo.last_name) {
    redirect('/signup/complete')
  }

  const data = await getStudentDashboardData()

  if (!data) {
    return (
      <div className="p-4 text-center text-red-500">
        Failed to load tutor info.
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      <TutorInfoCard
        tutorName={data.tutorName}
        tutorMessage={data.tutorMessage}
        tutorPictureUrl={data.tutorPictureUrl}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <StudentTicketsCard studentId={user.id} />
        <UpcomingLessonsCard studentId={user.id} />
        <div className="md:col-span-2 ">
          <PurchasableTicketsCard studentId={user.id} />
        </div>
      </div>

    </div>
  )
}
