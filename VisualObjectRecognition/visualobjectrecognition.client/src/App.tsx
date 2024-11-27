import React from 'react';
import Header from './Header';
import Footer from './Footer';
import "react-toastify/dist/ReactToastify.css";
import './Stylesheets/App.css';
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/useAuth";

const App: React.FC = () => {
    return ( 
        <>
            <UserProvider>
                <Header />
                <div className="app-body">
                    <Outlet />
                    <ToastContainer />
                </div>
                <Footer />
            </UserProvider>
        </>
    );
};

export default App;
