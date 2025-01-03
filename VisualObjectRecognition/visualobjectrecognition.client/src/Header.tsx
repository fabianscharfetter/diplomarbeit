import { Link } from 'react-router-dom';
import './Stylesheets/Header.css';
import { useAuth } from "./Context/useAuth";
import React, { useState } from 'react';

const Header: React.FC = () => {
    const { isLoggedIn, user, logout } = useAuth();
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
                {isLoggedIn() ? (
                    <>
                        <Link className="account-link" to="/account">Willkommen,{user?.secondname}</Link>
                        <a onClick={logout} className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"> Abmelden </a>
                    </>
                ) : (
                        <>
                            <Link to="/account/login" className="hover:text-darkBlue"> Anmelden </Link>
                            <Link to="/account/register" className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"> Registrieren </Link>
                        </>
                )}
            </nav>
            
        </header>
    );
};

export default Header;
