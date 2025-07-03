'use server'

import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  name: z.string().min(1, 'Name is required').regex(/^[a-zA-Z0-9\- ]+$/, 'Only letters, numbers, hyphens, and spaces are allowed'),
  type: z.enum(['1', '2']), // one-time, monthly
  quantities: z.string().refine((v) => Number(v) > 0, 'Quantity must be positive'),
  price: z.string().refine((v) => Number(v) >= 0, 'Price must be 0 or more'),
  lesson_duration: z.string().refine((v) => Number(v) > 0, 'Duration must be positive'),
  visibility: z.enum(['1', '2']),
})

export async function createTicketType(form: any) {
  const result = schema.safeParse(form)
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if(!user) {
    return { success: false, errors: { _form: ['User not authenticated'] } }    
  }
  
  const { error } = await supabase.from('ticket_types').insert([
    {
      tutor_id: user.id,
      name: result.data.name,
      type: Number(result.data.type),
      quantities: Number(result.data.quantities),
      price: Number(result.data.price),
      lesson_duration: Number(result.data.lesson_duration),
      visibility: Number(result.data.visibility),
    },
  ])

  if (error) {
    return {
      success: false,
      errors: { _form: [error.message] },
    }
  }

  revalidatePath('/tutor/dashboard/ticket-types')
  return { success: true }
}

