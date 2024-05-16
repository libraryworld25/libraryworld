import React, { useState } from 'react'
import { ProgressBar } from "react-loader-spinner"


const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        msg: ""
    })

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })


    const handleSendMsg = async e => {
        e.preventDefault()
        const { email, msg } = formData;
        setLoading(true)
        try {
            await fetch(`${process.env.REACT_APP_BASE_URL}/send-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: 'librariesworld25@gmail.com',
                    subject: "!! SOMEONE CONTACTED YOU !!",
                    msg: `<p>Email: ${email}</p> <p>Message: ${msg}</p>`,
                    type: "forget"
                })
            })
                .then(res => res.json())
                .then(result => {
                    alert(result.message)
                    if (result.message === "Message sent successfully") {
                        setFormData({ email: "", msg: "" })
                    }
                    return setLoading(false)
                })

        } catch (error) {
            console.log(error);
            setLoading(false)
            return alert('Errors sending the otp.')
        }
    }


    return (
        <>
            <div className='p-2 w-[95%] m-auto rounded-xl'>
                <h2 className='text-4xl font-extrabold tracking-wider my-3 text-white'>Contact Us</h2>
                <form action="" className='flex flex-col gap-2 p-4 bg-gray-200 rounded-xl' onSubmit={!loading ? handleSendMsg : e => e.preventDefault()}>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-xl font-bold'>Your Email: </h3>
                        <input className='rounded-xl border-black border-b-2 outline-none bg-gray-300 p-2' type="email" placeholder='email@example.com' required readOnly={loading} name='email' onChange={handleChange} value={formData.email} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-xl font-bold'>Enter your message:</h3>
                        <textarea className='rounded-xl shadow-md bg-gray-300 p-2 text-md font-semibold' rows={7} required readOnly={loading} name="msg" onChange={handleChange} value={formData.msg}></textarea>
                    </div>
                    <button className='w-full h-12 bg-black shadow-md flex justify-center items-center hover:shadow-xl rounded-xl text-xl font-semibold cursor-pointer text-white ' type="submit" >
                        {
                            loading ?
                                <ProgressBar
                                    visible={true}
                                    width="100"
                                    borderColor='white'
                                    barColor='teal'
                                    color="#4fa94d"
                                    ariaLabel="infinity-spin-loading"
                                /> : "Send Message"
                        }
                    </button>
                </form>
            </div>
        </>
    )
}

export default Contact