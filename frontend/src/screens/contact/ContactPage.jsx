import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import Contact from '../../components/footer/Contact'

const ContactPage = () => {
    return (
        <>
            <Navbar />
            <div className='bg-gray-800 w-full h-full pb-14 pt-20 *:text-black'>
                <Contact />
            </div>
            <Footer />
        </>
    )
}

export default ContactPage