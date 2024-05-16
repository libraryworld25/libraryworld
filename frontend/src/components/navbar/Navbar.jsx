import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import Sidebar from '../sidebar/Sidebar';
import { useSelector } from "react-redux"

const Navbar = () => {
    const { isUserLoggedIn } = useSelector(state => state.authReducer)
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const sidebarRef = useRef(null);
    const navigate = useNavigate()

    const openSidebar = () => {
        setSidebarVisible(true);
    };
    const closeSidebar = () => {
        setSidebarVisible(false);
    }

    useEffect(() => {
        setSidebarVisible(false);
    }, [])

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                closeSidebar();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [closeSidebar]);

    return (
        <nav className='fixed z-50 w-screen h-[8vh] flex justify-between items-center py-1 px-3 md:px-7 shadow-md bg-gray-100 text-black'>

            {/* menu bar */}
            <button className='text-black md:hidden' onClick={openSidebar}><HiMenu size="25px" /></button>

            {/* Logo */}
            <NavLink to="/" className='hidden md:flex h-5/6 justify-center items-center gap-3 px-3'>
                <p className='text-red-400 text-2xl font-extrabold'>Company</p>
            </NavLink>

            <div className='flex flex-row justify-end items-center h-full w-2/3 font-semibold text-lg '>


                {/* profile */}
                <div className={`flex flex-nowrap gap-2 items-center bg-teal-200 rounded-full p-2 px-4 ${!isUserLoggedIn ? 'w-[44vw] sm:w-[30vw] md:w-[26vw] lg:w-[13rem]' : 'w-fit'}`}>
                    {
                        isUserLoggedIn ?
                            <NavLink to="/profile" >
                                <FaUser size={25} />
                            </NavLink> :
                            <>
                                <NavLink to="/signup" >
                                    <p className='text-lg'>Signup</p>
                                </NavLink>
                                /
                                <NavLink to="/login" >
                                    <p className='text-lg'>Login</p>
                                </NavLink>
                            </>
                    }
                </div>

                {/* Navlinks */}
                <div className="px-3 text-center w-full hidden md:flex justify-center items-center" >
                    <ul className='w-full flex justify-evenly items-center gap-7'>
                        <li className='text-center'>
                            <NavLink to="/" >
                                Home
                            </NavLink>
                        </li>

                        <li className='text-center'>
                            <NavLink to="/about" >
                                About
                            </NavLink>
                        </li>

                        <li className='text-center'>
                            <NavLink to="/newbooks" >
                                New Books
                            </NavLink>
                        </li>

                        <li className='text-center'>
                            <NavLink to="/contact" >
                                Contact us
                            </NavLink>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Sidebar */}
            {sidebarVisible && <Sidebar closeSidebar={closeSidebar} />}
        </nav>
    )
}

export default Navbar;
