import { getPurchasableTicketTypes } from '@/utils/data/student/data'
import { CreditCardIcon } from 'lucide-react'
import PurchaseButton from './PurchaseButton'


type Props = {
  studentId: string
}

export default async function PurchasableTicketsCard({ studentId }: Props) {
  const tickets = await getPurchasableTicketTypes(studentId)

  return (
    <div className="w-full bg-white p-6 shadow-sm rounded-xl">
      <div className="flex items-center space-x-2 mb-4">
        <CreditCardIcon className="w-5 h-5 text-pink-500" />
        <h2 className="text-lg font-semibold text-gray-800">Available Tickets for Purchase</h2>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center text-sm text-gray-600">No purchasable tickets available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm flex flex-col justify-between"
            >
              <div>
                <p className="text-base font-medium text-gray-800">{ticket.name}</p>
                <p className="text-sm text-gray-600">
                  Type: <span className="font-semibold capitalize">{ticket.type}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: <span className="font-semibold">{ticket.lesson_quantity}</span> lessons
                </p>
                <p className="text-sm text-gray-600">
                  Duration: <span className="font-semibold">{ticket.lesson_duration}</span> min / lesson
                </p>
                <p className="text-sm text-gray-600">
                  Price: <span className="font-semibold">{ticket.price.toLocaleString(undefined, { style: 'currency', currency: ticket.currency })}</span>
                </p>
              </div>

              <PurchaseButton ticketId={ticket.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
