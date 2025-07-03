// app/components/student/dashboard/StudentTicketsCard.tsx
import { getStudentTickets } from '@/utils/data/student/data'
// import { StudentTicket } from '@/utils/data/student/data'
import { TicketIcon } from 'lucide-react'

export default async function StudentTicketsCard({ studentId }: { studentId: string }) {
  const tickets = await getStudentTickets(studentId)

  const hasTickets = tickets && tickets.length > 0

  return (
<div className="w-full max-w-3xl mx-auto bg-white shadow-sm rounded-xl p-6">
  <div className="flex items-center space-x-2 mb-4">
    <TicketIcon className="w-5 h-5 text-pink-500" />
    <h2 className="text-lg font-semibold text-gray-800">Tickets</h2>
  </div>

  {!hasTickets ? (
        <div className="text-center text-sm text-gray-600">
        You don&apos;t have any valid tickets yet.
        </div>
    ) : (
        <div className="space-y-4">
        {tickets.map((ticket, index) => (
            <div
            key={`${ticket.ticket_type_name}-${ticket.lesson_duration}-${index}`}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
            >
            <p className="text-base font-medium text-gray-800">
                {ticket.ticket_type_name} ({ticket.lesson_duration} min)
            </p>
            <p className="text-sm text-gray-600">
                Remaining: <span className="font-semibold">{ticket.remaining_count}</span>
            </p>
            <p className="text-sm text-gray-600">
                Expires:{' '}
                {ticket.expire_at
                ? new Date(ticket.expire_at).toLocaleDateString()
                : 'N/A'}
            </p>
            </div>
        ))}
        </div>
    )}
    </div>

  )
}