
import { redirect } from 'next/navigation'

import { getThisMonthRevenue, getTotalStudents, getUpcomingLessons } from '@/utils/data'
import { getUserInfo } from './data'
import StripeConnectBanner from '@/app/components/dashboard/tutor/StripeConnectBanner'
import TotalStudentsCard from '@/app/components/dashboard/tutor/TotalStudentsCard'
import ThisMonthRevenueCard from '@/app/components/dashboard/tutor/ThisMonthRevenueCard'
import UpcomingLessonsCard from '@/app/components/dashboard/tutor/UpcomingLessonsCard'
import QuickActionsCard from '@/app/components/dashboard/tutor/QuickActionsCard'

export default async function DashboardPage() {
  // Auth & profile check
  const { user, userInfo, error } = await getUserInfo()

  if (!user || !userInfo || error) {
    redirect('/login?error=unauthorized')
  }

  if (!userInfo.first_name || !userInfo.last_name) {
    redirect('/signup/complete')
  }

  const tutorId = user.id

  const revenueData = await getThisMonthRevenue(tutorId)

  const needsStripeConnect = !revenueData.stripe_account_id

  return (
    <main className="px-4 md:px-8 py-6">
      <h1 className="text-2xl font-semibold mb-6">Tutor Dashboard</h1>

      {needsStripeConnect && <StripeConnectBanner />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <TotalStudentsCard tutorId={tutorId} />
        <ThisMonthRevenueCard tutorId={tutorId} />
        <UpcomingLessonsCard tutorId={tutorId} />
        <QuickActionsCard publicId={tutorId} />
      </div>

      <div className="text-sm text-gray-500 text-center">
        Dashboard generated at: {new Date().toLocaleString()}
      </div>
    </main>
  )
}
