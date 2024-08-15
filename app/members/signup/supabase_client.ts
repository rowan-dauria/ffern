import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

//different clients for different levels of access

export async function authClient() {
  // Create a single supabase client for interacting with your database
  if (!process.env.PUBLIC_SUPABASE_URL || !process.env.PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing env variables for Supabase')
  }
  const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.PUBLIC_SUPABASE_ANON_KEY)

  // i would create different users for customer and team if i had more time
  // should catch the sign in error
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'rowandauria1@gmail.com',
    password: '12345678',
  })

  return supabase
}


export function signUpClient() {
    // Create a single supabase client for interacting with your database
    if (!process.env.PUBLIC_SUPABASE_URL || !process.env.PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Missing env variables for Supabase')
    }
    return createClient(process.env.PUBLIC_SUPABASE_URL, process.env.PUBLIC_SUPABASE_ANON_KEY)
}