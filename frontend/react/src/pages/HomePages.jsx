import React from 'react'
import LandingImage from '../components/homepage/LandingImage'
import Jobs from '../components/homepage/Jobs'
import Browse from '../components/homepage/Browse'
import Details from '../components/homepage/Details'
import Photo from '../components/homepage/Photo'
import Testimonials from '../components/homepage/Testimonials'
import Blog from '../components/homepage/Blog'
import Footer from '../components/homepage/Footer'
import Job from '../components/homepage/Job'

export default function HomePages() {
  
  return (
    <>
    <LandingImage/>
    <Jobs/>
    <Browse/>
    <Details/>
    <Photo/>
    <Testimonials/>
    <Blog/>
    <Footer/>
    
    </>
  )
}
