import HeaderCustomer from '../User/HeaderCustomer';
import React, { useEffect, useState } from "react";
import Footer from '../Footer';
import '../Stylesheets/LagerPage.css';
import { useAuth } from "../Context/useAuth";
import { fetchUserByEmail, addItem, deleteItem } from "../Services/UserService"; // deleteItem importieren
import axios from 'axios'; // Axios importieren

const LagerPage: React.FC = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [fetchedUser, setFetchedUser] = useState<any>(null);
    const [error, setError] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newItemTitle, setNewItemTitle] = useState<string>("");

    const [isStoring, setIsStoring] = useState<boolean>(false); // Zustand für Ein-/Auslagern

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
                setError("Fehler beim Abrufen des Benutzers:" + err);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [user?.email]);

    // Funktion zum Hinzufügen eines Items
    const handleAddItem = async () => {
        if (!newItemTitle.trim()) return;
        try {
            const updatedUser = await addItem(fetchedUser?.id, newItemTitle);
            setFetchedUser(updatedUser);
            setNewItemTitle("");
            setShowModal(false);
        } catch (err) {
            setError("Fehler beim Hinzufügen eines Items:" + err);
        }
    };

    // Funktion zum Löschen eines Items
    const handleDeleteItem = async (itemId: string) => {
        try {
            const updatedUser = await deleteItem(fetchedUser.id, itemId);
            setFetchedUser(updatedUser);
        } catch (err) {
            setError("Fehler beim Löschen eines Items:" + err);
        }
    };

    // Funktion zum Steuern des Ein- und Auslagerns
    const toggleStorage = async () => {
        if (!isStoring) {
            // Wenn der Zustand auf "Einlagern" ist, stoppe die Einlagerung
            try {
                await axios.post('https://localhost:7228/api/Einlagerung/start', {}, { params: { userid: fetchedUser.id } });
                setIsStoring(true);
            } catch (error) {
                setError("Fehler beim Starten der Einlagerung: " + error);
            }
        } else {
            // Wenn der Zustand auf "Auslagern" ist, stoppe die Einlagerung
            try {
                await axios.post('https://localhost:7228/api/Einlagerung/stop');
                setIsStoring(false);
            } catch (error) {
                setError("Fehler beim Stoppen der Einlagerung: " + error);
            }
        }
    };

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
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteItem(item.id)} // Löschen-Funktion aufrufen
                                >
                                    Auslagern
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Keine Items gefunden.</p>
                    )}
                </div>

                {/* Plus-Button zum Öffnen des Modals */}
                <button className="floating-button" onClick={() => setShowModal(true)}>+</button>

                {/* Button zum Steuern des Ein- und Auslagerns */}
                <button
                    className={`storage-button ${isStoring ? "storing" : ""}`}
                    onClick={toggleStorage}
                >
                    {isStoring ? "Stoppen" : "Einlagern"}
                </button>

                {/* Modal zum Hinzufügen eines neuen Items */}
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Neues Item hinzufuegen</h2>
                            <input
                                type="text"
                                value={newItemTitle}
                                onChange={(e) => setNewItemTitle(e.target.value)}
                                placeholder="Item-Name eingeben..."
                            />
                            <div className="modal-buttons">
                                <button onClick={handleAddItem}>Hinzufuegen</button>
                                <button onClick={() => setShowModal(false)}>Abbrechen</button>
                            </div>
                        </div>
                    </div>
                )}
            </body>
            <Footer />
        </>
    );
};

export default LagerPage;
