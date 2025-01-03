import axios from "axios";

const api = "https://localhost:7228/api/User";

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
        const response = await axios.get(api);
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