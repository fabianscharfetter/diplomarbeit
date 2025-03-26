import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

type Props = {
    children: React.ReactNode;
    adminOnly?: boolean;
    nonAdminOnly?: boolean;
    loadingImage?: string; // Option, um ein benutzerdefiniertes Bild zu übergeben
};

const ProtectedRoute = ({
    children,
    adminOnly = false,
    nonAdminOnly = false,
    loadingImage = "/astronaut.png", // Hier kann ein benutzerdefiniertes Bild übergeben werden
}: Props) => {
    const location = useLocation();
    const { isLoggedIn, userRole, fetchUserRole } = useAuth();
    const [loading, setLoading] = useState<boolean>(userRole === null); // Initialisiert abhängig von userRole
    const [loadingText, setLoadingText] = useState<string>("Loading"); // Text mit Punkten

    useEffect(() => {
        if (userRole === null) {
            // Setzt ein Polling, bis die Rolle verfügbar ist
            const intervalId = setInterval(() => {
                fetchUserRole();

                // Setzt den Loading-Text mit den Punkten
                setLoadingText((prevText) => {
                    if (prevText.length < 10) {
                        return prevText + ".";
                    } else {
                        return "Loading"; // Reset, wenn 3 Punkte erreicht sind
                    }
                });
            }, 500); // Alle 500ms wird die Rolle abgefragt und die Animation ausgeführt

            return () => clearInterval(intervalId); // Aufräumen des Intervals, wenn der Effekt verlassen wird
        }
    }, [userRole, fetchUserRole]);

    useEffect(() => {
        setLoading(userRole === null); // Falls userRole null bleibt, bleibt loading true
    }, [userRole]);

    if (loading) {
        return (
            <div style={{ textAlign: "center" }}>
                {loadingImage ? (
                    <img
                        src={loadingImage} // Bildquelle, die über Props übergeben wird
                        alt="Loading"
                        style={{
                            width: "150px", // Bildgröße
                            height: "150px", // Bildgröße
                            marginBottom: "20px",
                            animation: "moveUpDown 2s ease-in-out infinite", // Bewegung der Animation
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            backgroundColor: "#000",
                            margin: "0 auto 20px",
                            animation: "moveUpDown 2s ease-in-out infinite", // Bewegung der Animation
                        }}
                    ></div>
                )}
                <div>{loadingText}</div>

                {/* Definiert die CSS-Animation direkt im Style-Tag */}
                <style>
                    {`
                    @keyframes moveUpDown {
                        0% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-15px);
                        }
                        100% {
                            transform: translateY(0);
                        }
                    }
                    `}
                </style>
            </div>
        );
    }

    if (!isLoggedIn()) {
        return <Navigate to="/account/login" state={{ from: location }} replace />;
    }

    const isAdmin = userRole !== null && userRole > 0;

    if (adminOnly && !isAdmin) {
        return <Navigate to="/account/login" state={{ from: location }} replace />;
    }

    if (nonAdminOnly && isAdmin) {
        return <Navigate to="/account/Admin" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default React.memo(ProtectedRoute);
