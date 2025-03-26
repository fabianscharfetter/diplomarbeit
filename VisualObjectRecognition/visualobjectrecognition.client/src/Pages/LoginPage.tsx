import React from 'react';
import { Link } from 'react-router-dom';
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
                    <h3>Bei Ihrem Konto anmelden</h3>
                    <br></br>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email"
                                {...register("email")}
                            />
                            {errors.email && (
                                <h5 className="error">{errors.email.message}</h5>
                            )}
                        </div>

                        <div>
                            <input
                                type="password"
                                id="password"
                                placeholder="Passwort"
                                {...register("password")}
                            />
                            {errors.password && (
                                <h5 className="error">{errors.password.message}</h5>
                            )}
                        </div>

                        <button type="submit">Anmelden</button>

                        <footer>
                            <h5>Du hast noch kein Konto?</h5>
                            <Link to="/account/register">Jetzt Regristrieren</Link>
                        </footer>
                    </form>
                </div>
            </div>

            {/* Right Container: Bild */}
            <div className="login-right-container">
                <img src="../../public/couch.svg" alt="Logo" className="login-image" />
            </div>
        </section>
    );
};


export default LoginPage;
