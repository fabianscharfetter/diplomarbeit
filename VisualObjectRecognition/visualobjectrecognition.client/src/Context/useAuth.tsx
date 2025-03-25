import React, { createContext, useContext, useState, useEffect } from "react";

export type UserProfileToken = {
    firstname: string;
    secondname: string;
    birthdate: Date;
    email: string;
    phonenbr: string;
    strasse: string;
    hausnummer: string;
    postleitzahl: string;
    stadt: string;
    land: string;
    firma?: string | null;
    token: string;
};

export type UserProfile = {
    firstname: string;
    secondname: string;
    birthdate: Date;
    email: string;
    phonenbr: string;
    strasse: string;
    hausnummer: string;
    postleitzahl: string;
    stadt: string;
    land: string;
    firma?: string | null;
};

type AuthContextType = {
    user: UserProfileToken | null;
    token: string | null;
    login: (userData: UserProfileToken) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<UserProfileToken | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const login = (userData: UserProfileToken) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userData.token);
        setUser(userData);
        setToken(userData.token);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};