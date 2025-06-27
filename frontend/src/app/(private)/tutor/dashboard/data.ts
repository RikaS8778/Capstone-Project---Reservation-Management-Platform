import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from "@/utils/supabase/admin"

export async function getUserInfo() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { user: null }

  const { data: userInfo, error } = await supabase
    .from('users')
    .select('first_name, last_name, role')
    .eq('id', user.id)
    .maybeSingle()

  return { user, userInfo, error }
}
