import React from 'react';
import '../Stylesheets/ProfilePopup.css';

interface ProfilePopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <a className="close-button" onClick={onClose}>✖</a>
                <h2 className="popup-title">Profil</h2>
                <form className="popup-form">
                    <div className="form-group">
                        <label htmlFor="firstName">*Vorname</label>
                        <input type="text" id="firstName" placeholder="Vorname" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">*Nachname</label>
                        <input type="text" id="lastName" placeholder="Nachname" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="company">*Firma</label>
                        <input type="text" id="company" placeholder="Firma (optional)" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">*E-Mail</label>
                        <input type="email" id="email" placeholder="E-Mail" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">*Telefonnummer</label>
                        <input type="tel" id="phone" placeholder="Telefonnummer" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Geburtsdatum</label>
                        <input type="date" id="dob" />
                    </div>
                </form>
                <h2 className="popup-title">Adresse</h2>
                <form className="popup-form">
                    <div className="form-group">
                        <label htmlFor="firstName">*Straße</label>
                        <input type="text" id="firstName" placeholder="Straße" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">*Hausnummer</label>
                        <input type="text" id="lastName" placeholder="Hausnummer" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="company">*Stadt</label>
                        <input type="text" id="company" placeholder="Stadt" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">*Postleitzahl</label>
                        <input type="email" id="email" placeholder="Postleitzahl" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">*Land</label>
                        <input type="tel" id="phone" placeholder="Land" />
                    </div>
                </form>
                <a className="save-button" onClick={onClose}>speichern</a>
            </div>
        </div>
    );
};

export default ProfilePopup;
