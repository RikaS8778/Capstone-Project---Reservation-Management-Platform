'use client'

import { handleLogin } from '@/app/login/actions'
import Image from 'next/image'

export default function GoogleLoginButton() {
  return (
    <button
      type="button"
      onClick={() => handleLogin()}
      className="flex items-center justify-center gap-2 mx-auto my-4 hover:bg-gray-100 transition"
    >
      <Image
        src="/img/google/web_neutral_sq_SI.svg"
        alt="Google sign-in"
        width={200}
        height={100}
        className="inline-block"
        priority={true}
      />
    </button>
  )
}
