export interface Member {
    name: string;
    number: string;
    region: Region;
    id?: memberID;
}

export type Region = 'us' | 'eu' | 'uk';

export type LedgerStatus = boolean | null;

export type memberID = number;