import React from 'react'
import Navbar from '../components/navbar'
import HeroHeader from '../components/Heroheader'
import Sidebar from '../components/sidebar'
import Heroheader from '../components/Heroheader'

const homePage = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <Heroheader/>
    </div>
  )
}

export default homePage
