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
    role: number,
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
            role: role,
            firma: firma ?? null
        });
        return data;
    } catch (error) {
        console.error("Registrierungsfehler:", error);
        handleError(error);
    }
};
