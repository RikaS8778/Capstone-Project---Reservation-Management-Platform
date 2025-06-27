// import { createClient } from '@/utils/supabase/server'
// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'

// export default async function TutorDashboardPage() {
//   const { user, userInfo, error } = await getUserInfo()

//   if (!user || !userInfo || error) {
//     redirect('/login?error=unauthorized')
//   }

//   if (!userInfo.first_name || !userInfo.last_name) {
//     redirect('/signup/complete')
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome, {userInfo.first_name}!</h1>
//       <p className="text-gray-600 mb-6">This is your tutor dashboard.</p>

//       {/* 各ダッシュボード要素はここに含めていく */}
//       {/* <SummaryCards /> */}
//       {/* <RecentReservations /> */}
//       {/* <QuickActions /> */}
//     </div>
//   )
// }








// app/(auth)/(tutor)/dashboard/page.tsx

import { redirect } from 'next/navigation'

import { getThisMonthRevenue, getTotalStudents, getUpcomingLessons } from '@/utils/data'

// import TotalStudentsCard from '@/app/components/tutor/dashboard/TotalStudentsCard'
// import ThisMonthRevenueCard from '@/app/components/tutor/dashboard/ThisMonthRevenueCard'
// import UpcomingLessonsCard from '@/app/components/tutor/dashboard/UpcomingLessonsCard'
// import QuickActionsCard from '@/app/components/tutor/dashboard/QuickActionsCard'
// import StripeConnectBanner from '@/app/components/tutor/dashboard/StripeConnectBanner'
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

  // Fetch dashboard data
  // const [revenueData, totalStudents, upcomingLessons] = await Promise.all([
  //   getThisMonthRevenue(tutorId),
  //   getTotalStudents(tutorId),
  //   getUpcomingLessons(tutorId),
  // ])
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
