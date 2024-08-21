import { authClient } from "../signup/supabase_client"

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const idNumber = Number(params.id)

    const client = await authClient()

    const { error } = await client.from('members').delete().eq('id', idNumber)
    if (error) {
        console.log(error)
        return new Response('Error deleting member', { status: 500 })
    }

    return new Response('Member deleted', { status: 200 })
}