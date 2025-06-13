'use client'
import { useSearchParams } from 'next/navigation'

export default function ErrorPage() {
  const params = useSearchParams()
  const message = params.get('message')

  return (
    <div className="text-red-500">
      Login failed: {message ?? 'Unknown error'}
    </div>
  )
}
