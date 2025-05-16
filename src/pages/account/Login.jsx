import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router';

// Contexte
import AuthContext from '../../context/AuthContext.jsx';

// CSS
import stylesAccount from './account.module.scss';

const Login = (dataForm) => {
    const [user, setUser] = useState({});
    const { login, logout, auth, session } = useContext(AuthContext)

    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [user, password])

    const handleChange = event => {
        const { name, value } = event.target
        setUser(prevUser => ({...prevUser, [name]: value }))
    }

    const handleSubmit = event => {
        event.preventDefault()
        login(user)
    }

  return (
    <section className="container container-center">
        {session ? (
            <div className=''>
                <header>
                    <h1 className='title-H'>Bienvenue, {auth?.username ? auth.username + ' !' : "Chargement..."} </h1>
                </header>
                <hr></hr>
                <form>
                    <div className='form-input'>
                        <label htmlFor='username'>Username : </label>
                        <input
                            id="username"
                            name="username"
                            value={auth?.username}  
                            placeholder={auth?.username}  
                            required
                        />
                    </div>
                    <div className='form-input'>
                        <label htmlFor='email'>Email : </label>
                        <input
                            id="email"
                            name="email"
                            value={auth?.email}  
                            placeholder={auth?.email}  
                            required
                        />
                    </div>
                    <hr></hr>
                    <div className='form-input'>
                        <label htmlFor='firstname'>Prénom : </label>
                        <input
                            id="firstname"
                            name="firstname"
                            value={auth?.firstname}  
                            placeholder={auth?.firstname}  
                            required
                        />
                    </div>
                    <div className='form-input'>
                        <label htmlFor='lastname'>Nom : </label>
                        <input
                            id="lastname"
                            name="lastname"
                            value={auth?.lastname}  
                            placeholder={auth?.lastname}  
                            required
                        />
                    </div>
                </form>
                <hr></hr>
                <button onClick={logout}>Se déconnecter</button>
            </div>
        ) : (
            <div className={stylesAccount.card}>
                <p className={errMsg ? "errmsg" : "offscren"}>{errMsg}</p>
                <h1>Connexion</h1>
                <form onSubmit={handleSubmit}>
                    <div className='list-group-item p-2'>
                        <label htmlFor="email" className='p-2'>Email: </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='list-group-item p-2'>
                        <label htmlFor="password" className='p-2'>Password: </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
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