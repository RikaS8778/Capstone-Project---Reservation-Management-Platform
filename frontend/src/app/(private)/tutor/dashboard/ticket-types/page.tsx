import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getTicketTypes } from '@/utils/data/tutor/data'
import TicketTypesTable from './data-tables'


export default async function TicketTypePage() {
  const ticketTypes = await getTicketTypes()
  console.log('Fetched ticket types:', ticketTypes)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Ticket Types</h2>
        <Link href="/tutor/dashboard/ticket-types/new">
          <Button>Add Ticket Type</Button>
        </Link>
      </div>
      <TicketTypesTable data={ticketTypes} />
    </div>
  )
}
