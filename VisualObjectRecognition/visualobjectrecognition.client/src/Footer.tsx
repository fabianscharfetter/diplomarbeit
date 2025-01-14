import React from 'react';
import { Link } from 'react-router-dom';
import './Stylesheets/Footer.css';

const Footer: React.FC = () => {
    return (
        <div>
            <div className="logo-container-footer">
                <Link to="/home">
                    <img src="/lagarage_logo.svg" alt="Logo" className="logo-footer" />
                </Link>
            </div>
            <hr className="hr-footer"></hr>
            <footer className="footer">
                <div className="footer-container">

                    <div className="footer-column">
                        <h3>Lagerage</h3>

                        <p>
                            <a className="footer-link" href="https://lagerage.at/home">SelfStorage</a>
                        </p>

                        <p>
                            <a className="footer-link" href="https://lagerage.at/home/immobilien">Immobilien</a>
                        </p>
                    </div>

                    <div className="footer-column">
                        <h3>Allgemein</h3>

                        <p>
                            <Link className="footer-link" to="/about">{"\u00DCber uns"}</Link>
                        </p>
                        <p>
                            <a className="footer-link" href="https://lagerage.at/impressum">Impressum</a>
                        </p>
                        <p>
                            <a className="footer-link" href="https://lagerage.at/faqs">FAQs</a>
                        </p>
                    </div>
                    <div className="footer-column">
                        <h3>Kontakt</h3>

                        <p>Telefon:   
                            <a> </a>
                            <a className="footer-link" href="tel:+436542218722">+43 6542 218722</a>
                        </p>

                        <p>Email:
                            <a> </a>
                            <a className="footer-link" href="mailto:office@lagerage.at">office@lagerage.at</a>
                        </p>

                        <p>Adresse:
                            <a> </a>
                            <a className="footer-link" href="https://goo.gl/maps/SoaoH8DiYMwBRde19">Seespitzstra{"\u00DF"}e 8, 5700 Zell am See</a>
                        </p>
                    </div>
                    <div className="footer-column">
                        <h3>Zahlungsmittel</h3>
                        <p>{"Text f\u00FCr die vierte Spalte."}</p>

                    </div>
                    <div className="footer-column">
                        <h3>Documents</h3>
                        <p>{"Text f\u00FCr die f\u00FCnfte Spalte."}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
