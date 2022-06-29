import {Link, Navigate, useNavigate} from "react-router-dom"

import { useState, useEffect } from "react";
import Alert from "../components/Alert";

import useAuth from "../hooks/useAuth";
import usePatients from "../hooks/usePatients";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setTokenState} = usePatients();

  const [alert, setAlert] = useState({});

  const navigate = useNavigate();

  const {setAuth} = useAuth();

  const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinaries/login`;
 



  const handleSubmit = async (e) => {
    e.preventDefault();

    //first we do a validation
    if([email,password].includes("")) {
      setAlert({msg: "There are empty fields!", error1: true})
      return;
    }

    if(password.length < 6){
      setAlert({msg: "The password is too short, type at least 6 char", error1: true})
      return;
    }

    //if there is not error, empty the error message
    setAlert({});

    //send the info to the api to authenticate the user
    try {
      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
      });

      const result = await response.json();
      console.log(result)
      
      if (!response.ok){ //here we check if there is an error from the backend and we generate a new error with the message from backend
        throw new Error(result.msg);
      }
      
      //if everything is ok then
      setAlert({msg: "Password is correct, log in", error1: false})
      localStorage.setItem("token", result.profile.token);
      setTokenState(result.profile.token);

      //here we pass the veterinary info direct to the auth
      setAuth(result);

      //we go to the admin page after login
      navigate("/admin");
      //window.location.reload(false);

    } catch (error) {
      setAlert({msg: error.message, error1: true}) //here we show the backend error on the frontend
    }


  }


  
  const {msg} = alert;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl text-center capitalize mr-6">Login and manage your <span className="text-black">patients</span></h1>
      </div>
      <div className="shadow-lg rounded-xl bg-white px-5 py-10">
        <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label htmlFor="email" className="text-gray-600 block text-xl font-bold">EMAIL: </label>
    
              <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Type your email"
               className="border w-full p-3 bg-gray-50 rounded-xl"/>
            </div>
            <div className="my-5">
              <label htmlFor="password" className="text-gray-600 block text-xl font-bold">PASSWORD: </label>
              <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Type your password"
               className="border w-full p-3 bg-gray-50 rounded-xl"/>
            </div>

            <input type="submit" value="LOGIN" 
            className="bg-indigo-700 w-full py-2 px-16 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
        </form>
        <nav className="mt-5 mdw:text-center">
          <p className="text-gray-400 block">Dont have an account? <Link to="/sign-up" className="text-blue-600">Sign up!</Link></p>
          <Link to="/forgot-password" className="text-blue-600 mt-3 block mb-5">Forgot password?</Link>
        </nav>

        {msg && <Alert alert={alert} /> }
      </div>
    </>
  )
}

export default Login