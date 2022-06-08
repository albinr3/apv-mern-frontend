import React, { useEffect, useState } from 'react'
import {useParams, Link} from "react-router-dom"
import Alert from '../components/Alert.jsx';

function Confirm() {

  const params = useParams();
  const {token} = params;
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinaries/confirm-account/${token}`;
  console.log("funciona")
  const [alert, setAlert] = useState({});
  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const confirmAccount = async ()=> {
      try {
        
        const response = await fetch(url);
        const result = await response.json();
        if (!response.ok){ //here we check if there is an error from the backend and we generate a new error with the message from backend
          throw new Error(result.msg);
        }
        
        //if everything is ok then
        setConfirmedAccount(true)
        setAlert({msg: result.msg, error1: false})
        
      } catch (error) {
        setAlert({msg: error.message, error1: true}) //here we show the backend error on the frontend
      }
      //stop loading
      setLoading(false);
    }
    
    return () => {
      console.log("this should be print once")
      confirmAccount();
    }
  }, [])
  


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

         {/* if the account is confirmed then show sign in link*/}
        {confirmedAccount && <Link to="/" className="text-blue-600 block text-lg text-center mt-4">Sign in!</Link>}
      </div>
      
    </>
  )
}

export default Confirm