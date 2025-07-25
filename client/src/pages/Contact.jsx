import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Contexte
import { useAuth } from "../context/AuthContext"

// Component
import Card from '../Components/Composition/Card';

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
    // Context
    const { auth, loading, session, setIsLoading } = useAuth();
    
    // State
    const [formData, setFormData] = useState({ titre: "", message: "", objet: "" });
    const [msg, setMsg] = useState("");

    const [objets, setObjets] = useState([
        {nom: "Signalez une erreur"},
        {nom: "Recherche d'informations"},
        {nom: "Autre"}
    ]) 

    //Handle
    const messageHandleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const messageHandleSubmit = async (e) => {
            e.preventDefault();
            
            setIsLoading(true)
            try {
                const res = await axios.post(`${API_URL}/api/contact/message/${auth._id}`,
                            formData,
                            { withCredentials: true }
                );

            if (res.status === 200) {                
                setMsg("Le message a été envoyé avec succès !")
                setFormData({ titre: "", message: "", objet: "" });
            } else {
                setMsg("Une erreur est survenue.")
            }
        } catch (err) {
            setMsg("Le message n'a pas pu s'envoyer.")
        } finally {
            setIsLoading(false);
        }

    };

    // Navigate
    const navigate = useNavigate();

    useEffect(() => {
        if(!loading) {
            return
        } else if (!auth) {
            navigate("/login");
        }
    }, [loading, auth, navigate]);
    
  return (
    <section className="container-static container-center">
        {session ? (
            <Card
                title="Contactez-nous"
                subtitle="Vous voulez nous adresser un message ?"
                msg={msg}
                buttonForm="Confirmez"
                submit={messageHandleSubmit}
                input={[
                    {
                        name: "Titre",
                        id: "titre",
                        type: "textarea",
                        change: messageHandleChange,
                        isRequired: true
                    }
                ]}
                select={[
                    {
                        name: "objet",
                        id: "objet",
                        change : messageHandleChange,
                        isRequired: true,
                        placeholder: "Sélectionnez un objet",
                        data: objets
                    }
                ]}
                textArea={[
                    {
                        name: "message",
                        id: "message",
                        rows: 5,
                        change : messageHandleChange,
                        isRequired: true
                    }
                ]}
            />
        ) : (
            <Card
                title="Connectez-vous"
                subtitle="Pour nous adresser un message"
                linkName="Se connecter"
                link="/login"
            />
        )}
    </section>
  )
}

export default Contact