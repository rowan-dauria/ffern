import { useState } from "react";

export default function Form({ regions, onSubmit} : { regions: string[], onSubmit: (name: string | null, number: string | null, region: string | null) => void }) {
    const [memberRegion, setMemberRegion] = useState<null | string>(null);
    const [memberName, setMemberName] = useState<null | string>(null);
    const [memberNumber, setMemberNumber] = useState<null |string>(null);

    const placeholder = [<option key="placeholder" value="">Select Region</option>]
    const options = placeholder.concat(regions.map(region => <option key={region} value={region}>{region}</option>))

    return (
        <form className="flex flex-col items-center space-y-4">
            <input type="text" placeholder="Name" className="border border-gray-300 p-2 rounded-md" onChange={e => {setMemberName(e.target.value)}}/>
            <input type="text" placeholder="Phone Number" className="border border-gray-300 p-2 rounded-md" onChange={e => {setMemberNumber(e.target.value)}}/>
            <select className="border border-gray-300 p-2 rounded-md" onChange={e => {setMemberRegion(e.target.value)}}>
                {options}
            </select>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => onSubmit(memberName, memberNumber, memberRegion)}>Submit</button>
        </form>
    )
}