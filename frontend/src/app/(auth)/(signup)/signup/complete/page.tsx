'use client'

import TutorSettingFieldsForm from '@/app/components/TutorSettingFieldsForm'
import UserProfileFieldForm from '@/app/components/UserProfileFieldForm'
import { useForm, FormProvider } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Spinner from '@/app/components/Spinner'


type FormValues = {
  first_name: string
  last_name: string
  timezone: string
  publicId: string
  bookingDeadline: number
  bookingUnit: number
  currency: string
  discription: string
  file?: File | null;
}

export default function CompleteSignupPage() {
  const methods = useForm<FormValues>({
    defaultValues: {
      first_name: '',
      last_name: '',
      timezone: 'America/Vancouver',
      publicId: '',
      bookingDeadline: 1,
      bookingUnit: 15,
      currency: 'CAD',
      discription: '',
    },
  })
  const router = useRouter()
  const { handleSubmit, setError } = methods
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null)
  // const [error, setError] = useState<string>()

  useEffect(() => {
      fetch('/api/auth/me')
        .then(res => res.json())
        .then(data => {
          setUser(data)
        })
        .catch(() => setServerError('failed to fetch user data'))
    }, [])

  if (!user) return (
    <Spinner message={'Loading...'} />
  )
    

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    setServerError(null)
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'file') {
        if (value instanceof File && value.size > 0) {
          formData.append('file', value);
        }
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    const res = await fetch('/api/auth/signup/complete', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      setServerError(result.error || 'Something went wrong. Please try again.');
      setLoading(false);
      return;
    }

    // if success, redirect to dashboard 
    // TODO: if users.role==1 redirect to tutor dashboard, else if users.role==2 then student dashboard
    if(user.role === 1) {
      router.push('/tutor/dashboard');
    } else if (user.role === 2) {
      router.push('/student/dashboard');
    }
    
  }

  

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Complete Your Signup</h1>
      <p className="mb-6 text-center text-gray-600">
        Please fill out your profile information below.
      </p>

      {serverError && (
        <div className="m-4 text-red-600 font-semibold text-center">
          {serverError}
        </div>
      )}

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <UserProfileFieldForm />
          {/* TODO: if users.role==2, TutorSettingFieldsForm should be invisible. */}
          {user.role === 1 && <TutorSettingFieldsForm />}
          {/* <TutorSettingFieldsForm /> */}

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className="block w-2/6 mx-auto bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
