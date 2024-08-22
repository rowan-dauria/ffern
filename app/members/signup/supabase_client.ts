import { Member, Region } from '@/app/models/member'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const saltRounds = 10

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

  if (error) {
    console.error(error)
    throw new Error('Error signing in DB client')
  }

  return supabase
}


export function signUpClient() {
    // Create a single supabase client for interacting with your database
    if (!process.env.PUBLIC_SUPABASE_URL || !process.env.PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Missing env variables for Supabase')
    }
    return createClient(process.env.PUBLIC_SUPABASE_URL, process.env.PUBLIC_SUPABASE_ANON_KEY)
}

export async function insertMember(member: Member, password: string) {

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const client = await authClient()

  // todo check if member with phone number already exists

  const { error } = await client.from('members').insert([
    { 
      name: member.name,
      phone_number: member.number,
      region: member.region,
      password: hash, // This needs to be hashed
    }
  ])

  if (error) {
    console.error(error)
    throw new Error('Error creating user')
  }

  const { data, error: dbMemberError } =await client.from('members')
  .select('id, name, phone_number, region')
  .eq('phone_number', member.number)

  if (dbMemberError || data === null) {
    throw new Error('Error retrieving user')
  }

  const dbData = data[0]

  if (dbData === undefined) {
    throw new Error('Inserted user not found')
  } else if (typeof dbData.id == 'number' && typeof dbData.name == 'string' && typeof dbData.phone_number == 'string' && typeof dbData.region == 'string') {
    return {
      id: dbData.id,
      name: dbData.name,
      number: dbData.phone_number,
      region: dbData.region as Region,
    } as Member;
  }
}

export async function inLedger(id: Number) : Promise<boolean> {
      // TODO stop instantiating a new client for each request
      const client = await authClient();

      const { data, error } = await client.from('ledger').select('*').eq('member_id', id)
  
      if (error) {
          console.error(error)
          throw new Error('Error fetching ledger status')
      }
      if (data[0] === undefined) {
        return false
      }
      return true
}