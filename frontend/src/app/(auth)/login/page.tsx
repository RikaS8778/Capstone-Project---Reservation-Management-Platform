// 'use client'

// import { startTransition, useActionState } from 'react'
// import { login } from './actions'
// import GoogleLoginButton from '../../components/GoogleLoginButton'
// import AuthForm from '../../components/AuthForm'
// import { useEffect, useState } from 'react'

// type LoginState = {
//   error: string | null
//   values: { email: string; password: string }
// }

// const initialState: LoginState = {
//   error: null,
//   values: { email: '', password: '' },
// }

// export default function LoginPage() {
//   const [state, formAction] = useActionState(login, initialState)
//   const [oauthError, setOauthError] = useState<string | null>(null)

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search)
//     const err = params.get('error_description')
//     if (err) {
//       setOauthError(decodeURIComponent(err))
//       window.history.replaceState(null, '', window.location.pathname)
//     }
//   }, [])

//   return (
//     <AuthForm
//       title="Login"
//       buttonLabel="Sign in"
//       onSubmit={async (email, password) => {
//         const formData = new FormData()
//         formData.append('email', email)
//         formData.append('password', password)
//         startTransition(() => formAction(formData))
//       }}
//       error={state.error ?? oauthError ?? undefined}
//       GoogleButton={<GoogleLoginButton />}
//     />
//   )
// }


'use client'

import { startTransition, useActionState } from 'react'
import { login, type LoginState } from './actions'
import GoogleLoginButton from '../../components/GoogleLoginButton'
import AuthForm from '../../components/AuthForm'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const initialState: LoginState = {
  error: null,
  values: { email: '', password: '' },
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, initialState)
  const [oauthError, setOauthError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const err = params.get('error_description')
    if (err) {
      setOauthError(decodeURIComponent(err))
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  useEffect(() => {
    if (!state.error && state.role) {
      if (state.role === 1) {
        router.push('/tutor/dashboard')
      } else if (state.role === 2) {
        router.push('/student/dashboard')
      }
    }
  }, [state.role, state.error, router])

  return (
    <AuthForm
      title="Login"
      buttonLabel="Sign in"
      onSubmit={async (email, password) => {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)
        startTransition(() => formAction(formData))
      }}
      error={state.error ?? oauthError ?? undefined}
      GoogleButton={<GoogleLoginButton />}
    />
  )
}
