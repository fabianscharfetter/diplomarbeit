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
                <div className>
                
                </div>
            </div>
        </div>
    );
};

export default ProfilePopup;
