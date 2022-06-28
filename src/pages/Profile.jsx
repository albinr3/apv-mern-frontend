import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useAuth'
import Alert from '../components/Alert';

function Profile() {

    const [profile, setProfile] = useState({})
    const {auth, editProfile} = useAuth();

    const [alert, setAlert] = useState({});

    useEffect( () => {
        setProfile(auth.profile)
    }, [auth.profile]);

    const {email, tel, web, name} = profile;
   
    const handleSubmit = (e) => {
        e.preventDefault();
        if([email, name].includes("")){
            setAlert({msg: "Email and Name are requerid!", error1: true})
            return;
        }

        setAlert({});

        editProfile({profile});
        setAlert({msg: "Profile updated sucessfully", error1: false})

    }

    const {msg} = alert;
  return (
    <>
    <AdminNav />
    <h2 className='font-black text-3xl text-center mt-10'>Edit your Profile</h2>
    <p className='text-xl mt-5 mb-10 text-center'>Edit your <span className='text-indigo-600 font-bold'>info here</span> </p>
    <div className='flex justify-center'>
        <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
            <form onSubmit={handleSubmit}>
                <div className='md-3 mt-1'>
                    <label htmlFor="name" className="text-gray-600 block text-xl pt-3 pb-2 font-bold">NAME: </label>
                    <input type="text" name="name" id="name" placeholder="Your name"
                    className="border w-full p-3 bg-gray-50 rounded-xl"
                    value={name || ""} onChange={ e => setProfile({...profile, [e.target.name]: e.target.value})}/>

                    <label htmlFor="web" className="text-gray-600 block text-xl pt-3 pb-2 font-bold">WEB SITE: </label>
                    <input type="text" name="web" id="web" placeholder="Your website"
                    className="border w-full p-3 bg-gray-50 rounded-xl"
                    value={web || ""} onChange={ e => setProfile({...profile, [e.target.name]: e.target.value})}/>

                    <label htmlFor="email" className="text-gray-600 block text-xl pt-3 pb-2 font-bold">EMAIL: </label>
                    <input type="text" name="email" id="email" placeholder="Your Email"
                    className="border w-full p-3 bg-gray-50 rounded-xl"
                    value={email || ""} onChange={ e => setProfile({...profile, [e.target.name]: e.target.value})}/>

                    <label htmlFor="tel" className="text-gray-600 block text-xl pt-3 pb-2 font-bold">TEL: </label>
                    <input type="text" name="tel" id="tel" placeholder="Your Telephone Number"
                    className="border w-full p-3 bg-gray-50 rounded-xl"
                    value={tel || ""} onChange={ e => setProfile({...profile, [e.target.name]: e.target.value})}/>

                </div>

                {msg && <Alert alert={alert} />}

                <input className='bg-indigo-700 w-full py-2 px-16 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800' type="submit" value={"SAVE CHANGES"} />
            </form>
        </div>
    </div>
    </>
  )
}

export default Profile