import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Contexte
import { useAuth } from "../../context/AuthContext"

// Component
import Card from '../../Components/Composition/Card';

const LOCALHOST = import.meta.env.VITE_LOCALHOST;

const Verify = () => {
    // Context
    const { signUp, auth, session, errMsg, setErrMsg } = useAuth();
    
    // State
    const [status, setStatus] = useState('loading');
    const [firstname, setFirstname] = useState('loading');

    // Params
    const { token } = useParams();
    useEffect(() => {
        const verifySignUp = async () => {
            setStatus('loading')
            try {
                const { data, status } = await axios.get(`${LOCALHOST}/api/users/signup/verify/${token}`, {
                    withCredentials: true
                });
                
                if(status === 200) {
                    console.log(data);
                    setStatus('success')
                    setFirstname(data.firstname)
                }
            } catch(error) {
                console.log(error.message);
                setErrMsg('Votre token est mauvais.');
                setStatus('error')
            }
        };
        verifySignUp();
    }, [token]);

  return (
    <section className="container-static container-center">
        {status === 'loading' && (
            <Card 
                title="Chargement..."
                linkName="Revenir à la page d'accueil"
                link="/"
            />
        )} 
        {status === 'error' && (
            <Card 
                title="Une erreur s'est produite..."
                linkName="Renvoyez un nouveau mail de confirmation ?"
                link="/"
            />
        )}
        {status === 'success' && (
            <Card 
                title={'Bravo, ' + (firstname && firstname)}
                subtitle="Vous êtes maintenant inscrit·e !"
                linkName="Il ne reste plus qu'à vous connecter."
                link="/login"
            />
        )}
    </section>
  )
}

export default Verify