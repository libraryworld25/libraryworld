import React, { useEffect } from 'react';
import '../../App.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { RiArrowUpWideFill } from "react-icons/ri";
import { FaGlobeAsia } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { BsPeopleFill } from "react-icons/bs";
import AboutComp from '../../components/about/AboutComp';
import autoLogin from '../../utils/autoLogin.js'
import { useSelector, useDispatch } from "react-redux"
import Contact from '../../components/footer/Contact.jsx';
import Cards from '../../components/cards/Cards.jsx';

function Home() {
    const { isUserLoggedIn } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        autoLogin(isUserLoggedIn, dispatch)
    }, []);

    return (
        <>
            <Navbar />

            {/* wrapper */}
            <div className='flex flex-col w-screen snap-x snap-mandatory *:snap-start *:text-white'>
                {/* section 1 */}
                <div className='w-full h-full pt-10'>
                    <img className='w-screen h-screen brightness-50 saturate-50 object-cover' src="/images/front.jpg" alt="front library" />

                    <div className='flex flex-col justify-center items-center gap-5 absolute m-auto h-screen w-full top-0 left-0  *:w-fit *:font-extrabold'>
                        <h1 className='text-2xl md:text-[4rem] md:h-12 text-center drop-shadow-lg'>
                            Libraries World
                        </h1>
                        <p className='text-sm md:text-xl text-center drop-shadow-lg'>The journey of a lifetime starts with the turning of a page</p>
                    </div>
                </div>

                {/* empty transparent block */}
                {/* <div className='w-full h-[95vh] invisible'>

                </div> */}

                {/* section 2 */}
                <div className='w-full h-full pb-5 bg-gray-800 pt-10'>
                    <AboutComp />
                </div>

                {/* section 3 */}
                <div className='w-screen md:w-full max-md:w-screen h-full bg-gray-100 *:text-black '>
                    <h2 className='w-4/5 m-auto text-4xl font-extrabold tracking-wider mt-10'>Famous Books</h2>
                    <hr className='w-4/5 m-auto border-b-2 border-black my-6' />
                    <Cards title1={"Charles Babbage"} title2={"Game Dot"} title3={"Racers Life"} />
                </div>

                {/* section 4 */}
                <div className='w-full h-full bg-gray-600'>
                    <h2 className='w-4/5 m-auto text-4xl font-extrabold tracking-wider mt-10'>New to Store</h2>
                    <hr className='w-4/5 m-auto border-b-2 border-white my-6' />
                    <Cards title1={"Fictions"} title2={"Avengers"} title3={"Manga"} />
                </div>

                {/* section 5 */}
                <div className='w-full h-[70%] bg-gray-100 *:text-black'>
                    <h2 className='w-4/5 m-auto text-4xl font-extrabold tracking-wider mt-10'>Our statistics</h2>
                    <hr className='w-4/5 m-auto border-b-2 border-black my-6' />
                    <div className='md:w-[90%] flex flex-col md:flex-row flex-nowrap justify-evenly items-center m-auto text-xl p-3 gap-5'>
                        <div className='w-[80%] md:w-1/5 flex flex-col gap-3 p-5 '>
                            <FaGlobeAsia className='text-[5rem]' />
                            <div className='flex flex-col gap-1'>
                                <h3 className='text-2xl font-extrabold'>Total Readers</h3>
                                <h2 className='text-3xl md:text-4xl font-extrabold'>1000+</h2>
                            </div>
                            <button className='bg-gray-400 font-semibold text-lg p-3 shadow-md hover:bg-blue-600 hover:shadow-xl transition-all text-white'>Explore</button>
                        </div>
                        <div className='w-[80%] md:w-1/5 flex flex-col gap-3 p-5 '>
                            <GiTrophyCup className='text-[5rem]' />
                            <div className='flex flex-col gap-1'>
                                <h3 className='text-2xl font-extrabold'>Awards</h3>
                                <h2 className='text-3xl md:text-4xl font-extrabold'>70+</h2>
                            </div>
                            <button className='bg-gray-400 font-semibold text-lg p-3 shadow-md hover:bg-red-600 hover:shadow-xl transition-all text-white'>Explore</button>
                        </div>
                        <div className='w-[80%] md:w-1/5 flex flex-col gap-3 p-5 '>
                            <BsPeopleFill className='text-[5rem]' />
                            <div className='flex flex-col gap-1'>
                                <h3 className='text-2xl font-extrabold'>Reviews</h3>
                                <h2 className='text-3xl md:text-4xl font-extrabold'>700+</h2>
                            </div>
                            <button className='bg-gray-400 font-semibold text-lg p-3 shadow-md hover:bg-red-600 hover:shadow-xl transition-all text-white'>Explore</button>
                        </div>
                    </div>
                </div>

                {/* section 6 */}
                <div className='w-full h-full py-5 bg-gray-800 pt-10 *:text-black'>
                    <Contact />
                </div>

                {/* footer */}
                <Footer />
            </div>

        </>
    );
}

export default Home;
