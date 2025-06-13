'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function TutorOAuthCallback() {
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get('token')
  const publicId = params.get('public_id')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user ) {
        setError('Invalid request parameters or user not authenticated')
        return
      }
      if (!token && !publicId) {
        setError('Invalid request parameters')  
        return
      }

      if(token) {
        // users insert & tokens update 
        const res = await fetch('/api/auth/signup/tutor/oauth', { //not have file yet, how to make function
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
                token,
                id: user.id,
            }),
            credentials: 'include',
        })
        if (res.ok) {
            // redirect to complete page
            router.push('/signup/complete')
            // router.push('/') //dummy
        } else {
            setError('Signup failed. Please try again.')
            router.push(`/totor/signup?token=${token}&error=Signup+failed.+Please+try+again.`)
        }
      } else if (publicId){
        const res = await fetch('/api/auth/signup/student/oauth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
                publicId,
            }),
            credentials: 'include',
        })
        if (res.ok) {
            // redirect to complete page
            router.push('/signup/complete')
            // router.push('/') //dummy
        } else {
            setError('Signup failed. Please try again.')
            router.push(`/${publicId}/signup?error=Signup+failed.+Please+try+again.`)
        }
      }
      
      
      
    })()
  }, [router, token, publicId])

  if (error) return <div className="text-red-500">{error}</div>
  return <div>Processing to sign up with Google...</div>
}