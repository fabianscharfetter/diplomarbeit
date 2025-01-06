export type UserProfileToken = {
    secondname: string;
    email: string;
    firstname: string;
    birthdate: Date;
    phonenbr: string;
    strasse: string,
    hausnummer: string,
    postleitzahl: string,
    stadt: string,
    land: string,
    firma?: string | null;  // Firma kann null oder undefined sein
    token: string;
};

export type UserProfile = {
    firstname: string;
    secondname: string;
    birthdate: Date;
    email: string;
    phonenbr: string;
    strasse: string,
    hausnummer: string,
    postleitzahl: string,
    stadt: string,
    land: string,
    firma?: string | null;  // Firma kann null oder undefined sein
};
