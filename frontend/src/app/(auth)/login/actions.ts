'use server'

// import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'


export async function login(_: { error: string | null },  formData: FormData) {
  
  
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return {
      error: error.message,
      values: { email: data.email, password: data.password },
    }
  }
  
  redirect('/dashboard')
}

export async function validateGoogleEmail(email: string): Promise<boolean> {
  if (!email || !email.includes('@')) return false

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle()

  if (error) {
    console.error('[validateGoogleEmail] Supabase error:', error.message)
    return false
  }

  return !!data
}

//MEMO: probably not needed, later I'll remove this 

// export const handleLogin = async () => {
//     const supabase = await createClient()
//     const redirectBaseUrl = process.env.NEXT_PUBLIC_REDIRECT_BASE_URL || 'http://localhost:3000'
//     const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//             redirectTo: `${redirectBaseUrl}/login/oauth`, // replace with your redirect URL
//         },
//     })    
    
//     if (data?.url) {
//       // redirect to the Google login page
//       redirect(data.url);
//     }

//     if (error) {
//       console.error('Google Login error:', error);
//       redirect(`/login?from=google&error_description=${encodeURIComponent(error.message)}`)
//     }
// };


//MEMO: probably not needed, later I'll remove this 

// export async function signup(formData: FormData) {
//   const supabase = await createClient()

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const { error } = await supabase.auth.signUp(data)

//   if (error) {
//     return { error: error.message } 
//   }

//   revalidatePath('/', 'layout')
//   redirect('/')
// }




