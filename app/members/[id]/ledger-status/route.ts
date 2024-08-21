import { authClient } from '../../signup/supabase_client'


export async function GET(
    request: Request,
    { params }: { params: { id: string }}
) {
    console.log(params)
    const idNumber = Number(params.id)
    if (isNaN(idNumber)) {
        return new Response('Invalid ID', { status: 400 })
    }
    // TODO stop instantiating a new client for each request
    const client = await authClient();

    const { data, error } = await client.from('ledger').select('*').eq('member_id', idNumber)

    if (error) {
        return new Response('Error fetching ledger status', { status: 500 })
    }
    if (data[0] === undefined) {
        return new Response(JSON.stringify(false), { status: 200 })
    }

    return new Response(JSON.stringify(true), { status: 200 })
}