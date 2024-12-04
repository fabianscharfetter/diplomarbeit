import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from '../Pages/Home';
import About from '../Pages/About';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage'
import Account from '../Pages/Account'
import ProtectedRoute from "./ProtectedRoutes";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: "home", element: <Home /> },
            { path: "account/login", element: <LoginPage /> },
            { path: "account/register", element: <RegisterPage /> },
            { path: "about", element: <About /> },
            {
                path: "account", element: (
                    <ProtectedRoute>
                        <Account />
                    </ProtectedRoute>
                ),
            },

        ],
    },
]);