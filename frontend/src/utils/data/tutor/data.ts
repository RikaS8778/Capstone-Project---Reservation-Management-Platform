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
  student: {
    first_name: string
    last_name: string
  }
}

type RawReservation = {
  id: string
  start_at: string
  student: {
    first_name: string | null
    last_name: string | null
  } | null
}

export async function getUpcomingLessons(tutorId: string): Promise<LessonWithStudent[]> {
  const supabase = await createClient()

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('time_zone')
    .eq('id', tutorId)
    .maybeSingle()

  if (userError || !user?.time_zone) {
    console.error('Failed to fetch time zone:', userError?.message)
    return []
  }

  const nowInTZ = DateTime.now().setZone(user.time_zone).toISO()

  const response = await supabase
    .from('reservations')
    .select('id, start_at, student:users!student_id(first_name, last_name)')
    .eq('tutor_id', tutorId)
    .gte('start_at', nowInTZ)
    .order('start_at', { ascending: true })

  const data = response.data as RawReservation[] | null
  const error = response.error

  if (error || !data) {
    console.error('Failed to fetch upcoming lessons:', error?.message)
    return []
  }

  return data.map(res => ({
    id: res.id,
    start_time: DateTime.fromISO(res.start_at).setZone(user.time_zone).toFormat('LLL dd, HH:mm'),
    student: {
      first_name: res.student?.first_name ?? '',
      last_name: res.student?.last_name ?? ''
    }
  }))
}




type PaymentRow = {
  amount: number
  ticket_types: {
    tutor_id: string
  } | null
}

export async function getThisMonthRevenue(tutorId: string) {
  const supabase = await createClient()

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('time_zone')
    .eq('id', tutorId)
    .maybeSingle()

  if (userError || !user?.time_zone) {
    console.error('Failed to retrieve user time zone:', userError?.message)
    return { total: 0, currency: 'CAD', stripe_account_id: null }
  }

  const now = DateTime.now().setZone(user.time_zone)
  const startOfMonth = now.startOf('month').toISO()
  const endOfMonth = now.endOf('month').toISO()

  //update: ticket_type_id → ticket_types（relation）
  const { data: payments, error } = await supabase
    .from('payments')
    .select(`
      amount,
      ticket_types (
        tutor_id
      )
    `)
    .eq('status', 1)
    .gte('created_at', startOfMonth)
    .lte('created_at', endOfMonth) as unknown as {
      data: PaymentRow[] | null
      error: unknown
    }

  if (error || !payments) {
    console.error('Failed to fetch revenue:', error)
    return { total: 0, currency: 'CAD', stripe_account_id: null }
  }

  const tutorPayments = payments.filter(p => p.ticket_types?.tutor_id === tutorId)
  const total = tutorPayments.reduce((sum, p) => sum + (p.amount || 0), 0)

  const { data: settings } = await supabase
    .from('tutor_settings')
    .select('currency, stripe_account_id')
    .eq('tutor_id', tutorId)
    .maybeSingle()

  const currency = settings?.currency || 'CAD'
  const stripe_account_id = settings?.stripe_account_id || null

  return { total, currency, stripe_account_id }
}
