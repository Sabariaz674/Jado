import React from 'react'
import Hero from '../../components/userPagesComponents/about/hero'
import Features from '../../components/userPagesComponents/about/Features'
import AboutUs from '../../components/userPagesComponents/about/AboutUs'

import Reviews from '../../components/userPagesComponents/home/Reviews'
import ContactUs from '../../components/userPagesComponents/about/ContactUs'

function About() {
  return (
    <div>
      <Hero/>
      <Features/>
      <AboutUs/>
      <ContactUs/>
     <Reviews/>
    </div>
  )
}

export default About
