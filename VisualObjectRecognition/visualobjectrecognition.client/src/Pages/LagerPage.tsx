import HeaderCustomer from '../User/HeaderCustomer';
import React, { useEffect, useState } from "react";
import Footer from '../Footer';
import '../Stylesheets/Account.css';
import { useAuth } from "../Context/useAuth";
import { fetchUserByEmail} from "../Services/UserService";

const Account: React.FC = () => {
    const { user } = useAuth();

    const [fetchedUser, setFetchedUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
   // const [inventory, setInventory] = useState<any[] | null>(null); // Zustand kann Array oder null sein // Initialwert ist ein leeres Array

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
             //   const inventoryResult = await getInventoryItems(); // Alle Lagerdaten auf einmal laden
             //   setInventory(inventoryResult);
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
             <div className="container">
             <div className="main">
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
                    {fetchedUser && fetchedUser.items && Array.isArray(fetchedUser.items) && fetchedUser.items.length > 0 ? (
                        <ul>
                            {fetchedUser.items.map((item: any, index: number) => (
                                <li key={index}>{item.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Keine Lageritems vorhanden.</p>
                    )}
                    </div>
                </div>
            </div>
            </body>
            <Footer />
        </>
    );
};

export default Account;
