'use client'

import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState, useMemo } from 'react'
import { DataTable } from '@/app/components/DataTable'

export type TicketType = {
  id: string
  // tutor_id: string
  name: string
  type: number
  quantities: number
  price: string
  lesson_duration: number
  visibility: number
  created_at: string
}

type Props = {
  data: TicketType[]
}

export default function TicketTypesTable({ data }: Props) {
  const [currency, setCurrency] = useState('CAD')

  useEffect(() => {
    async function fetchCurrency() {
      try {
        const res = await fetch('/api/auth/me')
        const json = await res.json()
        console.log('Fetched currency:', json.currency)
        if (json.currency) {
          setCurrency(json.currency)
        }
      } catch (err) {
        console.error('Failed to fetch currency:', err)
      }
    }

    fetchCurrency()
  }, [])

  const columns = useMemo<ColumnDef<TicketType>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Ticket Name',
    },
    {
      accessorKey: 'type',
      header: 'Ticket Type',
      cell: ({ row }) => {
        const value = row.original.type
        return value == 1 ? 'One-time' : value === 2 ? 'Monthly' : 'Unknown'
    },
    },
    {
      accessorKey: 'quantities',
      header: 'Quantities',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => {
        const raw = row.original.price
        console.log('row.original.price:', raw)

        const cleaned = typeof raw === 'string' ? raw.replace(/[^0-9.-]+/g, '') : raw
        const price = Number(cleaned)

        if (!cleaned || isNaN(price)) return 'N/A'

        return price.toLocaleString(undefined, {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
      },
    },
    {
      accessorKey: 'lesson_duration',
      header: 'Lesson Duration',
    },
    {
      accessorKey: 'visibility',
      header: 'Visibility',
      cell: ({ row }) => {
      const value = row.original.visibility
      return value == 1 ? 'Public' : value === 2 ? 'Private' : 'Unknown'
    },
     
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      cell: ({ row }) => {
        const d = new Date(row.getValue('created_at'))
        const yyyy = d.getFullYear()
        const mm = String(d.getMonth() + 1).padStart(2, '0')
        const dd = String(d.getDate()).padStart(2, '0')
        return `${yyyy}-${mm}-${dd}`
      },
    },
  ], [currency]) 

  return (
    <div className="overflow-x-auto">
      <DataTable columns={columns} data={data} />
    </div>
  )
}




// 'use client'

// import { ColumnDef } from '@tanstack/react-table'
// import { DataTable } from '@/app/components/DataTable'
// import { useEffect, useState } from 'react'

// export type TicketType = {
//   id: string
//   tutor_id: string
//   name: string
//   type: number
//   quantities: number
//   price: string
//   lesson_duration: number
//   visibility: number
//   created_at: string
// }

// type Props = {
//   data: TicketType[]
// }

// // const typeLabel: Record<number, string> = {
// //   1: 'One-time',
// //   2: 'Monthly',
// // }

// // const visibilityLabel: Record<number, string> = {
// //   1: 'Public',
// //   2: 'Private',
// // }

// const columns: ColumnDef<TicketType>[] = [
//   {
//     accessorKey: 'name',
//     header: 'Ticket Name',
//   },
//   {
//     accessorKey: 'type',
//     header: 'Ticket Type',
//     // cell: ({ row }) => <Badge>{typeLabel[row.original.type]}</Badge>,
//   },
//   {
//     accessorKey: 'quantities',
//     header: 'Quantities',
//   },
//   {
//     accessorKey: 'price',
//     header: 'Price',
//     cell: ({ row }) => (
//       <span>
//         {Number(row.original.price).toLocaleString(undefined, {
//           style: 'currency',
//           currency: 'CAD',
//         })}
//       </span>
//     ),
//   },
//   {
//     accessorKey: 'lesson_duration',
//     header: 'Lesson Duration',
//   },
//   {
//     accessorKey: 'visibility',
//     header: 'Visibility',
//     // cell: ({ row }) => <Badge variant="outline">{visibilityLabel[row.original.visibility]}</Badge>,
//   },
//   {
//     accessorKey: 'created_at',
//     header: 'Created At',
//     cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
//   },
// ]

// export default function TicketTypesTable({ data }: Props) {
  
//   return (
//     <div className="overflow-x-auto">
//       <DataTable columns={columns} data={data} />
//     </div>
//   )
// }
