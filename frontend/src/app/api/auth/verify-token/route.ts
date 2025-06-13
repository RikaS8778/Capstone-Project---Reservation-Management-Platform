import { createClient } from '@/utils/supabase/server'

export async function GET(req: Request) {
  const supabase = await createClient()
  const url = new URL(req.url)
  const token = url.searchParams.get('token')

  const { data, error } = await supabase
    .from('tokens')
    .select('*')
    .eq('token', token)
    .eq('used_at', null)
    .single()

  if (error || !data) {
    return new Response('Invalid token', { status: 400 })
  }

  return new Response('Valid token', { status: 200 })
}
