import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from "react-router-dom"
import Alert from '../components/Alert.jsx';

function ResetPassword() {

  const params = useParams();
  const {token} = params;
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinaries/forget-password/${token}`;

  const [alert, setAlert] = useState({});
  const [tokenValid, setTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);

  const [ password, setPassword] = useState("");
  const [ repeatPassword, setRepeatPassword] = useState("");

  const [ passwordModified, setPasswordModified] = useState(false);

  const verifyTokenPassword = async ()=> {
    try {
      
      const response = await fetch(url);
      const result = await response.json();
      if (!response.ok){ //here we check if there is an error from the backend and we generate a new error with the message from backend
        throw new Error(result.msg);
      }
      
      //if everything is ok then
      setTokenValid(true)

      setAlert({msg: result.msg, error1: false})
      
    } catch (error) {
      setAlert({msg: error.message, error1: true}) //here we show the backend error on the frontend
    }
    //stop loading
    setLoading(false);
  }

  useEffect(() => {
    verifyTokenPassword(); //on localhost run twice, but in production run once(IDK why)
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //first we do a validation
    if([password,repeatPassword].includes("")) {
        setAlert({msg: "There are empty fields!", error1: true})
        return;
    }

    if(password.length < 6){
        setAlert({msg: "The password is too short, type at least 6 char", error1: true})
        return;
    }

    if(password !== repeatPassword) {
      setAlert({msg: "Both Passwords are differents!", error1: true})
      return;
    }

    //if there is not error, empty the error message
    setAlert({});

    //Send the new password to the api
    try {
      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, token})
      });

      const result = await response.json();
      
      if (!response.ok){ //here we check if there is an error from the backend and we generate a new error with the message from backend
        throw new Error(result.msg);
      }
      
      //if everything is ok then
      setAlert({msg: "Password changed successful, sign in", error1: false})
      setPasswordModified(true);
      
    
    } catch (error) {
      setAlert({msg: error.message, error1: true}) //here we show the backend error on the frontend
    }
  }
  
  //to redirect to the login page after change the password
  let navigate = useNavigate();

  const goLogin = () => {
    setTimeout(() => {
        navigate("/");
    }, 2500); 
  };

  const {msg} = alert;
  
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl text-center capitalize mr-6">
          Verify your account and <span className="text-black">manage your patients</span></h1>
      </div>
      <div className="shadow-lg rounded-xl bg-white px-5 py-10">
        {/* if it is not loading then show alert*/}
        {!loading ? <Alert alert={alert}/> : null }


        {/* if the token is valid then show the form*/}
        {tokenValid && (
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                <label htmlFor="password" className="text-gray-600 block text-xl font-bold">NEW PASSWORD: </label>
                <input type="password" name="password" id="password" placeholder="Type your new password"
                className="border w-full p-3 bg-gray-50 rounded-xl"
                value={password} onChange={ e => setPassword(e.target.value)}/>
                </div>

                <div className="my-5">
                <label htmlFor="rpassword" className="text-gray-600 block text-xl font-bold">REPEAT PASSWORD: </label>
                <input type="password" name="rpassword" id="rpassword" placeholder="Repeat your password"
                className="border w-full p-3 bg-gray-50 rounded-xl"
                value={repeatPassword} onChange={ e => setRepeatPassword(e.target.value)}/>
                </div>

                <input type="submit" value="SAVE NEW PASSWORD" 
                className="bg-indigo-700 w-full py-2 px-16 rounded-xl 
                text-white font-bold mt-5 items-center hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
            </form>
        )}
      </div>

    {passwordModified && goLogin()}
    </>
    
  )
}

export default ResetPassword