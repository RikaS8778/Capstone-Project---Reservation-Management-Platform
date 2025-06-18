'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import UserProfileFields from '@/app/components/UserProfileFieldForm'
import TutorSettingsFields from '@/app/components/TutorSettingFieldsForm'

interface User {
  role: number;
  first_name?: string;
  last_name?: string;
  time_zone?: string;
  // Add other user fields as needed
}

export default function SignupCompletePage() {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string>()
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        setUser(data)
      })
      .catch(() => setError('failed to fetch user data'))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    //!!have to update - it's jusa a example
    interface TutorSettingPayload {
      subject: FormDataEntryValue | null;
      experience: FormDataEntryValue | null;
      // ...etc
    }

    interface Payload {
      first_name: FormDataEntryValue | null;
      last_name: FormDataEntryValue | null;
      time_zone: FormDataEntryValue | null;
      tutor_setting?: TutorSettingPayload;
    }

    const payload: Payload = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      time_zone: formData.get('time_zone'),
    }

    

    if (user?.role === 1) {
      payload.tutor_setting = {
        // from TutorSettingsFields
        //!!have to update - it's jusa a example!!
        subject: formData.get('subject'),
        experience: formData.get('experience'),
        // ...etc
      }
    }
    const res = await fetch('/api/auth/me', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
    //router.push('/dashboard') 
      router.push('/') // dummy redirect, replace with actual route
    } else {
      setError('Failed to update profile. Please try again.')
    }
  }

  if (!user) return <div className='test-center'>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="text-center mt-4">
        <h1 className="text-2xl mb-4">Complete Your Signup</h1>
        <p className="mb-6">Please fill out your profile information below.</p>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
        <UserProfileFields />
        {user.role === 1 && <TutorSettingsFields />}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-5">Submit</button>
        </form>
    </div>
  )
}