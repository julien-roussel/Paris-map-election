import React from 'react'
import { Outlet } from 'react-router'
import HeaderMap from './header/HeaderMap.jsx'
import Footer from './Footer'

const LayoutMap = () => {
  return (
    <main>
        <HeaderMap />
            <Outlet />
        <Footer />
    </main>
  )
}

export default LayoutMap