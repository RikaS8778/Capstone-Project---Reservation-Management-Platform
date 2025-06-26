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


// User--update for complete signup
export async function updateUserProfile(supabase: SupabaseClient, {
  id, first_name, last_name, time_zone
}: {
  id: string, first_name: string, last_name: string, time_zone: string
}) {
  const { error } = await supabase
    .from('users')
    .update({ first_name, last_name, time_zone, updated_at: new Date() })
    .eq('id', id)

  if (error) throw new Error(`User update error: ${error.message}`)
}


// tutor_settings - insert for complete signup
export async function insertTutorSetting(supabase: SupabaseClient, {
  tutor_id, public_id, booking_deadline, booking_unit, currency, message, picture_path
}: {
  tutor_id: string, public_id: string, booking_deadline: number, booking_unit: number,
  currency: string, message: string, picture_path?: string
}) {
  const { error } = await supabase.from('tutor_settings').insert({
    tutor_id, public_id, booking_deadline, booking_unit, currency, message,
    picture_path, created_at: new Date(), updated_at: new Date()
  })
  if (error) throw new Error(`tutor_settings insert error: ${error.message}`)
}
