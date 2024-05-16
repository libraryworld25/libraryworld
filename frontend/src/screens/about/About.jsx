import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import AboutComp from '../../components/about/AboutComp'
import Footer from '../../components/footer/Footer'

const About = () => {
    return (
        <>
            <Navbar />

            <div className='w-full h-full bg-gray-800 pt-20 pb-5 *:text-white'>
                <AboutComp />
            </div>

            <Footer />
        </>
    )
}

export default About