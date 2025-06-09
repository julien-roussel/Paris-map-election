import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";

// Contexte
import { useAuth } from "../../context/AuthContext"

// Component
import Card from '../../Components/Composition/Card';

const SignUp = () => {
    // Context
    const { signUp, auth, session, errMsg, setErrMsg, city } = useAuth();

    // State
    const [etape, setEtape] = useState(false);
    const [formData, setFormData] = useState({});
    
    const navigate = useNavigate();
    if(session) navigate('/login') 

    useEffect(() => {
        console.log(formData);
    }, [formData]);

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
                        name: "Username",
                        id: "username",
                        change: signUpHandleChange,
                        isRequired: true
                    },
                    {
                        name: "Email",
                        id: "email",
                        change: signUpHandleChange,
                        isRequired: true
                    },
                    {
                        name: "Mot de passe",
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
                    name: "Prénom",
                    id: "firstname",
                    change: signUpHandleChange,
                    isRequired: true
                },
                {
                    name: "Nom",
                    id: "lastname",
                    change : signUpHandleChange,
                    isRequired: true
                },
                {
                    name: "Date de naissance",
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
                    name: "Ville",
                    id: "city",
                    change : signUpHandleChange,
                    isRequired: true,
                    placeholder: "Sélectionnez votre ville",
                    data: city
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