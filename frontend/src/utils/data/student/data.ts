// data/student/dashboard.ts
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { DateTime } from 'luxon'

type StudentDashboardData = {
  tutorName: string
  tutorMessage: string | null
  tutorPictureUrl: string | null
}

type TutorWithUser = {
  message: string
  picture_path: string | null
  users: {
    first_name: string
    last_name: string
  }
}

export async function getStudentDashboardData(): Promise<StudentDashboardData | null> {
  const supabase = await createClient()

  // get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

//   if (!user) return null
  if (!user) throw new Error('User not found')

  // get tutor_id from users table
  const { data: student } = await supabase
    .from('users')
    .select('tutor_id')
    .eq('id', user.id)
    .maybeSingle()

  const tutorId = student?.tutor_id
  if (!student?.tutor_id) throw new Error('Tutor ID not found for student')
//   if (!tutorId) return null

  // get tutor settings from tutor_settings table
  const { data } = await supabase
    .from('tutor_settings')
    .select(`
        message,
        picture_path,
        users(first_name, last_name)
    `)
    .eq('tutor_id', tutorId)
    .single()

  const tutor = data as TutorWithUser | null
  if (!tutor) throw new Error('Tutor data not found')
//   if (!tutor) return null

  // get strage URL for tutor picture
  const { data: file } = supabase.storage.from('schedulia-strage').getPublicUrl(tutor.picture_path || '')

  const fullName = tutor.users
    ? `${tutor.users.first_name} ${tutor.users.last_name}`
    : 'Unknown Tutor'

  return {
    tutorName: fullName,
    tutorMessage: tutor.message,
    tutorPictureUrl: tutor.picture_path ? file.publicUrl : null,
  }
}

//for student dashboard>ticket card
export type StudentTicket = {
  ticket_type_name: string
  lesson_duration: number
  remaining_count: number
  expire_at: string | null
}

type TicketTypeInfo = {
  name: string
  lesson_duration: number
}

type RawTicket = {
  id: string
  expire_at: string | null
  is_used: boolean | null
  ticket_type: TicketTypeInfo | null
}

export async function getStudentTickets(studentId: string): Promise<StudentTicket[] | null> {
  const supabase = createAdminClient()

  const response = await supabase
    .from('tickets')
    .select(`
      id,
      expire_at,
      is_used,
      ticket_type:ticket_type_id (
        name,
        lesson_duration
      )
    `)
    .eq('student_id', studentId)
    .is('deleted_at', null)

  const data = response.data as unknown as RawTicket[]
  const error = response.error

  if (error || !data) {
    console.error('Failed to fetch tickets:', error)
    return null
  }

  const grouped = data.reduce((acc, ticket) => {
    const type = ticket.ticket_type
    if (!type || typeof type.name !== 'string') return acc

    const key = `${type.name}-${type.lesson_duration}`

    if (!acc[key]) {
      acc[key] = {
        ticket_type_name: type.name,
        lesson_duration: type.lesson_duration,
        remaining_count: 0,
        expire_at: ticket.expire_at ?? null,
      }
    }

    if (ticket.is_used === false) {
      acc[key].remaining_count += 1
    }

    return acc
  }, {} as Record<string, StudentTicket>)

  return Object.values(grouped)
}

// for student dashboard>upcoming lessons card
type StudentLesson = {
  id: string
  start_at: string // already converted to local time
  tutor: {
    first_name: string
    last_name: string
  }
}

type ReservationWithTutor = {
  id: string
  start_at: string
  tutor: {
    first_name: string | null
    last_name: string | null
  } | null
}

export async function getUpcomingStudentLessons(studentId: string): Promise<StudentLesson[] | null> {
  const supabase = createAdminClient()

  // Get student's timezone
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('time_zone')
    .eq('id', studentId)
    .single()

  if (userError || !user?.time_zone) {
    console.error('Failed to fetch user time_zone:', userError)
    return null
  }

  // get current time in user's timezone
  const nowLocalTime = DateTime.now().setZone(user.time_zone).toISO()

  // date conversion is done in the query, so we can use timestamptz directly
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      id,
      start_at,
      tutor:users!tutor_id (
        first_name,
        last_name
      )
    `)
    .eq('student_id', studentId)
    .eq('status', 1) // confirmed only
    .gte('start_at', nowLocalTime) // this works since start_at is timestamptz
    .order('start_at', { ascending: true })

  if (error || !data) {
    console.error('Failed to fetch reservations:', error)
    return null
  }

  // change start_at to local time
  const converted = (data as ReservationWithTutor[]).map((res) => ({
    id: res.id,
    start_at: DateTime.fromISO(res.start_at).setZone(user.time_zone).toFormat('LLL dd, HH:mm'),
    tutor: {
        first_name: res.tutor?.first_name ?? '',
        last_name: res.tutor?.last_name ?? '',
    },
  }))

  return converted
}



// for student dashboard>ticket purchase card
export type PurchasableTicketType = {
  id: string
  name: string
  type: 'monthly' | 'onetime'
  lesson_duration: number
  lesson_quantity: number
  price: number
  currency: string
}

type TicketTypeRow = {
  id: string
  name: string
  type: number
  lesson_duration: number
  quantities: number
  price: number
}

export async function getPurchasableTicketTypes(studentId: string): Promise<PurchasableTicketType[]> {
  const supabase = await createClient()

  // Step 0: Get tutor_id from users table
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('tutor_id')
    .eq('id', studentId)
    .single()

  if (userError || !user?.tutor_id) {
    console.error('Failed to fetch tutor_id:', userError?.message)
    return []
  }

  // Step 0.1: Get currency from tutor_settings
  const { data: setting, error: settingError } = await supabase
    .from('tutor_settings')
    .select('currency')
    .eq('tutor_id', user.tutor_id)
    .single()

  if (settingError || !setting?.currency) {
    console.error('Failed to fetch tutor_settings:', settingError?.message)
    return []
  }

  const tutorCurrency = setting.currency

  // Step 1: Get public tickets (visibility = 1)
  const { data: publicTickets, error: publicError } = await supabase
    .from('ticket_types')
    .select('id, name, type, lesson_duration, quantities, price')
    .eq('tutor_id', user.tutor_id)
    .eq('is_deleted', false)
    .eq('visibility', 1)

  if (publicError) {
    console.error('Failed to fetch public tickets:', publicError.message)
    return []
  }

  // Step 2: Get allowed ticket IDs from intermediate table (visibility = 2)
  const { data: allowedIds, error: idError } = await supabase
    .from('ticket_type_visible_students')
    .select('ticket_type_id')
    .eq('student_id', studentId)

  if (idError) {
    console.error('Failed to fetch visible ticket ids:', idError.message)
    return []
  }

  const visibleIds = allowedIds?.map(item => item.ticket_type_id) || []

  // Step 3: Get private tickets if any
  let privateTickets: TicketTypeRow[] = []

  if (visibleIds.length > 0) {
    const { data: privateData, error: privateError } = await supabase
      .from('ticket_types')
      .select('id, name, type, lesson_duration, quantities, price')
      .eq('tutor_id', user.tutor_id)
      .eq('is_deleted', false)
      .eq('visibility', 2)
      .in('id', visibleIds)

    if (privateError) {
      console.error('Failed to fetch private tickets:', privateError.message)
    } else {
      privateTickets = privateData || []
    }
  }

  const allTickets: TicketTypeRow[] = [...(publicTickets || []), ...privateTickets]

  return allTickets.map((ticket): PurchasableTicketType => ({
    id: ticket.id,
    name: ticket.name,
    type: ticket.type === 1 ? 'onetime' : 'monthly',
    lesson_duration: ticket.lesson_duration,
    lesson_quantity: ticket.quantities,
    price: ticket.price,
    currency: tutorCurrency,
  }))
}