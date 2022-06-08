import React from 'react'
import {Link} from "react-router-dom"

function ForgotPassword() {
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl text-center capitalize mr-6">
          Recover your account and does not lose your <span className="text-black">patients</span></h1>
      </div>
      <div className="shadow-lg rounded-xl bg-white px-5 py-10">
        <form action="post">
            <div className="my-5">
              <label htmlFor="email" className="text-gray-600 block text-xl font-bold">EMAIL: </label>
    
              <input type="email" name="email" id="email" placeholder="Type your email"
               className="border w-full p-3 bg-gray-50 rounded-xl mt-2"/>
            </div>
            
            <input type="button" value="RECOVER MY ACCOUNT" 
            className="bg-indigo-700 w-full py-2 px-16 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
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