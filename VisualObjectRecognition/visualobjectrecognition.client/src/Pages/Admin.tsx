import HeaderCustomer from '../User/HeaderCustomer';
import React, { useEffect, useState } from "react";
import Footer from '../Footer';
import '../Stylesheets/Admin.css';
import { getAllUsers, getInventoryItems } from "../Services/UserService"; // Beide Funktionen importieren
import { FaArrowLeft } from "react-icons/fa";

const AdminPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<any[]>([]);
    const [inventory, setInventory] = useState<any[] | null>(null); // Zustand kann Array oder null sein // Initialwert ist ein leeres Array
    const [selectedUser, setSelectedUser] = useState<any>(null); // Für ausgewählten Benutzer
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResult = await getAllUsers();
                const inventoryResult = await getInventoryItems(); // Alle Lagerdaten auf einmal laden
                setUsers(userResult);
                setInventory(inventoryResult);
            } catch (err) {
                setError(`Fehler beim Abrufen der Daten: ${err}`);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleUserClick = (user: any) => {
        setSelectedUser(user); // Benutzer auswählen
    };
    const handleBackClick = () => {
        setSelectedUser(null);
    };

    return (
        <>
            <HeaderCustomer />
            <div className="admin-container">
                <div className="main">
                    {selectedUser ? (
                        <>
                            {/* Zurück-Button */}
                            <button className="back-button" onClick={handleBackClick}>
                                <FaArrowLeft />
                            </button>
                            <h3>Lageritems von {selectedUser.firstName} {selectedUser.secondName}</h3>
                            {inventory && inventory.length > 0 ? (
                                <ul>
                                    {inventory
                                        .filter((item) => item.userId === selectedUser.Id)
                                        .map((item, index) => (
                                            <li key={index}>{item.title}</li>
                                        ))}
                                </ul>
                            ) : (
                                <p>Keine Lageritems vorhanden.</p>
                            )}
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
                                    {users.map((u: any) => (
                                        <li
                                            key={u?.Id}
                                            onClick={() => handleUserClick(u)}
                                        >
                                            {u?.firstName + " " + u?.secondName}
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