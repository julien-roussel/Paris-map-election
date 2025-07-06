import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";

// Contexte
import { useAuth } from "../../context/AuthContext"

// Component
import Card from '../../Components/Composition/Card';

const SignUp = () => {
    // Context
    const { signUp, auth, session, errMsg, loading, city, metiers, loadMetiers } = useAuth();

    // State
    const [etape, setEtape] = useState(false);
    const [formData, setFormData] = useState({});
    
    // Navigate
    const navigate = useNavigate();

    

    useEffect(() => {
        loadMetiers();
    }, [])
    
    useEffect(() => {
        console.log(formData);
    }, [formData])

    useEffect(() => {
        if (loading && !session) {
            navigate("/login");
        }
    }, [loading, session, navigate]); 

    var departements;
    if(city) departements = Array.from(new Set(city.map(c => c.code.slice(0, 2))))
                                .sort()
                                .map(d => ({ value: d, label: d }));

    const etapeHandleSubmit = async (event) => { 
        event.preventDefault(); 
        if(!formData.email || !formData.password) return;
        setEtape(true)
    }

    const signUpHandleChange = event => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    }

    const signUpHandleSubmit = async (event) => {
        event.preventDefault(); 
        const cleanedData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== "")
        );
        await signUp(cleanedData);
    }
        
  return (
    <section className="container-static container-center">
        { !session && !etape && (
            <Card 
                title="Inscrivez-vous"
                linkName="Vous êtes déjà inscrit·e ?"
                link="/login"
                msg={errMsg}
                buttonForm="Confirmez"
                submit={etapeHandleSubmit}
                input={[
                    {
                        name: "Username*",
                        id: "username",
                        change: signUpHandleChange,
                        isRequired: true
                    },
                    {
                        name: "Email*",
                        id: "email",
                        change: signUpHandleChange,
                        isRequired: true
                    },
                    {
                        name: "Mot de passe*",
                        id: "password",
                        type: "password",
                        change : signUpHandleChange,
                        isRequired: true
                    }
                ]}
            />
        )}
        { !session && etape && (
            <Card 
            title="Dites-nous en plus ?"
            linkName="Vous êtes déjà inscrit·e ?"
            link="/login"
            msg={errMsg}
            buttonForm="Confirmez"
            submit={signUpHandleSubmit}
            input={[
                {
                    name: "Prénom*",
                    id: "firstname",
                    change: signUpHandleChange,
                    isRequired: true
                },
                {
                    name: "Nom*",
                    id: "lastname",
                    change : signUpHandleChange,
                    isRequired: true
                },
                {
                    name: "Date de naissance*",
                    id: "dateOfBirth",
                    type: "date",
                    min: "1900-01-01",
                    max: "2008-01-01",
                    change : signUpHandleChange,
                    isRequired: true
                },
            ]}
            select={[
                {
                    name: "Métier",
                    id: "metier",
                    change : signUpHandleChange,
                    isRequired: true,
                    placeholder: "Votre métier",
                    selectedValue: formData.metier,
                    data: metiers.map(m => ({ value: m.code_metier, label: m.libelle }))
                },
                {
                    name: "Département",
                    id: "departement",
                    change : signUpHandleChange,
                    isRequired: true,
                    placeholder: "Département*",
                    data: departements,
                    selectedValue: formData.departement,
                    nextSelect:[
                        {
                            name: "Ville",
                            id: "city",
                            change : signUpHandleChange,
                            isRequired: true,
                            placeholder: "Sélectionnez votre ville*",
                            selectedValue: formData.city,
                            data:   city.filter(v => v.code.startsWith(formData.departement)) 
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
        )}
        { session && (
            <Card 
                title="Il reste une étape"
                subtitle="Validez votre inscription par mail."
                linkName="Revenir à la page d'accueil"
                link="/"
            />
        )}
    </section>
  )
}

export default SignUp