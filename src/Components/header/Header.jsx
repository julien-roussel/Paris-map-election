import React from 'react'
import { Link } from 'react-router';

// Componennt
import Logo from './Logo'
import SelectElection from '../../Components/select/SelectElection';
import SelectMap from '../../Components/select/SelectMap'

// SCSS
import './header.scss';

const Header = () => {
  return (
    <header>
      <Logo />
      <nav>
        <Link to='/'><div>Home</div></Link>
        <Link to='/analyse-map'><div>Carte</div></Link>
        <Link to='/about'><div>About</div></Link>
        <Link to='/login'><div>Login</div></Link>
      </nav>
      <SelectMap />
      <SelectElection />
    </header>
  )
}

export default Header