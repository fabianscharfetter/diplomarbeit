import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from '../Pages/Home';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import Account from '../Pages/Account';
import ProtectedRoute from "./ProtectedRoutes";
import LagerPage from '../Pages/LagerPage';
import CamPage from '../Pages/CamPage';
import AdminPage from '../Pages/Admin';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: "home", element: <Home /> },
            { path: "account/login", element: <LoginPage /> },
            { path: "account/register", element: <RegisterPage /> },

            {
                path: "account",
                element: (
                    <ProtectedRoute nonAdminOnly={true}>
                        <Account />
                    </ProtectedRoute>
                ),
            },
            {
                path: "account/lager",
                element: (
                    <ProtectedRoute nonAdminOnly={true}>
                        <LagerPage />
                    </ProtectedRoute>
                ),
            },

            {
                path: "account/cam",
                element: (
                    <ProtectedRoute adminOnly={true}>
                        <CamPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "account/admin",
                element: (
                    <ProtectedRoute adminOnly={true}>
                        <AdminPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
