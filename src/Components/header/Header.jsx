import React, { useContext } from 'react'
import { Link } from 'react-router';

// Componennt
import Logo from './Logo'
import SelectElection from '../../Components/select/SelectElection';
import SelectMap from '../../Components/select/SelectMap'

// Contexte
import AuthContext from '../../context/AuthContext.jsx';

// SCSS
import './header.scss';

const Header = () => {
  const { session } = useContext(AuthContext)

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

export default Header