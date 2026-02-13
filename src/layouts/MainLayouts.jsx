import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../components/NavBar'

function MainLayouts() {
  return (
    <div className="mainlayout bg-gray-900 min-h-screen">
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default MainLayouts