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
                            Lade Items...
                            <span className="loader"></span>
                        </span>
                    ) : fetchedUser ? (
                        <>
                                Deine Items, {fetchedUser?.firstName || ""} {fetchedUser?.secondName || ""}:
                        </>
                    ) : (
                        "Benutzer nicht gefunden"
                    )}
                </h1>

                {error && <p className="error-message">{error}</p>}

                <div className="items-list">
                    {fetchedUser?.items?.length > 0 ? (
                        fetchedUser.items.map((item: any, index: number) => (
                            <div key={index} className="item-card">
                                <h3>{item.title || "Unbenanntes Item"}</h3>
                                <button className="delete-button">Auslagern</button>
                            </div>
                        ))
                    ) : (
                        <p>Keine Items gefunden.</p>
                    )}
                </div>
                
            </body>
            <Footer />
        </>
    );
};

export default Account;
