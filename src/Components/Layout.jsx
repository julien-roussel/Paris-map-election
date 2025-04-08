import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './footer'

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