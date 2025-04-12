import React from 'react'
import { Link } from 'react-router';

// Componennt
import Logo from './Logo'

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
      </nav>
    </header>
  )
}

export default Header