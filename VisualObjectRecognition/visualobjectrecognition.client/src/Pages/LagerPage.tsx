import HeaderCustomer from '../User/HeaderCustomer';
import React, { useEffect, useState } from "react";
import Footer from '../Footer';
import '../Stylesheets/Account.css';
import { useAuth } from "../Context/useAuth";
import { fetchUserByEmail } from "../Services/UserService";

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

                {error && <p className="error-message">{error}</p>}

                <div className="user-items">
                    <h1>Deine Items</h1>
                    {fetchedUser?.items?.length > 0 ? (
                        <ul>
                            {fetchedUser.items.map((item: any, index: number) => (
                                <li key={index}>
                                    {item.name || "Unbenanntes Item"}
                                    <button className="delete-button">Löschen</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Keine Items gefunden.</p>
                    )}
                    {fetchedUser?.role > 0 && (
                        <div className="admin-content">
                            
                        </div>
                    )}
                </div>
                
            </body>
            <Footer />
        </>
    );
};

export default Account;
