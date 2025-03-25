import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../Context/useAuth";
import { useForm } from "react-hook-form";
import "../Stylesheets/RegisterPage.css";

type RegisterFormsInputs = {
    email: string;
    firstname: string;
    secondname: string;
    phonenbr: string;
    password: string;
    firma?: string | null;
    password2: string;
    birthdate: Date; 

    strasse: string; 
    hausnummer: string; 
    postleitzahl: string; 
    stadt: string;
    role?: number;
    land: string; 
};

// Validierung mit den neuen Variablennamen
const validation = Yup.object().shape({
    email: Yup.string()
        .required("Email wird benötigt")
        .email("Ungültige E-Mail"),
    secondname: Yup.string()
        .required("Nachname wird benötigt")
        .min(3, "Nachname zu kurz"),
    firstname: Yup.string()
        .required("Vorname wird benötigt")
        .min(3, "Vorname zu kurz"),
    phonenbr: Yup.string()
        .required("Telefonnummer wird benötigt")
        .min(10, "Telefonnummer zu kurz"),
    birthdate: Yup.date()
        .required("Geburtsdatum wird benötigt")
        .max(new Date(), "Geburtsdatum kann nicht in der Zukunft liegen"),
    strasse: Yup.string()
        .required("Straße wird benötigt")
        .min(3, "Straßenname zu kurz"),
    hausnummer: Yup.string()
        .required("Hausnummer wird benötigt")
        .matches(/^\d+[a-zA-Z]?$/, "Ungültige Hausnummer"),
    postleitzahl: Yup.string()
        .required("Postleitzahl wird benötigt")
        .matches(/^\d{4,5}$/, "Postleitzahl muss 4-5 Ziffern enthalten"),
    stadt: Yup.string()
        .required("Stadt wird benötigt")
        .min(2, "Stadtname zu kurz"),
    land: Yup.string()
        .required("Land wird benötigt")
        .min(2, "Ländename zu kurz"),
    password: Yup.string()
        .required("Passwort wird benötigt")
        .min(8, "Passwort muss mindestens 8 Zeichen beinhalten"),
    firma: Yup.string()
        .nullable()
        .notRequired(),
    password2: Yup.string()
        .oneOf([Yup.ref("password")], "Passwörter stimmen nicht überein")
        .required("Passwortwiederholung wird benötigt")
});

const RegisterPage: React.FC = () => {
    const { registerUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

    const handleRegister = (form: RegisterFormsInputs) => {
        registerUser(
            form.email,
            form.firstname,
            form.secondname,
            form.birthdate,
            form.phonenbr,
            form.password,

            form.strasse,
            form.hausnummer,
            form.postleitzahl,
            form.stadt,
            form.land,

            form.firma!
        );
    };

    return (
        <section className="register-container">
            <div className="register-left-container">

                <div className="register-form">
                    <h1>Registrierung</h1>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div className="form-grid">
                            <div>
                                <input
                                    type="text"
                                    id="firstname"
                                    {...register("firstname")}
                                    placeholder="Vorname"
                                />
                                {errors.firstname && <p className="error">{errors.firstname.message}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="secondname"
                                    {...register("secondname")}
                                    placeholder="Nachname"
                                />
                                {errors.secondname && <p className="error">{errors.secondname.message}</p>}
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
                                    type="tel"
                                    id="phonenbr"
                                    {...register("phonenbr")}
                                    placeholder="Telefonnummer"
                                />
                                {errors.phonenbr && <p className="error">{errors.phonenbr.message}</p>}
                            </div>
                            <div>
                                <input
                                    type="date"
                                    id="birthdate"
                                    {...register("birthdate")}
                                    placeholder="Geburtsdatum"
                                />
                                {errors.birthdate && <p className="error">{errors.birthdate.message}</p>}
                            </div>
                            <div></div>
                            <div>
                                <input
                                    type="text"
                                    id="strasse"
                                    {...register("strasse")}
                                    placeholder="Straße"
                                />
                                {errors.strasse && <p className="error">{errors.strasse.message}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="hausnummer"
                                    {...register("hausnummer")}
                                    placeholder="Hausnummer"
                                />
                                {errors.hausnummer && <p className="error">{errors.hausnummer.message}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="postleitzahl"
                                    {...register("postleitzahl")}
                                    placeholder="Postleitzahl"
                                />
                                {errors.postleitzahl && <p className="error">{errors.postleitzahl.message}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="stadt"
                                    {...register("stadt")}
                                    placeholder="Stadt"
                                />
                                {errors.stadt && <p className="error">{errors.stadt.message}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="land"
                                    {...register("land")}
                                    placeholder="Land"
                                />
                                {errors.land && <p className="error">{errors.land.message}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="firma"
                                    {...register("firma")}
                                    placeholder="Firma (optional)"
                                />
                                {errors.firma && <p className="error">{errors.firma.message}</p>}
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
                        </div>
                        <footer>
                            <h5>Du hast bereits ein Konto?</h5>
                            <a href="/account/login">« Zurück zur Anmeldung</a>
                        </footer>
                    </form>

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
