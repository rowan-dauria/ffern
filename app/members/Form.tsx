import { useState } from "react";
import { Region } from "../models/member";

export default function Form({
    regions,
    onSubmitCallback,
    setMemberRegionCallback,
    setMemberNameCallback,
    setMemberNumberCallback,
    memberName,
    memberNumber,
    memberRegion
} : 
{
    regions: string[],
    onSubmitCallback: (name: string | null, number: string | null, region: string | null) => void,
    setMemberRegionCallback: (region: string | null) => void,
    setMemberNameCallback: (name: string | null) => void,
    setMemberNumberCallback: (number: string | null) => void
    memberName: string | null,
    memberNumber: string | null,
    memberRegion: string | null
}) {

    const placeholder = [<option key="placeholder" value="">Select Region</option>]
    const options = placeholder.concat(regions.map(region => <option key={region} value={region}>{region}</option>))

    return (
        <form className="flex flex-col items-center space-y-4">
            <input type="text" placeholder="Name" className="border border-gray-300 p-2 rounded-md" onChange={e => {setMemberNameCallback(e.target.value)}}/>
            <input type="text" placeholder="Phone Number" className="border border-gray-300 p-2 rounded-md" onChange={e => {setMemberNumberCallback(e.target.value as Region)}}/>
            <select className="border border-gray-300 p-2 rounded-md" onChange={e => {setMemberRegionCallback(e.target.value)}}>
                {options}
            </select>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={(e) => {
                // prevent page refresh
                e.preventDefault()
                onSubmitCallback(memberName, memberNumber, memberRegion)
            }}>Submit</button>
        </form>
    )
}