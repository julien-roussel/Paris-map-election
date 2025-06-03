import React, { useContext } from 'react'
import { Link } from 'react-router';

// Componennt
import Logo from './Logo'
import SelectElection from '../select/SelectElection';
import SelectMap from '../select/SelectMap'

// Contexte
import { useAuth } from "../../context/AuthContext"

// SCSS
import './header.scss';

const HeaderMap = () => {
  const { session } = useAuth();

  return (
    <header>
      <Logo />
      <nav>
        <Link to='/'><div>Home</div></Link>
        <Link to='/analyse-map'><div>Carte</div></Link>
        <Link to='/about'><div>À propos</div></Link>
        <Link to='/login'><div>{session ? 'Compte' : 'Login'}</div></Link>
      </nav>
      <SelectMap />
      <SelectElection />
    </header>
  )
}

export default HeaderMap