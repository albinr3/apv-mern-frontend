
import React, { useState } from 'react'
import {Link} from "react-router-dom"
import Alert from '../components/Alert';

function SignUp() {

  const [ name, setName] = useState("");
  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const [ repeatPassword, setRepeatPassword] = useState("");

  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //first we do a validation
    if([name,email,password,repeatPassword].includes("")) {
        setAlert({msg: "There are empty fields!", error1: true})
        return;
    }

    if(password !== repeatPassword) {
      setAlert({msg: "Both Passwords are differents!", error1: true})
      return;
    }

    //if there is not error, empty the error message
    setAlert({});

    //Create the veterinary on the api

    const url = "http://localhost:4000/api/veterinaries";
    try {
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({email, name, password}) // body data type must match "Content-Type" header
      });

      const result = await response.json();
      
      if (!response.ok){ //here we check if there is an error from the backend and we generate a new error with the message from backend
        throw new Error(result.msg);
      }
      
      //if everything is ok then
      setAlert({msg: "User created successfully, check your email.", error1: false})
      
    

    } catch (error) {
      setAlert({msg: error.message, error1: true}) //here we show the backend error on the frontend
    }
    
  }

  const {msg} = alert;
  
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl text-center capitalize mr-6">
          Create a new account and <span className="text-black">manage your patients</span></h1>
      </div>
      <div className="shadow-lg rounded-xl bg-white px-5 py-10">
        <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label htmlFor="name" className="text-gray-600 block text-xl font-bold">NAME: </label>
              <input type="text" name="name" id="name" placeholder="Your name"
               className="border w-full p-3 bg-gray-50 rounded-xl"
              value={name} onChange={ e => setName(e.target.value)}/>
            </div>

            <div className="my-5">
              <label htmlFor="email" className="text-gray-600 block text-xl font-bold">EMAIL: </label>
              <input type="email" name="email" id="email" placeholder="Type your email"
               className="border w-full p-3 bg-gray-50 rounded-xl"
               value={email} onChange={ e => setEmail(e.target.value)}/>
            </div>

            <div className="my-5">
              <label htmlFor="password" className="text-gray-600 block text-xl font-bold">PASSWORD: </label>
              <input type="password" name="password" id="password" placeholder="Type your password"
               className="border w-full p-3 bg-gray-50 rounded-xl"
               value={password} onChange={ e => setPassword(e.target.value)}/>
            </div>

            <div className="my-5">
              <label htmlFor="rpassword" className="text-gray-600 block text-xl font-bold">REPEAT PASSWORD: </label>
              <input type="password" name="rpassword" id="rpassword" placeholder="Repeat your password"
               className="border w-full p-3 bg-gray-50 rounded-xl"
               value={repeatPassword} onChange={ e => setRepeatPassword(e.target.value)}/>
            </div>

            {/* if msg is not empty show an error component */}
            {msg ? <Alert alert={alert}/> : null }

            <input type="submit" value="SIGN UP" 
            className="bg-indigo-700 w-full py-2 px-16 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
        </form>

        <nav className="mt-5 mdw:text-center">
          <p className="text-gray-400 block">Already have an account? <Link to="/" className="text-blue-600">Sign in!</Link></p>
          <Link to="/forgot-password" className="text-blue-600 mt-3 block">Forgot password?</Link>
        </nav>
      </div>
    </>
  )
}

export default SignUp