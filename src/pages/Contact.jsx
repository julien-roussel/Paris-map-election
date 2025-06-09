import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Contexte
import { useAuth } from "../context/AuthContext"

// Component
import Card from '../Components/Composition/Card';

const Contact = () => {
    // Context
    const { auth, loading, session, errMsg } = useAuth();
    
    // State
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("");
    const [objets, setObjets] = useState([
        {nom: "Signalez une erreur"},
        {nom: "Recherche d'informations"},
        {nom: "Autre"}
    ]) 

    //Handle
    const messageHandleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const messageHandleSubmit = async (e) => {
            e.preventDefault();

            try {
            const res = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erreur lors de l'envoi.");

            setStatus("Message envoyé !");
            setFormData({ titre: "", message: "", objet: "" });
        } catch (err) {
            setStatus(err.message);
        }
    };

    // Navigate
    const navigate = useNavigate();

    useEffect(() => {
        if (loading || !session) {
            //navigate("/login");
        }
    }, [loading, session, navigate]);

  return (
    <section className="container-static container-center">
        {session && (
            <Card
                title="Contactez-nous"
                subtitle="Vous voulez nous adresser un message ?"
                msg={errMsg}
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
        )}
    </section>
  )
}

export default Contact