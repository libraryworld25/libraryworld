import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { RiImageEditFill } from "react-icons/ri";
import getUserInfo from '../../utils/getUserInfo';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'react-loader-spinner'
import { removeCookie } from "../../utils/cookies"

const Profile = () => {
    const { token } = useSelector(state => state.authReducer);
    const [file, setFile] = useState(null); // State to store the selected file
    const [srcFile, setSrcFile] = useState("/images/defaultprofilepic.webp")
    const [orgData, setOrgData] = useState({
        image: "",
        name: "",
        email: "",
        username: ""
    })
    const [data, setData] = useState({
        image: "",
        name: "",
        email: "",
        username: ""
    });
    // const [originalUsername , setOriginalUsername ] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Set the selected file to state
        const fileURL = URL.createObjectURL(e.target.files[0]);
        setSrcFile(fileURL)
        uploadImage(e.target.files[0]);
    };

    const handleChange = e => setData({ ...data, [e.target.name]: e.target.value })

    const handleUpdateProfile = async () => {
        setLoading(true)
        const { username, name } = data;

        try {
            await fetch(`${process.env.REACT_APP_BASE_URL}/update-user-info`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ username, name, orgData })
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result.message)
                    if (result.message === "Username taken.") {
                        setLoading(false)
                        return alert('Username not avaliable.')
                    }
                    setLoading(false)
                    setEditMode(false)
                })
        } catch (error) {
            setEditMode(false)
            setLoading(false)
            console.log(error);
        }
    }

    const uploadImage = async (file) => {
        const formData = new FormData(); // Create a new FormData object
        formData.append("image", file); // Append the file to FormData with key "image"
        try {
            // Send a POST request to localhost:8080/save with the form data using fetch
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/save-image`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });
            const result = await response.json(); // Parse the response JSON
            console.log(result);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error("Error:", error); // Log any errors that occur
        }

    }

    const handleLogout = () => {
        removeCookie('hemangi');
        dispatch({
            type: "logoutUser"
        })
        navigate('/')
    }

    useEffect(() => {
        if (token === null) {
            navigate("/")
        } else {
            getUserInfo(token, setData, setSrcFile, setOrgData, orgData)
        }
    }, [])

    return (
        <>
            <Navbar />
            <div className='flex flex-nowrap flex-col overflow-scroll h-[110vh] pt-14 lg:pt-20 px-5'>
                <h2 className='w-4/5 m-auto text-3xl md:text-4xl font-extrabold tracking-wider mt-5 h-24'>{editMode ? "Edit Profile" : "Profile Section"}</h2>
                <hr className='w-4/5 m-auto border-b-2 border-black my-4' />
                <div className='flex h-3/5 lg:h-3/6 flex-col md:flex-row flex-nowrap items-center justify-center md:justify-around gap-1 px-5'>

                    <input className={`text-2xl text-center md:text-left md:text-3xl outline-none rounded-xl font-bold p-2 ${editMode ? 'bg-gray-300 border-b-2 border-black' : 'border-none bg-transparent'} `} name='name' onChange={handleChange} value={data.name}
                        readOnly={!editMode} />
                    <div className='realtive flex flex-col items-center justify-center relative overflow-visible'>
                        <img className='size-32 bg-red-500 rounded-lg object-cover' src={srcFile} alt="profile image" onError={(e) => { e.target.src = '/images/defaultprofilepic.webp' }} />
                        <div className='absolute bottom-[-5px] right-0'>
                            {
                                editMode &&
                                <div className='relative'>
                                    <input type="file" name="profileImage" className='z-10 w-50 top-1 absolute opacity-0' accept="image/*" onChange={handleFileChange} />
                                    <RiImageEditFill className='z-0 size-10 md:size-14 bg-black text-white p-3 rounded-full cursor-pointer' />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-full h-full py-2 md:px-5'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-2xl font-bold'>General</h2>
                        <div className='w-full bg-gray-100 rounded-2xl p-3'>

                            {!editMode && <div className='flex flex-row flex-wrap items-center gap-1'>
                                <h3 className='text-xl font-bold'>Email: </h3>
                                <input className='input w-[90%]' type='text' value={data.email} readOnly />
                            </div>
                            }
                            <div className='flex flex-row items-center gap-1'>
                                <h3 className='text-xl font-bold'>Username: </h3>
                                <input className={`outline-none my-1 rounded-xl px-2 ${editMode ? 'border-b-2 border-black bg-gray-300' : 'bg-transparent border-none'}`} type='text' name='username' onChange={handleChange} value={data.username} readOnly={!editMode} />
                            </div>
                        </div>
                    </div>
                    {
                        editMode ?
                            <button className='text-md md:text-lg font-bold py-2 px-3 bg-blue-500 text-white rounded-xl shadow-md hover:cursor-pointer hover:shadow-lg w-full h-12 flex justify-center items-center' onClick={handleUpdateProfile}>
                                {
                                    loading ?
                                        <ProgressBar
                                            visible={true}
                                            width="100"
                                            borderColor='black'
                                            barColor='white'
                                            color="#4fa94d"
                                            ariaLabel="infinity-spin-loading"
                                        /> : "UPDATE"
                                }
                            </button> :
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-2xl font-bold'>Privacy & Security</h2>
                                <div className='w-full bg-gray-100 rounded-2xl p-3 flex flex-row flex-wrap gap-3'>
                                    <button className='text-md md:text-xl rounded-xl py-2 px-3 bg-red-500 text-white font-semibold hover:bg-red-400 hover:cursor-pointer' onClick={() => navigate('/forgot')}>Change Password</button>

                                    <button className='text-md md:text-xl rounded-xl py-2 px-3 bg-black text-white font-semibold hover:bg-teal-950 hover:cursor-pointer' onClick={() => setEditMode(true)}>Edit Profile</button>

                                    <button className='text-md md:text-xl rounded-xl py-2 px-3 bg-red-500 text-white font-semibold hover:bg-red-400 hover:cursor-pointer' onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                    }
                </div>

            </div>
        </>
    )
}

export default Profile