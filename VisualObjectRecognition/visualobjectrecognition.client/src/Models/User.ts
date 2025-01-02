export type UserProfileToken = {
    secondname: string;
    email: string;
    firstname: string;
    phonenbr: string;
    firma?: string | null;  // Firma kann null oder undefined sein
    token: string;
};

export type UserProfile = {
    firstname: string;
    secondname: string;
    email: string;
    phonenbr: string;
    firma?: string | null;  // Firma kann null oder undefined sein
};
