import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => req.cookies.getAll() } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })

  const { data: userInfo } = await supabase.from('users').select('*').eq('id', user.id).maybeSingle()
  let tutor_setting_exists = false
  let ts: { id: number; currency: string } | null = null
  if (userInfo?.role === 1) {
    const { data } = await supabase.from('tutor_setting').select('id, currency').eq('tutor_id', userInfo.id).maybeSingle()
    ts = data
    tutor_setting_exists = !!ts
  }
  return NextResponse.json({ ...userInfo, tutor_setting_exists, currency: ts?.currency ?? 'CAD' })
}