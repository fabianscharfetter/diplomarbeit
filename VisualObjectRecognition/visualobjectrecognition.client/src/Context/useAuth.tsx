import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, firstname: string, secondname: string, birthdate: Date, phonenbr: string, password: string, strasse: string, hausnummer: string, stadt: string, land: string, postleitzahl: string, firma?: string | null) => void;
    loginUser: (email: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, []);

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
        firma?: string | null  // firma ist jetzt optional oder null
    ) => {
        await registerAPI(email, firstname, secondname, birthdate, phonenbr, password, strasse, hausnummer, postleitzahl, stadt, land, firma!)
            .then((res) => {
                if (res) {
                    localStorage.setItem("token", res?.data.token);
                    const userObj = {
                        firstname: res?.data.firstname,
                        secondname: res?.data.secondname,
                        birthdate: res?.data.birthdate,
                        email: res?.data.email,
                        phonenbr: res?.data.phonenbr,
                        strasse: res?.data.strasse,
                        hausnummer: res?.data.hausnummer,
                        postleitzahl: res?.data.postleitzahl,
                        stadt: res?.data.stadt,
                        land: res?.data.land,
                        firma: res?.data.firma ?? null  // Firma wird als null gesetzt, wenn nicht vorhanden
                    };
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(res?.data.token!);
                    setUser(userObj!);
                    toast.success("Registrierung war erfolgreich!");
                    navigate("/account");
                }
            })
            .catch(() => toast.warning("Server-Error aufgetreten!"));
    };

    const loginUser = async (email: string, password: string) => {
        await loginAPI(email, password)
            .then((res) => {
                if (res) {
                    localStorage.setItem("token", res?.data.token);
                    const userObj = {
                        firstname: res?.data.firstname,
                        secondname: res?.data.secondname,
                        birthdate: res?.data.birthdate,
                        email: res?.data.email,
                        phonenbr: res?.data.phonenbr,
                        strasse: res?.data.strasse,
                        hausnummer: res?.data.hausnummer,
                        postleitzahl: res?.data.postleitzahl,
                        stadt: res?.data.stadt,
                        land: res?.data.land,
                        firma: res?.data.firma ?? null  // Firma wird als null gesetzt, wenn nicht vorhanden
                    };
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(res?.data.token!);
                    setUser(userObj!);
                    toast.success("Anmeldung war erfolgreich!");
                    navigate("/account");
                }
            })
            .catch(() => toast.warning("Server-Error aufgetreten!"));
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    };

    return (
        <UserContext.Provider
            value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);
