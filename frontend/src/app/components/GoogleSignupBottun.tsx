import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'

export default function GoogleSignupButton({ redirectTo }: { redirectTo: string }) {
  const supabase = createClient()
  return (
    <button
      type="button"
      onClick={async () => {
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo }
        })
      }}
      className="flex items-center justify-center gap-2 mx-auto my-4 hover:bg-gray-100 transition"
    >
    <Image 
        src="/img/google/web_neutral_sq_SU.svg" 
        alt="Google sign-up" 
        width={200} 
        height={100}
    />
    </button>
  )
}