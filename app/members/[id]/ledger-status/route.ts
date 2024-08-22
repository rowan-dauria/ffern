import { authClient, inLedger } from '../../signup/supabase_client'


export async function GET(
    request: Request,
    { params }: { params: { id: string }}
) {
    const idNumber = Number(params.id)
    if (isNaN(idNumber)) {
        return new Response('Invalid ID', { status: 400 })
    }
    if (await inLedger(idNumber)) {
        return new Response(JSON.stringify(true), { status: 200 })
    }

    return new Response(JSON.stringify(false), { status: 200 })
}