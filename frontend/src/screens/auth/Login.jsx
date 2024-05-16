import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { ProgressBar } from "react-loader-spinner"
import { setCookie } from "../../utils/cookies.js"


const Login = () => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleLogin = async e => {
        e.preventDefault()
        const { email, password } = formData;
        setLoading(true)
        try {
            await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
                .then(res => res.json()) // Parse JSON here
                .then(result => {
                    console.log("response: ", result);
                    if (!(result.message === "Login successfull")) {
                        setLoading(false)
                        return alert(result.message)
                    }
                    dispatch({
                        type: "loginUser",
                        token: result.token
                    })
                    setCookie("hemangi", result.token)
                    setLoading(false)
                    return navigate("/")
                })
        } catch (error) {
            console.log(error);
            setLoading(false)
            return alert('Internal Server  Error')

        }
    }


    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center bg-white text-black'>
            <div className='w-5/6 md:w-2/6 h-fit bg-teal-200 rounded-xl p-3'>
                <h2 className='text-2xl font-bold my-3'>Welcome Back!</h2>
                <div className='bg-teal-400 rounded-lg p-2'>
                    <form onSubmit={!loading ? handleLogin : e => e.preventDefault()} className='flex flex-col gap-2'>

                        <div className='flex flex-row items-center gap-2 my-5'>
                            <div className='flex flex-col gap-4'>
                                <h3 className='text-md md:text-xl font-bold flex flex-nowrap items-center gap-2'><MdEmail /> Email: </h3>
                                <h3 className='text-md md:text-xl font-bold flex flex-nowrap items-center gap-2'><FaEyeSlash /> Password: </h3>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <input type="email" placeholder='email@example.com' name='email' onChange={handleChange} className='input' readOnly={loading ? true : false} required />
                                <input type="password" placeholder='password' name='password' onChange={handleChange} className='input' readOnly={loading ? true : false} required />
                            </div>
                        </div>
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
                                    /> : "LOGIN"
                            }
                        </button>
                        <div className='flex flex-nowrap justify-between items-center'>
                            <NavLink to="/signup" >
                                <p className='text-blue-700 my-2'>New user?</p>
                            </NavLink>
                            <NavLink to="/forgot" >
                                <p className='text-blue-700 my-2'>Forgot password?</p>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Login