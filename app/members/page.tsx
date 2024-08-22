'use client'
import { useState } from "react";

import Form from  "./Form";
import { Member, Region, LedgerStatus, memberID } from "../models/member";
import LandingPage from "./LandingPage";

async function fetchRegions() {
    const res  = await fetch('/regions')
    if (!res.ok) {
        throw new Error('Error fetching regions')
    }
    const regions = await res.json()
    return regions
}

async function deleteMember(id: memberID) {
    const res = await fetch(`/members/${id}`, {
        method: 'DELETE'
    })
    if (!res.ok) {
        throw new Error('Error deleting member')
    }
    return res
}


async function fetchLedgerStatus(id: memberID): Promise<LedgerStatus> {
    const res = await fetch(`/members/${id}/ledger-status`)
    if (!res.ok) {
        throw new Error('Error fetching ledger status')
    }
    const ledgerStatus = await res.json()
    console.log(ledgerStatus)
    return ledgerStatus
}


async function submit(newMember: Member, password: string): Promise<Response> {
    const res = await fetch('/members/signup', {
        method: 'POST',
        body: JSON.stringify({ newMember, password })
    })
    if (!res.ok) {
        throw new Error('Error creating member')
    }
    return res
}

// add some nice documentation here that could be made into a readme
export default function SignUp() {

    const [ regions ] = useState<string[]>(['us', 'eu', 'uk'])
    const [ member, setMember ] = useState<Member | null>(null)
    const [ledgerStatus, setLedgerStatus] = useState<LedgerStatus>(null)

    const [memberRegion, setMemberRegion] = useState<null | string>(null);
    const [memberName, setMemberName] = useState<null | string>(null);
    const [memberNumber, setMemberNumber] = useState<null | string>(null);
    const [memberPassword, setMemberPassword] = useState<null | string>(null);

    async function validateAndSubmit(
        name: string | null,
        number: string | null,
        region: string | null,
        password: string | null)
        : Promise<void> {
        if (name === null || number === null || region === null || password === null) {
            alert('Please fill out all fields')
            return
        }
        // Validate region here with type assertion
        const newRegion = region as Region
        const newMember: Member = {
            name,
            number,
            region: newRegion,
        };
        const response = await submit(newMember, password) as Response

        if (response.ok) {
            response.json().then((data) => {
                // validate response data here
                const createdName = data.name as string
                const createdNumber = data.number as string
                const createdRegion = data.region as Region
                const createdId = data.id as memberID

                setMember({
                    name: createdName,
                    number: createdNumber,
                    region: createdRegion,
                    id: createdId,
                } as Member)

                setMemberName(null)
                setMemberNumber(null)
                setMemberRegion(null)
            })
        } else {
            alert('Error creating member')
            throw new Error('Error creating member')
        }
    }

    function optOut() {
        if (member && member.id && typeof member.id == 'number') {
            deleteMember(member.id).then(() => {
                setMember(null)
            })
        }
    }

    if (member && typeof member.id == 'number' && ledgerStatus == null) {
        fetchLedgerStatus(member.id).then((status) => {
            if (typeof status == 'boolean') {
                setLedgerStatus(status)
            }
        })
    }

    // Would add phone number validation here
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            { member ?
                <LandingPage
                    ledgerStatus={ledgerStatus}
                    handleOptOut={optOut}
                />
                : <Form 
                    regions={regions}
                    onSubmitCallback={validateAndSubmit}
                    setMemberNameCallback={setMemberName}
                    setMemberNumberCallback={setMemberNumber}
                    setMemberRegionCallback={setMemberRegion}
                    setMemberPasswordCallback={setMemberPassword}
                    memberName={memberName}
                    memberNumber={memberNumber}
                    memberRegion={memberRegion}
                    memberPassword={memberPassword}
                />
            }
                
        </main>
    )
}