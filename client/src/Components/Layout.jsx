import React from 'react'
import { Outlet } from 'react-router'
import Header from './header/Header.jsx'
import Footer from './Footer'

const Layout = () => {
  return (
    <main>
        <Header />
            <Outlet />
        <Footer />
    </main>
  )
}

export default Layout