export enum UserRole {
    User = 0,
    Admin = 1,
    Superadmin = 2
}

export type UserProfileToken = {
    firstName: string;
    secondName: string;
    birthdate: Date;
    email: string;
    phoneNbr: string;
    strasse: string;
    hausnummer: string;
    postleitzahl: string;
    stadt: string;
    land: string;
    firma?: string | null;
    token: string;
};

export type UserProfile = {
    firstName: string;
    secondName: string;
    birthdate: Date;
    email: string;
    phoneNbr: string;
    strasse: string;
    hausnummer: string;
    postleitzahl: string;
    stadt: string;
    land: string;
    firma?: string | null;
};
