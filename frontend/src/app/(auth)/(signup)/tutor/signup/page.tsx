'use client'

import AuthForm from '@/app/components/AuthForm'
import GoogleSignupButton from '@/app/components/GoogleSignupBottun'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TutorSignupPage() {
  const token = useSearchParams().get('token')
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null)
  const [error, setError] = useState<string | undefined>(undefined)
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      setIsTokenValid(false)
      return
    }
     const verify = async () => {
      try {
        const res = await fetch(`/api/auth/verify-token?token=${token}`)
        setIsTokenValid(res.ok)
      } catch (err) {
        console.error('Token verification failed:', err)
        setIsTokenValid(false)
      }
    }

    verify()
  }, [token])

  if (isTokenValid === null) {
    return <div className="text-center mt-4">Checking token...</div>
  }

  if (isTokenValid === false) {
    return <div className="text-red-500 text-center mt-4">Invalid or used signup token</div>
  }

  const handleSignup = async (email: string, password: string) => {
    setError(undefined)
    const res = await fetch('/api/auth/signup/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, token }),
    })
    console.log('res', res)
    if (res.ok) {
      // redirect or show success
      //   router.push('/signup/complete') // redirect, replace with actual route
      router.push('/signup/complete') // dummy
      // console.log('Signup successful!')
    } else {
      setError('Signup failed.')
    }
  }

  return (
    <AuthForm
      title="Sign Up for Tutor"
      buttonLabel="Sign Up"
      onSubmit={handleSignup}
      error={error}
      GoogleButton={<GoogleSignupButton redirectTo={typeof window !== 'undefined'
      ? `${window.location.origin}/signup/oauth-callback?token=${token}`
      : ''} />}
    />
  )
}

