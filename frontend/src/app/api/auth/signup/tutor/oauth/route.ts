import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { insertUser, updateToken } from '../../shared'

export async function POST(req: NextRequest) {
  
  
  try {
    const { email, token, authId } = await req.json()
    
    // console.log(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    
    
    const supabase = await createClient()
  
    // 1. insert the user into the 'users' table
    const isUserCreated = await insertUser(supabase, {
      id: authId, 
      email: email,
      role: 1, // assuming role 1 is for tutors
    })
    if (!isUserCreated) {
      return NextResponse.json({ error: 'Failed to create user in the database' }, { status: 500 })
    }
 
    // 2. update the token table to mark the token as used
    const isTokenUpdated = await updateToken(supabase, { token: token, email: email })
    if (!isTokenUpdated) {
      return NextResponse.json({ error: 'Failed to update token in the database' }, { status: 500 })
    }

    return NextResponse.json({ message: 'process succeeded' }, { status: 200 })
    
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 400 })
  }
  
}
