import { getThisMonthRevenue } from '@/utils/data'

export default async function ThisMonthRevenueCard({ tutorId }: { tutorId: string }) {
  const { total, currency } = await getThisMonthRevenue(tutorId)

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm text-gray-500 font-semibold">This Month&apos;s Revenue</h3>
          <p className="text-2xl font-bold mt-1">
            {currency} {(total / 100).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
