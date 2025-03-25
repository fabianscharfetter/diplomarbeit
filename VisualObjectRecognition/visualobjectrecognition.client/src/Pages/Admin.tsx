import HeaderCustomer from '../User/HeaderCustomer';
import React, { useEffect, useState } from "react";
import Footer from '../Footer';
import '../Stylesheets/Admin.css';
import { getAllUsers, addItem, deleteItem } from "../Services/UserService";
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa";

const AdminPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [error, setError] = useState<string>("");
    const [selectedStorage, setSelectedStorage] = useState<any>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newItemTitle, setNewItemTitle] = useState<string>("");
    const [isStoring, setIsStoring] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResult = await getAllUsers();
                setUsers(userResult);
            } catch (err) {
                setError("Fehler beim Abrufen der Daten: " + err);
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
        setSelectedUser(user);
    };

    const handleBackClick = () => {
        if (selectedStorage) {
            setSelectedStorage(null);
        } else {
            setSelectedUser(null);
        }
    };

    const handleAddItem = async () => {
        if (!newItemTitle.trim()) return;
        try {
            await addItem(selectedUser.id, newItemTitle);
            setNewItemTitle("");
            setShowModal(false);
        } catch (err) {
            setError("Fehler beim Hinzufügen eines Items: " + err);
        }
    };

    const handleDeleteItem = async (itemId: string) => {
        try {
            await deleteItem(selectedUser.id, itemId);
        } catch (err) {
            setError("Fehler beim Löschen eines Items: " + err);
        }
    };

    const toggleStorage = async () => {
        if (!isStoring) {
            try {
                await axios.post('https://localhost:7228/api/Einlagerung/start', {}, { params: { userid: selectedUser.id } });
                setIsStoring(true);
            } catch (error) {
                setError("Fehler beim Starten der Einlagerung: " + error);
            }
        } else {
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
            <div className="admin-container">
                <div className="main">
                    {selectedStorage ? (
                        <>
                            <button className="back-button" onClick={handleBackClick}>
                                <FaArrowLeft />
                            </button>
                            <h3>Items in Lager: {selectedStorage.title}</h3>
                            <ul>
                                {selectedUser.items
                                    .filter((item: any) => item.storageId === selectedStorage.Id)
                                    .map((item: any, index: number) => (
                                        <div key={index}>
                                            <li>{item.title}</li>
                                            <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>
                                                Auslagern
                                            </button>
                                        </div>
                                    ))}
                            </ul>
                            <button className="floating-button" onClick={() => setShowModal(true)}>+</button>
                            <button className={`storage-button ${isStoring ? "storing" : ""}`} onClick={toggleStorage}>
                                {isStoring ? "Stoppen" : "Einlagern"}
                            </button>
                            {showModal && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <h2>Neues Item hinzufügen</h2>
                                        <input
                                            type="text"
                                            value={newItemTitle}
                                            onChange={(e) => setNewItemTitle(e.target.value)}
                                            placeholder="Item-Name eingeben..."
                                        />
                                        <div className="modal-buttons">
                                            <button onClick={handleAddItem}>Hinzufügen</button>
                                            <button onClick={() => setShowModal(false)}>Abbrechen</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : selectedUser ? (
                        <>
                            <button className="back-button" onClick={handleBackClick}>
                                <FaArrowLeft />
                            </button>
                            <h3>Lager von {selectedUser.firstName} {selectedUser.secondName}</h3>
                            <ul>
                                {selectedUser.storages.map((storage: { title: string }, index: number) => (
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
