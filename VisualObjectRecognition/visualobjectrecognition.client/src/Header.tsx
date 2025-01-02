import { Link } from 'react-router-dom';
import './Stylesheets/Header.css';
import React, { useState } from 'react';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/home">
                    <img src="./public/logo.svg" alt="Logo" className="logo" />
                </Link>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <a href="https://lagerage.at/home">SelfStorage</a>
                <a href="https://lagerage.at/home/immobilien">Immobilien</a>
                <Link to="/about">{"\u00DCber uns"}</Link>
                <Link to="/account/login">Anmelden</Link>
            </nav>
        </header>
    );
};

export default Header;
