import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import './Stylesheets/App.css';
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/useAuth";

const App: React.FC = () => {
    return (
        <>
            <UserProvider>
                <Outlet />
                <ToastContainer />
            </UserProvider>
        </>
    );
};

export default App;
