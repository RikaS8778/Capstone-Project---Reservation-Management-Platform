import TicketTypeForm from './form'

export default function NewTicketTypePage() {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Add Ticket Type</h2>
      <TicketTypeForm />
    </div>
  )
}
