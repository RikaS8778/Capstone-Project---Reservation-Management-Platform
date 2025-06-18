'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function GoogleOAuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      
      const session = data.session
      console.log('access_token:', session?.access_token)
      const expectedEmail = sessionStorage.getItem('expectedEmail')

      if (error) {
        console.error('Error while fetching session:', error.message)
        router.push('/login?error=sessionFetchFailed')
        return
      }

      if (!session || !session.user || !expectedEmail) {
        router.push('/login?error=MissingSessionOrEmail')
        return
      }

      // Check if the logged-in user's email matches the expected email
      if (session.user.email !== expectedEmail) {
        await supabase.auth.signOut()
        router.push('/login?error=EmailMismatch')
        return
      }

      sessionStorage.removeItem('expectedEmail')
      router.push('dashboard') // dummy redirect, replace with actual dashboard route
    }

    checkSession()
  }, [router])

  return (
    <div className="text-center mt-4 text-sm text-gray-500">
      <p>Verifying your login...</p>
    </div>
  )
}
