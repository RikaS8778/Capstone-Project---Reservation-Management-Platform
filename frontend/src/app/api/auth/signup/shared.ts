import { SupabaseClient } from '@supabase/supabase-js'

export async function createUserForAuth(supabase: SupabaseClient, { email, password }: { email: string, password: string }) {
  // Create a new user in Supabase Auth
  const { data: authData, error: authError } =  await supabase.auth.signUp({
    email,
    password,
  })
  if (authError) {
    console.error('Auth error:', authError)
    throw new Error(authError.message)
  } 
  if (!authData.user) {
    console.error('User object is null after signUp')
    throw new Error('User object is null after signUp')
  } 
  return authData.user;
}

export async function insertUser(supabase: SupabaseClient, { id, email, role }: { id: string, email: string, role: number }) {
  // Create a new user in public 'users' table
  const { error: userError } = await supabase.from('users').insert({ id, email, role })

  if (userError) {
    console.error('User insert error:', userError)
    throw new Error(userError.message)
  }
  return true;
}

export async function updateToken(supabase: SupabaseClient, {token, email} : {token: string, email: string}) {
  // 
  const { error: tokenError } = await supabase.from('tokens').update({ used_at: new Date(), email}).eq('token', token)
  if (tokenError) {
    console.error('Token update error:', tokenError)
    throw new Error(tokenError.message)
  }
  return true;
}