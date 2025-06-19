import React, { useState, useContext } from 'react'
import { Link } from 'react-router';

// Componennt
import Logo from './Logo'
import HeaderIconBurger from './HeaderIconBurger';

// Contexte
import { useAuth } from "../../context/AuthContext"

// SCSS
import './header.scss';

const Header = () => {
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
    <header>
      <Logo />
      <nav>
        <Link to='/'><div>Home</div></Link>
        <Link to='/analyse-map'><div>Carte</div></Link>
        <Link to='/about'><div>À propos</div></Link>
        <Link to='/login'><div>{session ? 'Compte' : 'Login'}</div></Link>
      </nav>
      <HeaderIconBurger 
        onclick={handleClick}
        />
    </header>
  )
}

export default Header