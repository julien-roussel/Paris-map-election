import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";

// Contexte
import { useAuth } from "../../context/AuthContext"

// Component
import Card from '../../Components/Composition/Card';

const SignUp = () => {
    // Context
    const { signUp, auth, session, errMsg, setErrMsg } = useAuth();

    // State
    const [etape, setEtape] = useState(false);
    const [formData, setFormData] = useState({});
    
    const navigate = useNavigate();
    if(session) navigate('/login/') 

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
        const cleanedData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== "")
        );
        await signUp(cleanedData);
    }
        
  return (
    <section className="container container-center">
        { !etape && (
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
                        change : signUpHandleChange,
                        isRequired: true
                    }
                ]}
            />
        )}
        { etape && (
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
                    name: "Ville",
                    id: "city",
                    change : signUpHandleChange,
                    isRequired: false
                },
                {
                    name: "Date de naissance",
                    id: "dateOfBirth",
                    change : signUpHandleChange,
                    isRequired: false
                },
            ]}
        />
        )}
    </section>
  )
}

export default SignUp