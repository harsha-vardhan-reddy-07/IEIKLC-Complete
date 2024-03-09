import React from 'react'
import '../styles/Home.css'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Amenities from '../components/home/Amenities'
import Events from '../components/home/Events'
import Applications from '../components/home/Applications'
import Contact from '../components/home/Contact'
import Navbar  from '../components/Navbar'

const Home = () => {
  return (
    <>
    <Navbar />
    <div className='HomePage' id='Home'>
      <Hero />
      <About />
      <Amenities />
      <Events />
      <Applications />
      <Contact />
    </div>
    </>
  )
}

export default Home