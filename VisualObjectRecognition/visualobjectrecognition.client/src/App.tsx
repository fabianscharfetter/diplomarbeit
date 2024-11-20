import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Login';
import Footer from './Footer';
import './Stylesheets/App.css';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <body className="body">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Contact />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </body>
            <Footer />

        </Router>
    );
};

export default App;
