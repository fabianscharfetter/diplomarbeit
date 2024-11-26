import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../Context/useAuth";
import { useForm } from "react-hook-form";
import "../Stylesheets/RegisterPage.css";

type RegisterFormsInputs = {
    email: string;
    userName: string;
    password: string;
    password2: string;
};

// Validierung mit Passwortwiederholung
const validation = Yup.object().shape({
    email: Yup.string()
        .required("Email wird ben�tigt")
        .email("Ung�ltige E-Mail"),
    userName: Yup.string()
        .required("Name wird ben�tigt")
        .min(6, "Name zu kurz"),
    password: Yup.string()
        .required("Passwort wird ben�tigt")
        .min(13, "Passwort muss mindestens 13 Zeichen beinhalten"),
    password2: Yup.string()
        .oneOf([Yup.ref("password")], "Passw�rter stimmen nicht �berein")
        .required("Passwortwiederholung wird ben�tigt"),
});

const RegisterPage: React.FC = () => {
    const { registerUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

    const handleRegister = (form: RegisterFormsInputs) => {
        registerUser(form.email, form.userName, form.password);
    };

    return (
        <section className="register-container">
            <div className="register-left-container">
                <div className="register-form">
                    <h1>Registrierung</h1>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div>
                            <input
                                type="text"
                                id="userName"
                                {...register("userName")}
                                placeholder="Name"
                            />
                            {errors.userName && <p className="error">{errors.userName.message}</p>}
                        </div>
                        <div>
                            <input
                                type="email"
                                id="email"
                                {...register("email")}
                                placeholder="E-Mail"
                            />
                            {errors.email && <p className="error">{errors.email.message}</p>}
                        </div>
                        <div>
                            <input
                                type="password"
                                id="password"
                                {...register("password")}
                                placeholder="Passwort"
                            />
                            {errors.password && <p className="error">{errors.password.message}</p>}
                        </div>
                        <div>
                            <input
                                type="password"
                                id="password2"
                                {...register("password2")}
                                placeholder="Passwort wiederholen"
                            />
                            {errors.password2 && <p className="error">{errors.password2.message}</p>}
                        </div>
                        <button type="submit">Jetzt Registrieren</button>
                    </form>
                    <footer>
                        <h5>Du hast bereits ein Konto?</h5>
                        <a href="/account/login">� Zur�ck zur Anmeldung</a>
                    </footer>
                </div>
            </div>

            <div className="register-right-container">
                <img
                    src="../../public/couch.svg"
                    alt="Logo"
                    className="register-image"
                />
            </div>
        </section>
    );
};

export default RegisterPage;
