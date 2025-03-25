import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken, UserRole } from "../Models/User";

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

export const getUserRoleById = async (userId: string): Promise<UserRole | null> => {
    try {
        // API Request an den Endpoint getuser/userid
        const response = await axios.get(`${api}/getUser/${userId}`);

        // Überprüfe, ob die Antwort den entsprechenden Daten enthält
        if (response && response.data && response.data.role) {
            return response.data.role; // Gib die Rolle zurück
        } else {
            throw new Error("Role not found");
        }
    } catch (error) {
        console.error("Error fetching user role:", error);
        return null; // Falls ein Fehler auftritt, gebe null zurück
    }
};