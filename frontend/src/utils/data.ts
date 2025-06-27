import { createClient } from '@/utils/supabase/server'
import { DateTime } from 'luxon';

export async function getTotalStudents(tutorId: string): Promise<number | null> {
  const supabase = await createClient()
  const { count, error } = await supabase
    .from('students')
    .select('id', { count: 'exact', head: true })
    .eq('tutor_id', tutorId)

  if (error) {
    console.error('Failed to fetch total students:', error.message)
    return null
  }

  return count ?? 0
}

type LessonWithStudent = {
  id: string
  start_time: string
  student:
  {
    first_name: string
    last_name: string
  }
}

export async function getUpcomingLessons(tutorId: string): Promise<LessonWithStudent[]> {
  const supabase = await createClient()
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('time_zone')
    .eq('id', tutorId)
    .single()

  if (userError || !user) {
    console.error('Failed to fetch time zone:', userError?.message)
    return []
  }

  const nowInUserTZ = DateTime.now().setZone(user.time_zone).toISO();


  const { data, error } = await supabase
  .from('reservations')
  .select('id, start_time, student:users!student_id (first_name, last_name)')
  .eq('tutor_id', tutorId)
  .gte('start_time', nowInUserTZ)
  .order('start_time', { ascending: true }) as {
      data: LessonWithStudent[] | null
      error: any
    }

  if (error || !data) {
    console.error('Failed to fetch upcoming lessons:', error?.message)
    return []
  }

  return data.map(res => ({
    id: res.id,
    start_time: DateTime.fromISO(res.start_time)
      .setZone(nowInUserTZ)
      .toFormat('LLL dd, HH:mm'),
    student: {
      first_name: res.student?.first_name ?? '',
      last_name: res.student?.last_name ?? ''
   }
  }))
}

type PaymentData = {
  amount: number
  ticket_type: {
    tutor_id: string
    tutor_settings: {
      currency: string
      stripe_account_id: string
    }
  }
}[]

export async function getThisMonthRevenue(tutorId: string) {
  const supabase = await createClient()

  // Get tutor's timezone
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('time_zone')
    .eq('id', tutorId)
    .maybeSingle()

  if (userError || !user?.time_zone) {
    console.error('Failed to retrieve user time zone:', userError?.message)
    return { total: 0, currency: 'CAD' }
  }

  const now = DateTime.now().setZone(user.time_zone)
  const startOfMonth = now.startOf('month').toISO()
  const endOfMonth = now.endOf('month').toISO()

  // fetch payments related to this tutor
  const { data, error } = await (supabase
  .from('payments')
  .select(`
    amount,
    ticket_type:ticket_type_id (
      tutor_id,
      tutor_settings:tutor_id (
        currency,
        stripe_account_id
      )
    )
  `)
  .eq('status', 'succeeded') // Only include successful payments
  .gte('created_at', startOfMonth)
  .lte('created_at', endOfMonth)) as unknown as { data: PaymentData, error: any }

if (error) {
  console.error('Failed to fetch revenue:', error)
  return { total: 0, currency: 'USD' }
}

const tutorPayments = data.filter(
  (p) => p.ticket_type?.tutor_id === tutorId
)

const total = tutorPayments.reduce((sum, p) => sum + (p.amount || 0), 0)

const currency =
  tutorPayments[0]?.ticket_type?.tutor_settings?.currency || 'CAD'

const stripe_account_id = tutorPayments[0]?.ticket_type?.tutor_settings?.stripe_account_id || null

return { total, currency,  stripe_account_id}
}
