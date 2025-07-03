import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { createUserForAuth, insertUser } from '../shared'

export async function POST(req: NextRequest) {
  
  
  try {
    const { email, password, publicId } = await req.json()
    
    // console.log(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    console.log('public_id: ', publicId)
    
    const supabase = await createClient()

    // 1. use supabase.auth.signUp to create a new user
    const authUser = await createUserForAuth(supabase, { email: email, password: password })
  
    
    // 2. insert the user into the 'users' table
    const isUserCreated = await insertUser(supabase, {
      id: authUser.id, 
      email: email,
      role: 2, // assuming role 2 is for students
      public_id: publicId, // token contains the public_id for student signup
    })
    if (!isUserCreated) {
      return NextResponse.json({ error: 'Failed to create user in the database' }, { status: 500 })
    }
 
    return NextResponse.json({ user: authUser }, { status: 200 })
    
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 400 })
  }
  
}
