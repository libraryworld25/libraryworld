import React, { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { FaUser, FaTimes } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { AiFillProject } from "react-icons/ai";

const Sidebar = ({ closeSidebar }) => {
    const sidebarRef = useRef(null);
    const navigate = useNavigate();

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
        <section ref={sidebarRef} className='w-[65%] h-screen fixed left-0 top-0 bg-gray-200 z-10 shadow-lg px-2 '>
            <button className='bg-none font-bold text-2xl m-2' onClick={closeSidebar}><FaTimes /></button>
{/* 
            <NavLink to="/" className='flex flex-col h-fit justify-center items-center gap-1 bg-gray-300 rounded-3xl px-3 py-2'>
                <img className='w-1/5 animate-pulse' src="/images/logo.png" alt="hemangi" />
                <p className='text-black font-bold'>Company</p>
            </NavLink> */}
            
            <NavLink to="/" className='flex flex-col h-fit justify-center items-center gap-1 bg-gray-300 rounded-3xl px-3 py-2'>
                <p className='text-red-400 text-2xl font-extrabold'>Company</p>
            </NavLink>

            <ul className='mt-5 w-full flex flex-col justify-start items-center gap-6'>

                <li className='text-center w-[90%]'>
                    <NavLink to="/" className="flex flex-nowrap items-center font-bold text-xl w-full justify-start gap-3">
                        <HiHome size={18} />Home
                    </NavLink>
                </li>

                <li className='text-center w-[90%]'>
                    <NavLink to="/about" className="flex flex-nowrap items-center font-bold text-xl w-full justify-start gap-3">
                        <FaUser size={18} />About
                    </NavLink>
                </li>

                <li className='text-center w-[90%]'>
                    <NavLink to="/newbooks" className="flex flex-nowrap items-center font-bold text-xl w-full justify-start gap-3">
                        <AiFillProject size={18} />New Books
                    </NavLink>
                </li>

                <li className='text-center w-[90%]'>
                    <NavLink to="/contact" className="flex flex-nowrap items-center font-bold text-xl w-full justify-start gap-3">
                        <RiContactsFill /> Contact us
                    </NavLink>
                </li>

            </ul>
        </section>
    )
}

export default Sidebar;
