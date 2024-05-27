import React from 'react'
import { FaGithub, FaGitlab, FaTelegram } from "react-icons/fa";
import { PiMatrixLogoFill } from "react-icons/pi";
import { HiLocationMarker } from "react-icons/hi";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { BiLogoInstagramAlt } from "react-icons/bi";

const Footer = () => {
    return (
        <div className='w-screen bg-teal-950 p-5 text-white' id="#contact">
            <h3 className='text-2xl font-bold'>Social Links</h3>
            <hr className='w-1/5 border-b-2 border-red-600 mt-2 mb-6' />
            <div className='flex flex-nowrap text-3xl gap-4 *:size-10'>
                <a href="http://github.com/">
                    <FaGithub />
                </a>
                <a href="http://t.me/">
                    <FaTelegram />
                </a>
                <a href="https://instagram.com/">
                    <BiLogoInstagramAlt />
                </a>
            </div>

            <hr className='border-gray-400 my-8' />
            <div className='flex w-full *:w-full my-2 flex-col flex-nowrap text-xl *:size-10'>
                <h3 className='text-2xl font-bold'>Contact us</h3>
                <p className='flex flex-nowrap items-center gap-1'><HiLocationMarker /> Location</p>
                <p className='flex flex-nowrap items-center gap-1'><IoCall />Call +91-9878786543</p>
                <p className='flex flex-nowrap items-center gap-1'><MdEmail />librariesworld25@gmail.com</p>
            </div>
            <p className='text-orange-400'>Copyright ©2024. All Rights Reserved.</p>
        </div>
    )
}

export default Footer
