import { LedgerStatus } from "../models/member";

export default function LandingPage(
    {
        ledgerStatus,
        handleOptOut
    } : {
        ledgerStatus: LedgerStatus,
        handleOptOut: () => void
    }) {

    function displayLedgerStatus() {
        if (ledgerStatus === null) {
            return <p className="text-lg">Loading...</p>
        } else if (ledgerStatus === true) {
            return <p className="text-lg">You are on the ledger</p>
        } else {
            return <p className="text-lg">You are not on the ledger</p>
        }
    }
    return (
        <div className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-bold">Welcome to the Members Page</h1>
            {displayLedgerStatus()}
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleOptOut()}>Opt Out</button>
        </div>
    )
}