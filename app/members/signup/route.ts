import { authClient } from "./supabase_client"

export async function POST(request: Request) {
    const { name, number, region } = await request.json()

    const client = await authClient()

    const regions = ['us', 'eu', 'uk', 'fail'] // todo pull from db
    if (!name || !number || !region) {
        return new Response('Missing required fields', { status: 400 })
    }
    if (!regions.includes(region)) {
      return new Response('Invalid region', { status: 400 })
    }

    const { error } = await client.from('members').insert([
      { 
        name,
        phone_number: number,
        region,
      }
    ])
    if (error) {
      console.log(error)
      return new Response('Error creating user', { status: 500 })
    }
    // regex to validate phone number
    return new Response('User created', { status: 201 })
  }