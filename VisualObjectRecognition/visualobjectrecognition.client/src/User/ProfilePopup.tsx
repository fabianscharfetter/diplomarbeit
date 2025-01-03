import React, { useEffect, useState } from "react";
import "../Stylesheets/ProfilePopup.css";
import { fetchUserByEmail } from "../Services/UserService";
import { useAuth } from "../Context/useAuth";

interface ProfilePopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ isOpen, onClose }) => {
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

        if (isOpen) {
            getUser();
        }
    }, [user?.email, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <a className="close-button" onClick={onClose}>✖</a>
                <h2 className="popup-title">Profil</h2>
                {loading ? (
                    <p>Lade Benutzerdaten...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    <>
                        <form className="popup-form">
                            <div className="form-group">
                                <label htmlFor="firstName">*Vorname</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder="Vorname"
                                    defaultValue={fetchedUser?.firstName || ""}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">*Nachname</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder="Nachname"
                                    defaultValue={fetchedUser?.secondName || ""}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="company">*Firma</label>
                                <input
                                    type="text"
                                    id="company"
                                    placeholder="Firma (optional)"
                                    defaultValue={fetchedUser?.firma || ""}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">*E-Mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="E-Mail"
                                    defaultValue={fetchedUser?.email || ""}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">*Telefonnummer</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    placeholder="Telefonnummer"
                                    defaultValue={fetchedUser?.phoneNbr || ""}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob">Geburtsdatum</label>
                                <input
                                    type="date"
                                    id="dob"
                                    defaultValue={fetchedUser?.dob || ""}
                                />
                            </div>
                        </form>
                        <h2 className="popup-title">Adresse</h2>
                        <form className="popup-form">
                            <div className="form-group">
                                <label htmlFor="street">*Straße</label>
                                <input
                                    type="text"
                                    id="street"
                                    placeholder="Straße"
                                    defaultValue={fetchedUser?.address?.Straße || ""}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="houseNumber">*Hausnummer</label>
                                <input
                                    type="text"
                                    id="houseNumber"
                                    placeholder="Hausnummer"
                                    defaultValue={fetchedUser?.address?.Hausnummer || ""}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">*Stadt</label>
                                <input
                                    type="text"
                                    id="city"
                                    placeholder="Stadt"
                                    defaultValue={fetchedUser?.address?.Stadt || ""}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="zip">*Postleitzahl</label>
                                <input
                                    type="text"
                                    id="zip"
                                    placeholder="Postleitzahl"
                                    defaultValue={fetchedUser?.address?.Postleitzahl || ""}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">*Land</label>
                                <input
                                    type="text"
                                    id="country"
                                    placeholder="Land"
                                    defaultValue={fetchedUser?.address?.Land || ""}
                                />
                            </div>
                        </form>
                        <a className="save-button" onClick={onClose}>
                            speichern
                        </a>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfilePopup;
