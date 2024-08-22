import { Member, Region } from "@/app/models/member"
import { insertMember } from "./supabase_client"

export async function POST(request: Request) {
    const { newMember: memberData, password } = await request.json()

    // casting to member does some validation
    const newMember = memberData as Member

    const regions = ['us', 'eu', 'uk', 'fail'] // todo pull from db
    if (!newMember.name || !newMember.number || !newMember.region) {
        return new Response('Missing required fields', { status: 400 })
    }
    console.log('member',newMember)
    const createdMember = await insertMember(newMember, password)
    console.log('createdMember',createdMember)
    return new Response(JSON.stringify(createdMember), { status: 200 })
}