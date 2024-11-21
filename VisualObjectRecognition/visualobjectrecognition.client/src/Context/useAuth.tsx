import { createContext, useEffect, useState } from "react"; 
import { UserProfile } from "../Models/User"; 
import { useNavigate } from "react-router-dom"; 
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify"; 
import React from "react";
import axios from "axios"; 

// Typ für den Benutzer-Kontext definieren
type UserContextType = {
    user: UserProfile | null; 
    token: string | null; 
    registerUser: (email: string, firstName: string, lastName: string, password: string) => void; // Funktion zum Registrieren
    loginUser: (email: string, password: string) => void; // Funktion zum Einloggen
    logout: () => void; // Funktion zum Ausloggen
    isLoggedIn: () => boolean; // Überprüfen, ob ein Benutzer angemeldet ist
};

type Props = { children: React.ReactNode }; 

const UserContext = createContext<UserContextType>({} as UserContextType);

// Hauptkomponente für den Benutzer-Provider
export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate(); 
    const [token, setToken] = useState<string | null>(null); 
    const [user, setUser] = useState<UserProfile | null>(null); 
    const [isReady, setIsReady] = useState(false); 

    // Beim ersten Laden prüfen, ob Benutzer- und Token-Daten im lokalen Speicher vorhanden sind
    useEffect(() => {
        const user = localStorage.getItem("user"); 
        const token = localStorage.getItem("token"); 
        if (user && token) {
            setUser(JSON.parse(user)); 
            setToken(token); 
            axios.defaults.headers.common["Authorization"] = "Bearer " + token; 
        }
        setIsReady(true); // Kontext ist jetzt bereit
    }, []);

    // Funktion zum Registrieren
    const registerUser = async (
        email: string,
        firstName: string,
        lastName: string,
        password: string
    ) => {
        await registerAPI(email, firstName, lastName, password) 
            .then((res) => {
                if (res) {
                    localStorage.setItem("token", res?.data.token); 
                    const userObj = {
                        firstName: res?.data.firstName,
                        lastName: res?.data.lastName,
                        email: res?.data.email,
                    };
                    localStorage.setItem("user", JSON.stringify(userObj)); 
                    setToken(res.data.token!); 
                    setUser(userObj!); 
                    toast.success("Login Success!"); 
                    navigate("/search"); 
                }
            })
            .catch(() => toast.warning("Server error occured")); 
    };

    // Funktion zum Einloggen
    const loginUser = async (email: string, password: string) => {
        await loginAPI(email, password) 
            .then((res) => {
                if (res) {
                    localStorage.setItem("token", res?.data.token); 
                    const userObj = {
                        email: res?.data.email,
                    };
                    localStorage.setItem("user", JSON.stringify(userObj)); 
                    setToken(res.data.token!); 
                    setUser(userObj!); 
                    toast.success("Login Success!"); 
                    navigate("/search"); 
                }
            })
            .catch(() => toast.warning("Server error occured")); 
    };

    // Funktion, um zu prüfen, ob ein Benutzer angemeldet ist
    const isLoggedIn = () => {
        return !!user; // Gibt true zurück, wenn ein Benutzer existiert
    };

    // Funktion zum Ausloggen des Benutzers
    const logout = () => {
        localStorage.removeItem("token"); 
        localStorage.removeItem("user"); 
        setUser(null); 
        setToken(""); 
        navigate("/"); 
    };

    // Kontext-Werte bereitstellen
    return (
        <UserContext.Provider
            value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);
