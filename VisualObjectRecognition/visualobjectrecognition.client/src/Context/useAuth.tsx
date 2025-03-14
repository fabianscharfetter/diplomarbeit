import { createContext, useEffect, useState } from "react";
import { UserProfileToken } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserContextType = {
    user: UserProfileToken | null;
    isAdmin: boolean;
    token: string | null;
    registerUser: (
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
    ) => void;
    loginUser: (email: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfileToken | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);  // Admin-Status im Context speichern
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const loadUserFromStorage = async () => {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("token");

            if (storedUser && storedToken) {
                const parsedUser = JSON.parse(storedUser) as UserProfileToken;
                setUser(parsedUser);
                setToken(storedToken);
                axios.defaults.headers.common["Authorization"] = "Bearer " + storedToken;

                // Admin-Status aus dem User-Objekt ermitteln
                const role = parsedUser.role || 0;
                setIsAdmin(role > 0);  // Admin hat Role > 0
                localStorage.setItem("isAdmin", JSON.stringify(role > 0));  // Admin-Status im localStorage speichern
            }
            setIsReady(true);  // Fertig mit dem Laden
        };

        loadUserFromStorage();
    }, []);  // Diese Funktion läuft nur beim ersten Rendern

    const registerUser = async (
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
            const res = await registerAPI(
                email,
                firstname,
                secondname,
                birthdate,
                phonenbr,
                password,
                strasse,
                hausnummer,
                postleitzahl,
                stadt,
                land,
                firma
            );

            if (res) {
                const { data } = res;
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data));
                setToken(data.token);
                setUser(data);

                // Admin-Status setzen
                const role = data.role || 0;
                setIsAdmin(role > 0);  // Admin-Überprüfung (Role > 0)
                localStorage.setItem("isAdmin", JSON.stringify(role > 0));  // Admin-Status im localStorage speichern

                toast.success("Registrierung war erfolgreich!");
                navigate("/account");
            }
        } catch (error) {
            toast.warning("Registrierung fehlgeschlagen! Bitte versuchen Sie es später erneut.");
            console.error("Error during registration:", error);
        }
    };

    const loginUser = async (email: string, password: string) => {
        try {
            const res = await loginAPI(email, password);

            if (res) {
                const { data } = res;
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data));
                setToken(data.token);
                setUser(data);

                // Admin-Status setzen
                const role = data.role || 0;
                setIsAdmin(role > 0);  // Admin-Überprüfung (Role > 0)
                localStorage.setItem("isAdmin", JSON.stringify(role > 0));  // Admin-Status im localStorage speichern

                toast.success("Anmeldung war erfolgreich!");
                navigate("/account");
            }
        } catch (error) {
            toast.warning("Anmeldung fehlgeschlagen! Bitte überprüfen Sie Ihre Anmeldedaten.");
            console.error("Error during login:", error);
        }
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isAdmin");
        setUser(null);
        setToken(null);
        setIsAdmin(false);
        navigate("/");
    };

    return (
        <UserContext.Provider
            value={{
                loginUser,
                registerUser,
                user,
                isAdmin,
                token,
                logout,
                isLoggedIn,
            }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);
