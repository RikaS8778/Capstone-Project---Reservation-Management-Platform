import Link from 'next/link'
import Image from 'next/image'
import SignOutButton from '../SignOutButton'

export function SidebarNavForTutor({role}:{role?: boolean}) {
    const linkString = role ? '/tutor/dashboard' : '/student/dashboard'
  return (
    <nav className="w-50 h-screen bg-white border-r shadow-sm p-6 flex flex-col justify-between">
      <div>
        <Link href={linkString} className="flex items-center mb-4">
          <Image
            src="/schedulia-logo.png"
            alt="Schedulia Logo"
            width={150}
            height={150}
          />
          {/* <span className="ml-2 font-bold text-lg text-purple-600">SCHEDULIA</span> */}
        </Link>

        <ul className="space-y-4 ml-2">
          <li>
            <Link href={linkString} className="text-gray-700 hover:text-purple-600 font-semibold">Dashboard</Link>
          </li>
          <li>
            <Link href={`${linkString}/ticket-types`} className="text-gray-700 hover:text-purple-600 font-semibold">Ticket Types</Link>
          </li>
          <li>
            <Link href={`${linkString}/availabilities`} className="text-gray-700 hover:text-purple-600 font-semibold">Availabilities</Link>
          </li>
          {/* add other menu... later */}
        </ul>
        
      </div>
      <div className='ml-2 mt-auto mb-2'>
            <SignOutButton />
      </div>
      
    </nav>
  )
}


export function SidebarNavForStudent({role}:{role?: boolean}) {
    const linkString = role ? '/tutor/dashboard' : '/student/dashboard'
  return (
    <nav className="w-50 h-screen bg-white border-r shadow-sm p-6 flex flex-col justify-between">
      <div>
        <Link href={linkString} className="flex items-center mb-4">
          <Image
            src="/schedulia-logo.png"
            alt="Schedulia Logo"
            width={150}
            height={150}
          />
          {/* <span className="ml-2 font-bold text-lg text-purple-600">SCHEDULIA</span> */}
        </Link>

        <ul className="space-y-4 ml-2">
          <li>
            <Link href={linkString} className="text-gray-700 hover:text-purple-600 font-semibold">Dashboard</Link>
          </li>
          <li>
            <Link href={`${linkString}/`} className="text-gray-700 hover:text-purple-600 font-semibold">Booking</Link>
          </li>
          <li>
            <Link href={`${linkString}/availabilities`} className="text-gray-700 hover:text-purple-600 font-semibold">Purchase History</Link>
          </li>
          {/* add other menu... later */}
        </ul>
        
      </div>
      <div className='ml-2 mt-auto mb-2'>
            <SignOutButton />
      </div>
      
    </nav>
  )
}