import {Link} from "react-router-dom"

function Login() {
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl text-center capitalize mr-6">Login. and manage your <span className="text-black">patients</span></h1>
      </div>
      <div>
        <form action="post">
            <div className="my-5">
              <label htmlFor="email" className="text-gray-600 block text-xl font-bold">EMAIL: </label>
    
              <input type="email" name="email" id="email" placeholder="Type your email"
               className="border w-full p-3 bg-gray-50 rounded-xl"/>
            </div>
            <div className="my-5">
              <label htmlFor="password" className="text-gray-600 block text-xl font-bold">PASSWORD: </label>
              <input type="password" name="password" id="password" placeholder="Type your password"
               className="border w-full p-3 bg-gray-50 rounded-xl"/>
            </div>

            <input type="button" value="LOGIN" 
            className="bg-indigo-700 w-full py-2 px-16 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
        </form>
        <nav className="mt-5 mdw:text-center">
          <p className="text-gray-400 block">Dont have an account? <Link to="/sign-up" className="text-blue-600">Sign up!</Link></p>
          <Link to="/forget-password" className="text-blue-600 mt-3 block">Forgot password?</Link>
        </nav>
      </div>
    </>
  )
}

export default Login