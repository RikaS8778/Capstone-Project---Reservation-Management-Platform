'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

type Props = {
  publicId: string
}

export default function QuickActionsCard({ publicId }: Props) {
  const [copied, setCopied] = useState(false)

  const inviteLink = `${process.env.NEXT_PUBLIC_SITE_URL}/signup/student/${publicId}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="text-sm text-gray-500 font-semibold mb-2">Quick Actions</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1">Invite Link</p>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={inviteLink}
              className="flex-1 bg-gray-100 px-3 py-1 rounded text-sm"
            />
            <Button onClick={handleCopy} variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-1" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Profile</p>
          <Button variant="secondary" size="sm" asChild>
            <a href="/dashboard/settings">Edit Profile</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
