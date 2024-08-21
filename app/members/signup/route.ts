import { Member, Region } from "@/app/models/member"
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
    // TODO retrieve user info from db and send back to client
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

    const { data, error: dbMemberError } = await client.from('members').select('id, name, phone_number, region').eq('phone_number', number)
    if (dbMemberError || data === null) {
      console.log(dbMemberError)
      return new Response('Error retrieving user', { status: 500 })
    } 
    const dbData = data[0]

    if (dbData === undefined) {
      return new Response('Inserted user not found', { status: 500 })
    } else if (typeof dbData.id == 'number' && typeof dbData.name == 'string' && typeof dbData.phone_number == 'string' && typeof dbData.region == 'string') {
      const dbMember = {
        id: dbData.id,
        name: dbData.name,
        number: dbData.phone_number,
        region: dbData.region as Region,
      } as Member;
      console.log(dbMember)

      return new Response(JSON.stringify(dbMember), { status: 201 })
    }

    // regex to validate phone number

  }