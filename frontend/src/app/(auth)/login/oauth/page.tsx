'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function GoogleOAuthStartPage() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    const redirectBaseUrl = process.env.NEXT_PUBLIC_REDIRECT_BASE_URL || 'http://localhost:3000'

    const startOAuthLogin = async () => {
      // get the expected email from sessionStorage
      const email = sessionStorage.getItem('expectedEmail')

      if (!email || !email.includes('@')) {
        router.push('/login?error=MissingOrInvalidEmail')
        return
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // no need to pass email here, sessionStorage has it
          // redirectTo: `${redirectBaseUrl}/dashboard`, After creating dashboard module, uncomment this line
          redirectTo: `${redirectBaseUrl}/login/oauth/callback`, //dummy
          queryParams: {
            prompt: 'select_account' // to ensure the user selects an account every time
          }
        }
      })

      if (error) {
        sessionStorage.removeItem('expectedEmail')
        router.push('/login?error=OAuthStartFailed')
      }
    }

    startOAuthLogin()
  }, [router])

  return (
    <div className="text-center mt-4 text-sm text-gray-500">
      <p>Taking you to Google for login...</p>
      <div className="mt-2 flex justify-center">
        <div className="h-4 w-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    </div>
  )
}
