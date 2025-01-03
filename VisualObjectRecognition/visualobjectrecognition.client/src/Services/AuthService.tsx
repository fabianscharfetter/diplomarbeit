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
    phonenbr: string,
    password: string,
    firma?: string | null  // firma optional oder null

) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "account/register", {
            email: email,
            firstname: firstname,
            secondname: secondname,
            phonenbr: phonenbr,
            password: password,
            firma: firma ?? null, // Wenn firma nicht angegeben wird, null setzen
        });
        return data;
    } catch (error) {
        console.error("Registrierungsfehler:", error); // Debugging: Logge Fehler
        handleError(error);
    }
};
