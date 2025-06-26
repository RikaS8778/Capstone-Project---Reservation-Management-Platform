import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { updateUserProfile, insertTutorSetting } from '../shared'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
  }

  const formData = await req.formData()
  const first_name = formData.get('first_name')?.toString() || ''
  const last_name = formData.get('last_name')?.toString() || ''
  const time_zone = formData.get('timezone')?.toString() || ''
  const public_id = formData.get('publicId')?.toString() || ''
  const booking_deadline = parseInt(formData.get('bookingDeadline') as string) || 0
  const booking_unit = parseInt(formData.get('bookingUnit') as string) || 15
  const currency = formData.get('currency')?.toString() || 'JPY' //or 'CAD'
  const message = formData.get('discription')?.toString() || ''
  const file = formData.get('file') as File | null

  let picture_path: string | undefined = undefined

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${user.id}/${Date.now()}_${file.name}`;

    console.log('Uploading file:', filename, file.type, file.size)

    const { data, error } = await supabase.storage
      .from('schedulia-strage')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true,
      })

    if (error) {
      console.error('Upload error:', error.message)
      return NextResponse.json (
        { error: `Upload failed: ${error.message}` },
        { status: 400 }
      )
    } else {
      picture_path = data?.path
    }
  }

  try {
    await updateUserProfile(supabase, {
      id: user.id,
      first_name,
      last_name,
      time_zone,
    });
  } catch (error: any) {
    return NextResponse.json({ error: `Profile update failed: ${error.message}` }, { status: 400 });
  }

  try {
    await insertTutorSetting(supabase, {
      tutor_id: user.id,
      public_id,
      booking_deadline,
      booking_unit,
      currency,
      message,
      picture_path,
    });
  } catch (error: any) {
    return NextResponse.json({ error: `Tutor settings registration failed: ${error.message}` }, { status: 400 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
