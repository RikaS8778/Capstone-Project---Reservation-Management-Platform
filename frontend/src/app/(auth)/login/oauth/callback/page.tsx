'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import Spinner from '@/app/components/Spinner'

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
      
      const { data: userInfo } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle()
    
      if (!userInfo) {
        router.push('/login?error=UserInfoNotFound')
        return 
      }
    
      if (userInfo.role === 1) {
        router.push('/tutor/dashboard')
      } else if (userInfo.role === 2) {
        router.push('/student/dashboard')
      } 
    
    }

    checkSession()
  }, [router])

  return (
    <Spinner message={'Verifying your login...'} />
  )
}
