import { createContext, useEffect, useState } from "react";
import { UserProfile, UserRole } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI, getUserRoleById } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    userRole: UserRole | null;
    registerUser: (
        email: string,
        firstname: string,
        secondname: string,
        birthdate: Date,
        phonenbr: string,
        password: string,
        strasse: string,
        hausnummer: string,
        stadt: string,
        land: string,
        postleitzahl: string,
        firma?: string | null
    ) => void;
    loginUser: (email: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
    fetchUserRole: () => void;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [isReady, setIsReady] = useState(false);

    // Verwende useEffect um den User und Token aus dem localStorage zu holen
    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (user && token) {
            try {
                setUser(JSON.parse(user)); // Versuch das JSON zu parsen
                setToken(token);
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            } catch (error) {
                console.error("Fehler beim Parsen des Benutzers aus dem localStorage:", error);
            }
        }

        setIsReady(true);
    }, []);

    // Hole die UserRole immer vom Server
    const fetchUserRole = async () => {
        if (user?.email) {
            try {
                const role = await getUserRoleById(user.email);
                setUserRole(role);
            } catch (error) {
                console.error("Fehler beim Abrufen der Benutzerrolle:", error);
            }
        }
    };

    // Wenn der User eingeloggt ist, aber keine Rolle im State gesetzt ist, wird die Rolle vom Server abgefragt.
    useEffect(() => {
        if (user && !userRole) {
            fetchUserRole();
        }
    }, [user, userRole]); // Wenn sich der Benutzer oder die Rolle ändert, wird der Effekt erneut ausgeführt

    const registerUser = async (
        email: string,
        firstName: string,
        secondName: string,
        birthdate: Date,
        phoneNbr: string,
        password: string,
        strasse: string,
        hausnummer: string,
        postleitzahl: string,
        stadt: string,
        land: string,
        firma?: string | null
    ) => {
        await registerAPI(email, firstName, secondName, birthdate, phoneNbr, password, strasse, hausnummer, postleitzahl, stadt, land, firma!)
            .then((res) => {
                if (res) {
                    localStorage.setItem("token", res?.data.token);
                    localStorage.setItem("user", JSON.stringify(res?.data));
                    setToken(res?.data.token);
                    setUser(res?.data);
                    fetchUserRole(); // Nutzerrolle nach dem Registrieren abrufen
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
                    localStorage.setItem("user", JSON.stringify(res?.data));
                    setToken(res?.data.token);
                    setUser(res?.data);
                    fetchUserRole(); // Nutzerrolle nach dem Anmelden abrufen
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
        setToken(null);
        setUserRole(null);
        navigate("/");
    };

    return (
        <UserContext.Provider
            value={{
                loginUser,
                user,
                token,
                logout,
                isLoggedIn,
                registerUser,
                userRole,
                fetchUserRole
            }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);
