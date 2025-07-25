import React, { useState, useContext } from 'react'
import { Link } from 'react-router';

// Componennt
import Logo from './Logo'
import HeaderIconBurger from './HeaderIconBurger';
import SelectElection from '../select/SelectElection';
import SelectMap from '../select/SelectMap'

// Contexte
import { useAuth } from "../../context/AuthContext"

// SCSS
import './header.scss';

const HeaderMap = () => {
  // Context
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
    <header id="header-map">
      <Logo />
      <nav>
        <Link to='/'><div>Home</div></Link>
        <Link to='/analyse-map'><div>Carte</div></Link>
        <Link to='/about'><div>À propos</div></Link>
        <Link to='/login'><div>{session ? 'Compte' : 'Connexion'}</div></Link>
      </nav>
      <HeaderIconBurger 
        onclick={handleClick}
      />
      <SelectMap />
      <SelectElection />
    </header>
  )
}

export default HeaderMap