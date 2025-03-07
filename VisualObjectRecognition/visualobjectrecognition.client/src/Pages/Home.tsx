import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import '../Stylesheets/Home.css';

const Home: React.FC = () => {
    const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

    const sections = {
        lagerage: {
            description: "Die Lagerage GmbH wurde 2009 gegründet und ist spezialisiert auf die Vermietung von Lagerräumen für Privatpersonen und Unternehmen. Wir bieten sichere, moderne Lagermöglichkeiten, die auf die Bedürfnisse unserer Kunden zugeschnitten sind. Unsere Lagerräume sind flexibel und bieten Lösungen sowohl für Einzelpersonen als auch für Unternehmen. Mit der Tochtergesellschaft Lagerage Storage GmbH garantieren wir unseren Kunden innovative und sichere Lagerlösungen."
        },
        features: [
            {
                title: "Automatische Objekterkennung",
                description: "Unser KI-gestütztes System erkennt und katalogisiert Ihre eingelagerten Objekte automatisch.",
                image: "/Saalfelden.jpeg"
            },
            {
                title: "Flexible Auslagerung",
                description: "Markieren Sie eingelagerte Objekte zur Abholung oder Lieferung – volle Kontrolle über Ihre Bestände.",
                image: "feature2.jpg"
            },
            {
                title: "Bearbeitung bei Fehldetektion",
                description: "Korrigieren Sie falsche Erkennungen mit wenigen Klicks. Das System lernt aus Ihren Korrekturen.",
                image: "feature3.jpg"
            }
        ],
        mitarbeiter: [
            {
                name: "Max Mustermann",
                position: "CEO",
                description: "Max Mustermann ist der Gründer und Geschäftsführer von Lagerage GmbH. Mit seiner Expertise in der Lagerwirtschaft führt er das Unternehmen seit 2009.",
                image: "/Saalfelden.jpeg"
            },
            {
                name: "Erika Musterfrau",
                position: "Technische Leiterin",
                description: "Erika Musterfrau verantwortet die technische Entwicklung und Implementierung neuer Lösungen im Bereich Lagerverwaltung und Automatisierung.",
                image: "mitarbeiter2.jpg"
            },
            {
                name: "John Doe",
                position: "Marketing Manager",
                description: "John Doe ist verantwortlich für das Marketing und die Kundenkommunikation. Er sorgt dafür, dass die Marke Lagerage weiter wächst.",
                image: "mitarbeiter3.jpg"
            }
        ]
    };

    const handleFeatureNext = () => {
        setActiveFeatureIndex((prevIndex) => (prevIndex + 1) % sections.features.length);
    };

    const handleFeaturePrev = () => {
        setActiveFeatureIndex((prevIndex) => (prevIndex - 1 + sections.features.length) % sections.features.length);
    };

    return (
        <>
            <Header />
            <main className="main-content">
                <section className="section-container">
                    {/* Lagerage Section */}
                    <div
                        className="section lagerage"
                        style={{
                            background: "url('../public/Saalfelden.jpeg') no-repeat center center",
                            backgroundSize: "cover"
                        }}
                    >
                        <h2 className="section-title">Über Lagerage</h2>
                        <p>{sections.lagerage.description}</p>
                    </div>

                    {/* Features Section */}
                    <div className="section features">
                        <h2 className="section-title">Hauptfunktionen</h2>
                        <div className="section-item">
                            <button className="nav-arrow nav-arrow-left" onClick={handleFeaturePrev}>
                                &#8592;
                            </button>
                            <div className="text">
                                <h3>{sections.features[activeFeatureIndex].title}</h3>
                                <p>{sections.features[activeFeatureIndex].description}</p>
                            </div>
                            <button className="nav-arrow nav-arrow-right" onClick={handleFeatureNext}>
                                &#8594;
                            </button>
                            <img src={sections.features[activeFeatureIndex].image} alt={sections.features[activeFeatureIndex].title} />
                        </div>
                    </div>

                    {/* Mitarbeiter Section */}
                    <div className="section mitarbeiter">
                        <h2 className="section-title">Unsere Mitarbeiter</h2>
                        <div className="mitarbeiter-items">
                            {sections.mitarbeiter.map((mitarbeiter, index) => (
                                <div className="mitarbeiter-item" key={index}>
                                    <div className="name-line"></div>
                                    <div className="mitarbeiter-details">
                                        <h3>{mitarbeiter.name}</h3>
                                        <p>{mitarbeiter.position}</p>
                                        <p>{mitarbeiter.description}</p>
                                    </div>
                                    <img src={mitarbeiter.image} alt={mitarbeiter.name} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Home;
