import axios from "axios";

const apiUser = "https://localhost:7228/api/User";
const apiStorage = "https://localhost:7228/api/Storage";

/**
 * Fetches a user by email from the API.
 * @param email The email of the user to fetch. Can be null to fetch no user.
 * @returns A promise that resolves to the user object or null if not found or email is null.
 */

export const fetchUserByEmail = async (email: string | null): Promise<any | null> => {
    if (!email) {
        return null; // Return null immediately if email is null.
    }

    try {
        const response = await axios.get(apiUser);
        const users = response.data;

        if (Array.isArray(users)) {
            const foundUser = users.find((user: any) => user.email === email);
            return foundUser || null;
        } else {
            throw new Error("Ungültige Datenstruktur von der API erhalten.");
        }
    } catch (err) {
        throw new Error(`Fehler beim Abrufen der Benutzerdaten: ${err}`);
    }
};

export const getAllUsers = async (): Promise<any | null> => {
    try {
        const response = await axios.get(apiUser);
        const users = response.data;

        if (Array.isArray(users)) {
            return users || null;
        } else {
            throw new Error("Ungültige Datenstruktur von der API erhalten.");
        }
    } catch (err) {
        throw new Error(`Fehler beim Abrufen der Benutzerdaten: ${err}`);
    }
};

export const getInventoryItems = async (): Promise<any[] | null> => {
    try {
        const response = await axios.get(apiStorage);
        const items = response.data;

        if (Array.isArray(items)) {
            return items; // Keine zusätzliche Prüfung nötig
        } else {
            throw new Error("Ungültige Datenstruktur von der API erhalten.");
        }
    } catch (err) {
        throw new Error(`Fehler beim Abrufen der Inventarliste: ${err}`);
    }
};
