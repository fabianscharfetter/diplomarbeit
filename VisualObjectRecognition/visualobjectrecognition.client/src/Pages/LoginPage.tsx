/* eslint-disable @typescript-eslint/no-unused-vars */
//import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../Context/useAuth";
import { useForm } from "react-hook-form";
import "../Stylesheets/LoginPage.css";


//eslint-disable-next-line @typescript-eslint/no-empty-object-type
//type Props = {};

type LoginFormsInputs = {
    email: string;
    password: string;
};

const validation = Yup.object().shape({
    email: Yup.string().required("Email wird benötigt"),
    password: Yup.string().required("Passwort wird benötigt"),
});

const LoginPage: React.FC = () => {
    const { loginUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

    const handleLogin = (form: LoginFormsInputs) => {
        loginUser(form.email, form.password);
    };

    return (
        <section className="login-container">
            {/* Left Container: Anmeldeformular */}
            <div className="login-left-container">
                <div className="login-form">
                    <h1>Bei Ihrem Konto anmelden</h1>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Vorname"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium"
                            >
                                Passwort
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <button type="submit">Anmelden</button>

                        <footer>
                            <p>
                                Du hast noch kein Konto?{" "}
                                <a href="#">Jetzt registrieren!</a>
                            </p>
                        </footer>
                    </form>
                </div>
            </div>

            {/* Right Container: Bild */}
            <div className="login-right-container">
                <img src="../../public/logo.svg" alt="Logo" className="logo-footer" />
            </div>
        </section>
    );
};


export default LoginPage;
