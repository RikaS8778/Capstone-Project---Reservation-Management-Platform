import { createClient } from '@/utils/supabase/server'

export async function GET(req: Request) {
  const supabase = await createClient()
  const url = new URL(req.url)
  const publicId = url.searchParams.get('public_id')

  const { data, error } = await supabase
    .from('tutor_settings')
    .select('*')
    .eq('public_id', publicId)
    .is('deleted_at', null)
    .single()

    console.log('public_id:', publicId)
    console.log('data:', data)
    console.log('error:', error)

  if (error || !data) {
    return new Response('Public_id not found.', { status: 400 })
  }

  return new Response('Public_id founded.', { status: 200})
}
