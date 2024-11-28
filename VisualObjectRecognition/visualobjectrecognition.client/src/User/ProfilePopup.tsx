import React from 'react';
import '../Stylesheets/ProfilePopup.css';

interface ProfilePopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // Popup nur anzeigen, wenn `isOpen` true ist

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
            </div>
        </div>
    );
};

export default ProfilePopup;
