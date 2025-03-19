export type UserProfileToken = {
    firstname: string;
    secondname: string;
    birthdate: Date;
    email: string;
    phonenbr: string;
    strasse: string;
    hausnummer: string;
    postleitzahl: string;
    stadt: string;
    land: string;
    role: number;
    firma?: string | null;  // Firma kann null sein
    token: string;
};

export type UserProfile = {
    firstname: string;
    secondname: string;
    birthdate: Date;
    email: string;
    phonenbr: string;
    strasse: string;
    hausnummer: string;
    postleitzahl: string;
    stadt: string;
    land: string;
    role: number;
    firma?: string | null;  // Firma kann null sein
};
