import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "https://localhost:7228/api/";

export const loginAPI = async (email: string, password: string) => {
    try {
        const response = await axios.post<{ data: UserProfileToken }>(api + "account/login", {
            email: email,
            password: password,
        });
        return response.data; // Hier geben wir nur die 'data' zurück
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
    firma?: string | null  // firma optional oder null
) => {
    try {
        const response = await axios.post<{ data: UserProfileToken }>(api + "account/register", {
            email: email,
            firstname: firstname,
            secondname: secondname,
            birthdate: birthdate.toISOString().split("T")[0], // Nur das Datum im Format YYYY-MM-DD,
            phonenbr: phonenbr,
            password: password,
            strasse: strasse,
            hausnummer: hausnummer,
            postleitzahl: postleitzahl,
            stadt: stadt,
            land: land,
            firma: firma ?? null, // Wenn firma nicht angegeben wird, null setzen
        });
        return response.data; // Hier geben wir nur die 'data' zurück
    } catch (error) {
        console.error("Registrierungsfehler:", error); // Debugging: Logge Fehler
        handleError(error);
    }
};