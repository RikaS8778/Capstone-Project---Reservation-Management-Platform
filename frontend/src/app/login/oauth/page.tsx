'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function OAuthRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        // router.push('/dashboard') 
        router.push('/')  //till we have a dashboard
      } else {
        router.push('/login?error_description=Google+Login+Failed')
      }
    })
  }, [])

  return <p className="text-center mt-4">Redirecting...</p>
}
