'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { validateGoogleEmail } from '../(auth)/login/actions'


export default function GoogleLoginButton() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }

    const confirmed = window.confirm(`Sign in with Google using this email?\n\n${email}`)
    if (!confirmed) return

    const allowed = await validateGoogleEmail(email)

    if (allowed) {
      sessionStorage.setItem('expectedEmail', email)
      router.push('/login/oauth')
    } else {
      alert('This email is not registered. Please check again.')
    }
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <input
        type="email"
        placeholder="Please enter your Google account's email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border bg-gray-100 rounded"
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        type="button"
        onClick={handleLogin}
        className="border border-gray-300 hover:border-blue-500 rounded transition mt-5"
      >
        <Image src="/img/google/web_neutral_sq_SI.svg" alt="Google" width={200} height={30} />
      </button>
    </div>
  )
}



