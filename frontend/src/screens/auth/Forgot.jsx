import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useSelector } from 'react-redux';
import { ProgressBar } from "react-loader-spinner"


const Forgot = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [formData, setFormData] = useState({
        userOtp: "",
        cpassword: "",
        password: "",
        email: ""
    })
    const [loading, setLoading] = useState(false)
    const [otp] = useState(Math.floor(Math.random() * 1000000))
    const { isUserLoggedIn } = useSelector(state => state.authReducer)
    const navigate = useNavigate()

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })


    const handleSendOtp = async e => {
        e.preventDefault()
        const { email } = formData;
        setLoading(true)
        try {
            await fetch(`${process.env.REACT_APP_BASE_URL}/send-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    subject: "!! Library's Portfolio Verification !!",
                    msg: `Your one time verification password is ${otp}.`,
                    type: "forget"
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


    const handleChangePass = async e => {
        e.preventDefault()
        setLoading(true);
        const { email, password, cpassword, userOtp } = formData;
        if (otp !== +userOtp) {
            setLoading(false)
            return alert("Passwords does not match.")
        }
        if (password !== cpassword) {
            setLoading(false)
            return alert("Passwords does not match.")
        }

        if (password.length <= 5) {
            setLoading(false)
            return alert("Weak password.")
        }
        try {
            let res = await fetch(`${process.env.REACT_APP_BASE_URL}/update-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email, password
                })
            })
            let result = await res.json();
            console.log(result.message);
            setLoading(false)
            if (result.message === "Password updated successfully.") {
                alert(result.message);
            } else {
                alert(result.message)
                if (result.message === "New password is same as your current password.") {
                    return setLoading(false)
                }
            }
            return isUserLoggedIn ?
                navigate("/") : navigate("/login")
        } catch (error) {
            console.log(error);
            alert("Unable to update password.")
            return setLoading(false)
        }

    }


    return (
        <>
            <div className='w-screen h-screen flex flex-col items-center justify-center bg-white text-black'>
                <div className='w-5/6 md:w-2/6 h-fit bg-teal-200 rounded-xl p-3'>
                    <h2 className='text-2xl font-bold my-3'>Forgot Password?</h2>
                    <div className='bg-teal-400 rounded-lg p-2'>
                        <form className='flex flex-col gap-2' onSubmit={!loading ? isOtpSent ? handleChangePass : handleSendOtp : e => e.preventDefault()}>

                            {
                                !isOtpSent ?
                                    <>
                                        <h2 className='w-full h-fit text-wrap text-center'>Enter your email to get verification code.</h2>
                                        <div className='bg-teal-400 p-2 m-2 rounded-xl flex flex-col gap-2'>
                                            <h3 className='text-xl font-bold flex flex-nowrap items-center gap-2'><MdEmail /> Enter Email: </h3>
                                            <input type="email" placeholder='email@example.com' className='input' name='email'
                                                value={formData.email}
                                                readOnly={loading}
                                                required
                                                onChange={handleChange} />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='bg-teal-400 p-2 m-2 rounded-xl flex flex-col gap-2'>
                                            <h3 className='text-xl font-bold flex flex-nowrap items-center gap-2'><RiLockPasswordFill /> Enter OTP: </h3>
                                            <input type="number" placeholder='OTP' className='input' name='userOtp' required
                                                readOnly={loading}
                                                value={formData.userOtp}

                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className='bg-teal-400 p-2 m-2 rounded-xl flex flex-col gap-2'>
                                            <h3 className='text-xl font-bold flex flex-nowrap items-center gap-2'><RiLockPasswordFill /> New Password: </h3>
                                            <input type="password" placeholder='password' className='input' name='password' required
                                                readOnly={loading}
                                                value={formData.password}

                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='bg-teal-400 p-2 m-2 rounded-xl flex flex-col gap-2'>
                                            <h3 className='text-xl font-bold flex flex-nowrap items-center gap-2'><RiLockPasswordFill /> Confirm Password: </h3>
                                            <input type="password" placeholder='confirm password' className='input' name='cpassword' required
                                                value={formData.cpassword}

                                                readOnly={loading}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </>
                            }


                            <button className='text-md text-white md:text-lg font-bold py-2 px-3 bg-black rounded-xl shadow-md hover:cursor-pointer hover:shadow-lg hover:bg-teal-900 w-full h-12 flex justify-center items-center' type="submit">
                                {
                                    loading ?
                                        <ProgressBar
                                            visible={true}
                                            width="100"
                                            borderColor='white'
                                            barColor='teal'
                                            color="#4fa94d"
                                            ariaLabel="infinity-spin-loading"
                                        /> : isOtpSent ? "VERIFY" : "SEND"
                                }
                            </button>
                            {/* <div className='flex flex-nowrap justify-between items-center'>
                                <NavLink to="/signup" >
                                    <p className='text-blue-400 my-2'>New user?</p>
                                </NavLink>
                                <NavLink to="/login" >
                                    <p className='text-blue-400 my-2'>Already have an account?</p>
                                </NavLink>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Forgot