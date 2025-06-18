'use client'

import { useRouter } from 'next/navigation' 
import { useEffect, useState } from 'react'

// Define the User type according to your API response structure
interface User {
  first_name?: string;
  last_name?: string;
  // Add other fields as needed
}

export default function DashboardPage() {

    const [user, setUser] = useState<User | null>(null)
    // const [error, setError] = useState<string>() //if I don't use erro, remove it later
    const [isChecking, setIsChecking] = useState(true)
    const router = useRouter()
    
    useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me')
        const data = await res.json()
        setUser(data)

        if (!data.first_name || !data.last_name) {
          router.push('/signup/complete')
        } else {
          setIsChecking(false) 
        }
      } catch (err: unknown) {
        // setError('Failed to fetch user data')
        if (err instanceof Error) {
          console.error('EFailed to fetch user data:', err.message)
        } else {
          console.error('EFailed to fetch user data:', err)
        }
        router.push('/login?error=fetchUserFailed') 
        return
        
      }
    }

      fetchUser()
    }, [router])


    if (isChecking || !user) {
      return <div className="text-center mt-4">Loading user data...</div>
    }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-700">This is the dashboard page.</p>
      {/* Add your dashboard components here */}
    </div>
  )
}