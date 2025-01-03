import HeaderCustomer from '../User/HeaderCustomer';
import React, { useEffect, useState } from "react";
import Footer from '../Footer';
import '../Stylesheets/Account.css';
import { Link } from 'react-router-dom';
import { useAuth } from "../Context/useAuth";
import { fetchUserByEmail } from "../Services/UserService"


const Account: React.FC = () => {
    const { user } = useAuth();
   
    const [fetchedUser, setFetchedUser] = useState<any>(null);
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
                const result = await fetchUserByEmail(user.email);
                setFetchedUser(result);
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
                
                <h1>
                    {loading ? (
                        <span>
                            Lade Benutzerinformationen...
                            <span className="loader"></span>
                        </span>
                    ) : fetchedUser ? (
                        <>
                            Eingelogged als {fetchedUser?.email || ""}
                        </>
                    ) : (
                        "Benutzer nicht gefunden"
                    )}
                </h1>

                {error && <p style={{ color: "red" }}>{error}</p>}


                <div className="standorte">

                    

                <h1>Standorte</h1>

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