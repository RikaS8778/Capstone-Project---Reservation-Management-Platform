'use client'

import AuthForm from '@/app/components/AuthForm'
import GoogleSignupButton from '@/app/components/GoogleSignupBottun'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Spinner from '@/app/components/Spinner'

export default function StudentSignupPage() {
  const publicId = useSearchParams().get('public_id')
  const [isPublicIdValid, setIsPublicIdValid] = useState<boolean | null>(null)
  const [error, setError] = useState<string | undefined>(undefined)
  const router = useRouter()

  useEffect(() => {
    if (!publicId) {
      setIsPublicIdValid(false)
      return
    }
     const verify = async () => {
      try {
        const res = await fetch(`/api/auth/check-public-id?public_id=${publicId}`)
        setIsPublicIdValid(res.ok)
      } catch (err) {
        console.error('Public_id checking failed:', err)
        setIsPublicIdValid(false)
      }
    }

    verify()
  }, [publicId])

  if (isPublicIdValid === null) {
    return <Spinner message={'Checking public id...'} />
    // return <div className="text-center mt-4">Checking token...</div>
  }

  if (isPublicIdValid === false) {
    return <div className="text-red-500 text-center mt-4">Invalid url. Please contact your tutor.</div>
  }
  
  const handleSignup = async (email: string, password: string) => {
    setError(undefined)
    const res = await fetch('/api/auth/signup/student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, publicId }),
    })
    console.log('res', res)
    if (res.ok) {
      router.push('/signup/complete')
    } else {
      setError('Signup failed.')
    }
  }

  return (
    <AuthForm
      title="Sign Up for Student"
      buttonLabel="Sign Up"
      onSubmit={handleSignup}
      error={error}
      GoogleButton={<GoogleSignupButton redirectTo={typeof window !== 'undefined'
      ? `${window.location.origin}/signup/oauth-callback?token=${publicId}`
      : ''} />}
    />
  )
}

