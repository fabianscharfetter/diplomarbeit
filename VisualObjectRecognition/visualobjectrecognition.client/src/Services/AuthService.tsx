import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "https://localhost:7228/api/";

export const loginAPI = async (email: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "account/login", {
            email: email,
            password: password,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const registerAPI = async (
    email: string,
    firstname: string,
    secondname: string,
    birthdate: Date,
    phonenbr: string,
    password: string,
    strasse: string,
    hausnummer: string,
    postleitzahl: string,
    stadt: string,
    land: string,
    firma?: string | null
) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "account/register", {
            email: email,
            firstname: firstname,
            secondname: secondname,
            birthdate: birthdate.toISOString().split("T")[0],
            phonenbr: phonenbr,
            password: password,
            strasse: strasse,
            hausnummer: hausnummer,
            postleitzahl: postleitzahl,
            stadt: stadt,
            land: land,
            firma: firma ?? null
        });
        return data;
    } catch (error) {
        console.error("Registrierungsfehler:", error);
        handleError(error);
    }
};

export const getUserRoleById = async (email: string | null): Promise<any | null> => {
    if (!email) {
        return null;
    }

    try {
        const response = await axios.get(`${api}User`);
        const users = response.data;

        if (Array.isArray(users)) {
            const foundUser = users.find((user: any) => user.email === email);
            return foundUser?.role !== undefined ? foundUser.role : null;
        } else {
            console.warn("Ungültige Datenstruktur von der API erhalten.");
            return null;
        }
    } catch (err) {
        console.error("Fehler beim Abrufen der Benutzerdaten:", err);
        return null;
    }
};

