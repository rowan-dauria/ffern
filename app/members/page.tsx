'use client'
import { useState } from "react";

import Form from  "./Form";
import { type } from "os";

async function fetchRegions() {
    const res  = await fetch('/regions')
    if (!res.ok) {
        throw new Error('Error fetching regions')
    }
    const regions = await res.json()
    return regions
}

async function onSubmit(name: string | null, number: string | null, region: string | null) {
    const res = await fetch('/members/signup', {
        method: 'POST',
        body: JSON.stringify({ name, number, region })
    })
    if (!res.ok) {
        throw new Error('Error creating member')
    }
    return res
}

// add some nice documentation here that could be made into a readme
export default function SignUp() {

    const [ regions, setRegions ] = useState<string[]>(['us', 'eu', 'uk'])


    // Would add phone number validation here
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Form regions={regions} onSubmit={onSubmit}/>
        </main>
    )
}