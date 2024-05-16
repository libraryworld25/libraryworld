import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { ProgressBar } from "react-loader-spinner"
import { useDispatch } from "react-redux"
import { setCookie } from "../../utils/cookies.js"

const Signup = () => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp] = useState(Math.floor(Math.random() * 1000000));
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSignup = async e => {
        e.preventDefault()
        const { email, name, username, password, userOtp } = formData;
        if (otp !== +userOtp) {
            return alert("Invalid Otp.")
        }
        setLoading(true)
        try {
            await fetch(`${process.env.REACT_APP_BASE_URL}/Signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, username, email, password })
            })
                .then(res => res.json())
                .then(result => {
                    dispatch({
                        type: "loginUser",
                        token: result.token
                    })
                    setCookie("hemangi", result.token)
                    setLoading(false)
                    return navigate("/")
                })

        } catch (error) {
            setLoading(false)
            return alert("Error signing up.")
        }
    }

    const handleSentOtp = async e => {
        e.preventDefault()
        const { email, username, password, cPassword } = formData;
        if (password !== cPassword) {
            return alert("Passwords do not match.");
        }

        if (password.length <= 6) {
            return alert("Weak Password");
        }

        setLoading(true)
        try {
            await fetch(`${process.env.REACT_APP_BASE_URL}/send-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    subject: "!! Library's Portfolio Verification !!",
                    msg: `Your one time verification password is ${otp}.`,
                    type: "signup",
                    username
                })
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    if (!(result?.message === "Message sent successfully")) {
                        setLoading(false)
                        return alert(result.message)
                    }
                    setLoading(false)
                    return setIsOtpSent(true)
                })

        } catch (error) {
            console.log(error);
            setLoading(false)
            return alert('Errors sending the otp.')
        }
    }

    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center bg-white text-black'>
            <div className='w-5/6 md:w-2/6 h-fit bg-teal-200 rounded-xl p-3'>
                <h2 className='text-2xl font-bold my-3'>Signup Now</h2>
                <div className='bg-teal-400 rounded-lg p-2'>
                    <form
                        onSubmit={
                            !loading ?
                                isOtpSent ?
                                    handleSignup : handleSentOtp
                                : e => e.preventDefault()
                        }
                        className='flex flex-col gap-2'>

                        <div className='flex flex-row items-center gap-2'>
                            <div className='flex flex-col gap-4'>
                                <h3 className='text-md md:text-xl font-bold flex flex-nowrap items-center gap-2'><FaUser /> Name: </h3>
                                <h3 className='text-md md:text-xl font-bold flex flex-nowrap items-center gap-2'><FaUserTag /> Username: </h3>
                                <h3 className='text-md md:text-xl font-bold flex flex-nowrap items-center gap-2'><MdEmail /> Email: </h3>
                                <h3 className='text-md md:text-xl font-bold flex flex-nowrap items-center gap-2'><FaEyeSlash /> Password: </h3>
                                <h3 className='text-md md:text-xl font-bold flex flex-nowrap items-center gap-2'><FaEyeSlash /> Confirm Password: </h3>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <input type="text" placeholder='your name' name='name' onChange={handleChange} className='input' readOnly={loading ? true : isOtpSent ? true : false} required
                                />
                                <input type="text" placeholder='username' name='username' onChange={handleChange} className='input'
                                    readOnly={loading ? true : isOtpSent ? true : false} required />
                                <input type="email" placeholder='email@example.com' name='email' onChange={handleChange} className='input'
                                    readOnly={loading ? true : isOtpSent ? true : false} required />
                                <input type="password" placeholder='password' name='password' onChange={handleChange} className='input'
                                    readOnly={loading ? true : isOtpSent ? true : false} required />
                                <input type="password" placeholder='confirm password' name='cPassword' onChange={handleChange} className='input'
                                    readOnly={loading ? true : isOtpSent ? true : false} required />
                            </div>
                        </div>

                        {isOtpSent && <div className='bg-teal-200 p-2 m-2 rounded-xl flex flex-col gap-2'>
                            <h3 className='text-xl font-bold flex flex-nowrap items-center gap-2'><RiLockPasswordFill /> Enter OTP: </h3>
                            <input type="number" placeholder='OTP' className='input' name='userOtp' onChange={handleChange}
                                readOnly={loading ? true : false} required />
                        </div>}

                        <button className='text-md md:text-lg font-bold py-2 px-3 bg-black text-white rounded-xl shadow-md hover:cursor-pointer hover:shadow-lg hover:bg-teal-900 w-full h-12 flex justify-center items-center' type="submit">
                            {
                                loading ?
                                    <ProgressBar
                                        visible={true}
                                        width="100"
                                        borderColor='white'
                                        barColor='teal'
                                        color="#4fa94d"
                                        ariaLabel="infinity-spin-loading"
                                    /> : isOtpSent ? "VERIFY" : "SIGN UP"
                            }
                        </button>

                        <NavLink to="/login" >
                            <p className='text-blue-700 my-2'>Already have an account?</p></NavLink>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup