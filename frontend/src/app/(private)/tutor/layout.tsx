
import { SidebarNavForTutor } from '@/app/components/nav/nav'
import { ReactNode } from 'react'


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarNavForTutor role={true} />
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  )
}
