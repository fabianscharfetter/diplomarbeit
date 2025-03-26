import HeaderCustomer from '../User/HeaderCustomer';
import React, { useEffect, useState } from "react";
import Footer from '../Footer';
import '../Stylesheets/Account.css';
import { Link } from 'react-router-dom';
import { useAuth } from "../Context/useAuth";


const Account: React.FC = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const getUser = async () => {
            if (!user?.email) {
                setError("Keine gültige E-Mail-Adresse verfügbar.");
                setLoading(false);
                return;
            }
            try {
                user != null;
            } catch (err) {
                setError(`Fehler beim Abrufen des Benutzers: ${err}`);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [user?.email]);


    return (
        <>
            <HeaderCustomer />
            <body className="body">

                <br></br>

                <h1>
                    {loading ? (
                        <span>
                            Lade Benutzerinformationen...
                            <span className="loader"></span>
                        </span>
                    ) : user ? (
                        <>
                            Willkommen, {user.email || ""} !
                        </>
                    ) : (
                        "Benutzer nicht gefunden"
                    )}
                </h1>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <br></br>

                <div className="standorte">
                    <h1>Deine Standorte</h1>
                

                <div className="auswahl">
                        <div className="standort" >
                            <Link to="/account/lager">
                                <img src="/Saalfelden.jpeg" className="saalfeldenpicture" alt="Saalfelden" />
                            </Link>
                            <h2>Saalfelden</h2>
                        </div>
                        <div className="standort">
                            <Link to="/account/lager">
                                <img src="/ZellAmSee.jpeg" className="zellpicture" alt="Zell am See" />
                            </Link>
                            <h2>Zell am See</h2>
                        </div>
                </div>
            </div>
            </body>
            <Footer />
        </>
    );
};

export default Account;