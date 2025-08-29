import React from 'react'
import Hero from '../../components/userPagesComponents/about/hero'
import Features from '../../components/userPagesComponents/about/Features'
import AboutUs from '../../components/userPagesComponents/about/AboutUs'
import More from '../../components/userPagesComponents/about/More'
import Reviews from '../../components/userPagesComponents/home/Reviews'

function About() {
  return (
    <div>
      <Hero/>
      <Features/>
      <AboutUs/>
      <More/>
     <Reviews/>
    </div>
  )
}

export default About
