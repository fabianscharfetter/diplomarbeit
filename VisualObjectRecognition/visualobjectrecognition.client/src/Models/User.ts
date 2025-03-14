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
    firma?: string | null;  // Firma kann null sein
    token: string;
    role: number;  // 🔥 HINZUGEFÜGT
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
    firma?: string | null;  // Firma kann null sein
    role: number;  // 🔥 HINZUGEFÜGT
};
