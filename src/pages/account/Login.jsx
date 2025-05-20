import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router';
import axios from 'axios';
const LOCALHOST = import.meta.env.VITE_LOCALHOST;

// Contexte
import { useAuth } from "../../context/AuthContext"

// CSS
import stylesAccount from './account.module.scss';

const Login = (dataForm) => {
    // Context
    const { login, logout, auth, session } = useAuth();
    
    // State
    const [user, setUser] = useState({});
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [maj, setMaj] = useState(false);
    const [formData, setFormData] = useState({});
    const [birthdate, setBirthdate] = useState('');

    const formatDate = (date) => {
        const isoDate = date
        return isoDate.split('T')[0];
    };

    useEffect(() => {
        if(auth) {
            setBirthdate(formatDate(auth?.dateOfBirth))
        }    

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
            const response = await axios.patch(`${LOCALHOST}/api/users/update/${auth._id}`, 
                updatedFields,
                {withCredentials: true}
            )   
            setMaj(true)
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
        setUser(prevUser => ({...prevUser, [name]: value }))
    }

    const connexionHandleSubmit = event => {
        event.preventDefault()
        login(user)
    }

    

  return (
    <section className="container container-center">
        {session ? (
            <div className='card'>
                <hr></hr>
                <h1 className='title-H'>Bienvenue, {auth?.username ? auth.username + ' !' : "Chargement..."} </h1>
                <form className={stylesAccount.form}>
                    <div className={stylesAccount.formDouble}>
                        <div className={stylesAccount.formInput}>
                            <label htmlFor='username'>Username : </label>
                            <input
                                id="username"
                                name="username"
                                value={formData?.username}  
                                placeholder={formData?.username}  
                                onChange={profilHandleChange}
                                required
                            />
                        </div>
                        <div className={stylesAccount.formInput}>
                            <label htmlFor='email'>Email : </label>
                            <input
                                id="email"
                                name="email"
                                value={formData?.email}  
                                placeholder={formData?.email}  
                                onChange={profilHandleChange}
                                required
                            />
                        </div>
                    </div>
                    <hr></hr>
                    <div className={stylesAccount.formDouble}>
                        <div className={stylesAccount.formInput}>
                            <label htmlFor='firstname'>Prénom : </label>
                            <input
                                id="firstname"
                                name="firstname"
                                value={formData?.firstname}  
                                placeholder={formData?.firstname}  
                                onChange={profilHandleChange}
                                required
                                />
                        </div>
                        <div className={stylesAccount.formInput}>
                            <label htmlFor='lastname'>Nom : </label>
                            <input
                                id="lastname"
                                name="lastname"
                                value={formData?.lastname}  
                                placeholder={formData?.lastname} 
                                onChange={profilHandleChange} 
                                required
                                />
                        </div>
                    </div>
                    <div className={stylesAccount.formDouble}>
                        <div className={stylesAccount.formInput}>
                            <label htmlFor='city'>Ville : </label>
                            <input
                                id="city"
                                name="city"
                                value={formData?.city}  
                                placeholder={formData?.city} 
                                onChange={profilHandleChange} 
                                required
                                />
                        </div>
                        <div className={stylesAccount.formInput}>
                            <label htmlFor='date-of-birth'>Date de naissance : </label>
                            <input
                                id="date-of-birth"
                                name="date-of-birth"
                                value={formData?.dateOfBirth}  
                                placeholder={formData?.dateOfBirth} 
                                onChange={profilHandleChange} 
                                required
                                />
                        </div>
                    </div>
                    <hr></hr>
                    <div>
                        <h5>{auth?.isSuscriber ? "Vous êtes membre." : "Vous n'êtes pas membre."}  </h5>
                        <span>{maj === true ? 'Profil mis à jour !' : ''}</span>
                    </div>
                </form>
                <hr></hr>
                <div className='container-buttons'>
                    <button className="button dark-button" onClick={logout}>Se déconnecter</button>
                    <button className="button dark-button" onClick={profilHandleSubmit}>Sauvegarder</button>
                </div>
            </div>
        ) : (
            <div className='card'>
                <p className={errMsg ? "errmsg" : "offscren"}>{errMsg}</p>
                <h1>Connexion</h1>
                <form className={stylesAccount.form} onSubmit={connexionHandleSubmit}>
                    <div className={stylesAccount.formInput}>
                        <label htmlFor="email" className='p-2'>Email: </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={connexionHandleChange}
                            required
                        />
                    </div>
                    <div className={stylesAccount.formInput}>
                        <label htmlFor="password" className='p-2'>Password: </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={connexionHandleChange}
                            required
                        />
                    </div>
                    <button className=''>Connexion</button>
                </form>
                <Link to='/register'> Vous n'êtes pas inscrits ? </Link>
            </div>
        )}     
    </section>
  )
}

export default Login