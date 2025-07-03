
import { SidebarNavForStudent } from '@/app/components/nav/nav'
import { ReactNode } from 'react'


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNavForStudent />
      <main className="flex-1 p-6 max-w-screen-lg mx-auto">{children}</main>
    </div>
  )
}
