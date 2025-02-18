import HeaderCustomer from '../User/HeaderCustomer';
import React, { useEffect, useState } from "react";
import Footer from '../Footer';
import '../Stylesheets/Admin.css';
import { getAllUsers } from "../Services/UserService"; // Beide Funktionen importieren
import { FaArrowLeft } from "react-icons/fa";

const AdminPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null); // Für ausgewählten Benutzer
    const [error, setError] = useState<string>("");
    const [selectedStorage, setSelectedStorage] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResult = await getAllUsers();
                setUsers(userResult);
            } catch (err) {
                setError("Fehler beim Abrufen der Daten:" + err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleStorageClick = (storage: any) => {
        setSelectedStorage(storage);
    };

    const handleUserClick = (user: any) => {
        setSelectedUser(user); // Benutzer auswählen
    };

    const handleBackClick = () => {
        if (selectedStorage) {
            setSelectedStorage(null);
        } else {
            setSelectedUser(null);
        }
    };

    return (
        <>
            <HeaderCustomer />
            <div className="admin-container">
                <div className="main">
                    {selectedStorage ? (
                        <>
                            {/* Zurück zu den Lagern */}
                            <button className="back-button" onClick={handleBackClick}>
                                <FaArrowLeft />
                            </button>
                            <h3>Items in Lager: {selectedStorage.title}</h3>
                            <ul>
                                {selectedUser.items
                                    .filter((item: any) => item.storageId == selectedStorage.Id)
                                    .map((item: any, index: number) => (
                                        <li key={index}>{item.title}</li>
                                    ))}
                            </ul>
                        </>
                    ) : selectedUser ? (
                        <>
                            {/* Zurück zu den Benutzern */}
                            <button className="back-button" onClick={handleBackClick}>
                                <FaArrowLeft />
                            </button>
                            <h3>Lager von {selectedUser.firstName} {selectedUser.secondName}</h3>
                                <ul>
                                    {selectedUser.storages
                                        .map((storage: { title: string }, index: number) => (
                                            <li key={index} onClick={() => handleStorageClick(storage)}>
                                                {storage.title}
                                            </li>
                                        ))}
                                </ul>
                        </>
                    ) : (
                        <>
                            <h3>Benutzer</h3>
                            {loading ? (
                                <p>Benutzer werden geladen...</p>
                            ) : error ? (
                                <p style={{ color: "red" }}>{error}</p>
                            ) : users.length > 0 ? (
                                <ul>
                                    {users.map((user, index) => (
                                        <li key={index} onClick={() => handleUserClick(user)}>
                                            {user.firstName} {user.secondName}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Keine Benutzer gefunden.</p>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};
export default AdminPage;