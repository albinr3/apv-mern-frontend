import React, { useState } from 'react'
import {Link} from "react-router-dom"
import Alert from '../components/Alert';

function ForgotPassword() {
  const [email, setEmail] = useState(""); 
  const [alert, setAlert] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email === ""){
      setAlert({msg: "The email is required", error1: true});
      return;
    }

    const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinaries/forget-password`;

    try {
      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email}) 
      });

      const result = await response.json();
      console.log(result)
      if (!response.ok){ //here we check if there is an error from the backend and we generate a new error with the message from backend
        throw new Error(result.msg);
      }
      
      //if everything is ok then
      setAlert({msg: "Check your email to reset your password", error1: false})

    } catch (error) {
      setAlert({msg: error.message, error1: true}) //here we show the backend error on the frontend
    }


  }

  const {msg} = alert;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl text-center capitalize mr-6">
          Recover your account and does not lose your <span className="text-black">patients</span></h1>
      </div>
      <div className="shadow-lg rounded-xl bg-white px-5 py-10">
        <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label htmlFor="email" className="text-gray-600 block text-xl font-bold">EMAIL: </label>
    
              <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Type your email"
               className="border w-full p-3 bg-gray-50 rounded-xl mt-2"/>
            </div>
            
            <input type="submit" value="RECOVER MY ACCOUNT" 
            className="bg-indigo-700 w-full py-2 px-16 rounded-xl text-white font-bold my-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
            {/* if msg is not empty show an error component */}
            {msg ? <Alert alert={alert}/> : null }
        </form>
        

        <nav className="mt-5 mdw:text-center">
          <p className="text-gray-400 block">Dont have an account? <Link to="/sign-up" className="text-blue-600">Sign up!</Link></p>
          <p className="text-gray-400 block mt-4">Already have an account? <Link to="/" className="text-blue-600">Sign in!</Link></p>
        </nav>
      </div>
    </>
  )
}

export default ForgotPassword