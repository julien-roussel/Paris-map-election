import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

// Contexte
import { useAuth } from "../../context/AuthContext"

// Component
import Card from '../../Components/Composition/Card';

const Login = (dataForm) => {
    // Context
    const { login, logout, auth, session, errMsg, setErrMsg, city, metiers } = useAuth();

    // State
    const [user, setUser] = useState({});
    const [password, setPassword] = useState('');

    const [maj, setMaj] = useState('');
    const [formData, setFormData] = useState({});
    const [birthdate, setBirthdate] = useState('');

    const formatDate = (date) => {
        if (!date || typeof date !== 'string') return "";
        const d = new Date(date);
        return date.split('T')[0];
    };

    useEffect(() => {
        if (!auth) return;
        const birthdateFormatted = formatDate(auth?.dateOfBirth);
        setBirthdate(birthdateFormatted);

        setFormData({
            username: auth?.username || "",
            email: auth?.email || "",
            firstname: auth?.firstname || "",
            lastname: auth?.lastname || "",
            dateOfBirth: birthdate || "",
            city: auth?.city || "",
        });
    }, [auth])

    useEffect(() => {
        setErrMsg('');
    }, [user, password])

    const updateProfile = async (updatedFields) => {
        if (!session) {
            console.error("Utilisateur non connecté !");
            return;
        }
        try {
            const response = await axios.patch(`${API_URL}/api/users/update/${auth._id}`,
                updatedFields,
                { withCredentials: true }
            )
            setMaj('Profil mis à jour !')
        } catch (error) {
            console.error("Erreur lors d'update du profil", error);
        }
    };

    const profilHandleChange = event => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    }

    const profilHandleSubmit = async (event) => {
        event.preventDefault();
        const cleanedData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== "")
        );
        await updateProfile(cleanedData); // Envoie uniquement les données modifiées
    };

    const connexionHandleChange = event => {
        const { name, value } = event.target
        setUser(prevUser => ({ ...prevUser, [name]: value }))
    }

    const connexionHandleSubmit = event => {
        event.preventDefault()
        login(user)
    }

    var departements;
    if(city) departements = Array.from(new Set(city.map(c => c.code?.slice(0, 2))))
                                .sort()
                                .map(d => ({ value: d, label: d }));


    return (
        <section className="container-static container-center">
            {session ? (
                <Card
                    title={auth?.username ? ('Bienvenue, ' + auth.username + ' !') : "Chargement..."}
                    msg={maj}
                    msgFinal={auth?.isSuscriber ? "Vous êtes membre." : "Vous n'êtes pas membre."}
                    submit={connexionHandleSubmit}
                    button={[
                        {
                            name: "Se déconnecter",
                            click: logout
                        },
                        {
                            name: "Modifier",
                            click: profilHandleSubmit
                        }
                    ]}
                    input={[
                        {
                            name: "Username",
                            id: "username",
                            value: formData.username,
                            placeholder: formData.username,
                            change: profilHandleChange,
                            isRequired: false
                        },
                        {
                            name: "Email",
                            id: "email",
                            value: formData.email,
                            placeholder: formData.email,
                            change: profilHandleChange,
                            isRequired: false
                        },
                        {
                            name: "Prénom",
                            id: "firstname",
                            value: formData.firstname,
                            placeholder: formData.firstname,
                            change: profilHandleChange,
                            isRequired: false
                        },
                        {
                            name: "Nom",
                            id: "lastname",
                            value: formData.lastname,
                            placeholder: formData.lastname,
                            change: profilHandleChange,
                            isRequired: false
                        },
                        {
                            name: "Date de naissance",
                            id: "dateOfBirth",
                            type: "date",
                            value: formData.dateOfBirth,
                            placeholder: formData.dateOfBirth,
                            change: profilHandleChange,
                            isRequired: false
                        },
                    ]}
                    select={[
                        {
                            name: "Métier",
                            id: "metier",
                            change : profilHandleChange,
                            isRequired: false,
                            placeholder: formData.metier,
                            selectedValue: formData.metier,
                            data: metiers?.map(m => ({ value: m.code_metier, label: m.libelle }))
                        },
                        {
                            name: "Département",
                            id: "departement",
                            change : profilHandleChange,
                            isRequired: false,
                            placeholder: formData.city?.slice(0, 2),
                            data: departements,
                            selectedValue: formData.departement,
                            nextSelect:[
                                {
                                    name: "Ville",
                                    id: "city",
                                    change : profilHandleChange,
                                    isRequired: false,
                                    placeholder: city.find(city => city.code == formData.city)?.nom || "Sélectionnez votre ville*",
                                    selectedValue: formData.city,
                                    data:   city?.filter(v => v.code.startsWith(formData.departement)) 
                                                .sort((a, b) => a.nom.localeCompare(b.nom))
                                                .map(v => ({
                                                    value: v.code,
                                                    label: `${v.nom} (${v.codesPostaux[0]})`
                                                }))
                                }
                            ]
                        }
                    ]}
                />
            ) : (
                <Card
                    title="Connexion"
                    linkName="Vous n'êtes pas inscrit·e ?"
                    link="/signup"
                    msg={errMsg}
                    buttonForm="Connexion"
                    submit={connexionHandleSubmit}
                    input={[
                        {
                            name: "Email",
                            id: "email",
                            change: connexionHandleChange,
                            isRequired: true
                        },
                        {
                            name: "Mot de passe",
                            id: "password",
                            type: "password",
                            change: connexionHandleChange,
                            isRequired: true
                        }
                    ]}
                />
            )}
        </section>
    )
}

export default Login