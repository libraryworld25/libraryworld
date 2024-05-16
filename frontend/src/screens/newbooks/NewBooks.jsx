import React from 'react'
import Cards from '../../components/cards/Cards'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

const NewBooks = () => {
    return (
        <>
            <Navbar />
            <div className='w-full h-full bg-gray-600 pt-16'>
                <h2 className='text-white w-4/5 m-auto text-4xl font-extrabold tracking-wider mt-10'>New to Store</h2>
                <hr className='w-4/5 m-auto border-b-2 border-white my-6' />
                <Cards title1={"Fictions"} title2={"Avengers"} title3={"Manga"} />
            </div>
            <Footer />
        </>
    )
}

export default NewBooks