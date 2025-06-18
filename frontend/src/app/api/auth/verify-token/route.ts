import { createClient } from '@/utils/supabase/server'

export async function GET(req: Request) {
  const supabase = await createClient()
  const url = new URL(req.url)
  const token = url.searchParams.get('token')

  const { data, error } = await supabase
    .from('tokens')
    .select('*')
    .eq('token', token)
    .is('used_at', null)
    .single()

    console.log('token:', token)
    console.log('data:', data)
    console.log('error:', error)

  if (error || !data) {
    return new Response('Invalid token', { status: 400 })
  }

  return new Response('Valid token', { status: 200 })
}
