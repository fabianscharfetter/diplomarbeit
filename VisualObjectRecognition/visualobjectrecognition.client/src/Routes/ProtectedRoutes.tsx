import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/useAuth";
import { fetchUserByEmail } from "../Services/UserService";

type Props = {
    children: React.ReactNode;
    adminOnly?: boolean;
    nonAdminOnly?: boolean;
};

const ProtectedRoute = ({ children, adminOnly = false, nonAdminOnly = false }: Props) => {
    const location = useLocation();
    const { isLoggedIn, user } = useAuth();
    const [fetchedUser, setFetchedUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getUser = async () => {
            if (user?.email) {
                try {
                    const result = await fetchUserByEmail(user.email);
                    setFetchedUser(result);
                } catch (err) {
                    console.error("Fehler beim Laden des Benutzers:", err);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        getUser();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isLoggedIn()) {
        return <Navigate to="/account/login" state={{ from: location }} replace />;
    }

    const isAdmin = fetchedUser?.role > 0;

    if (adminOnly && !isAdmin) {
        return <Navigate to="/account/login" state={{ from: location }} replace />;
    }

    if (nonAdminOnly && isAdmin) {
        return <Navigate to="/account/Admin" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default React.memo(ProtectedRoute);
