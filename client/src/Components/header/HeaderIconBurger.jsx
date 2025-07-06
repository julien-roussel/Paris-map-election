import React, { useState } from 'react'
import { Link } from 'react-router';

// Contexte
import { useAuth } from "../../context/AuthContext"

const HeaderIconBurger = (props) => {
    const { session } = useAuth();

    // State
    const [burgerMenu, setBurgerMenu] = useState(false);

    const handleClick = () => {
        if(!burgerMenu) { 
            setBurgerMenu(true) 
        } else {
            setBurgerMenu(false) 
        }
    }

  return (
    <div>
        <svg id="button-burger" onClick={handleClick} width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12H27.5M2 2H27.5M2 22H27.5" />
        </svg>
        <div id="container-burger-menu" className={burgerMenu ? 'activate' : ''}>
            <div className='container-menu'>
                <Link to='/'><div>Home</div></Link>
                <Link to='/analyse-map'><div>Carte</div></Link>
                <Link to='/about'><div>À propos</div></Link>
                <Link to='/login'><div>{session ? 'Compte' : 'Login'}</div></Link>
            </div>
        </div>  
    </div>
  )
}

export default HeaderIconBurger