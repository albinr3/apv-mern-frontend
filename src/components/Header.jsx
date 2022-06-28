import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function Header() {

  const {logOut} = useAuth();
  return (
    <header className="py-7 bg-indigo-600">
        <div className="container w-11/12 mx-auto flex justify-between items-center flex-col lg:flex-row" >
            <h1 className="text-2xl text-indigo-200 uppercase font-bold text-center">Adminitration of Veterinary 
            <span className="text-white font-black"> Patients</span></h1>

            <nav className="flex gap-4 text-sm items-center flex-col lg:flex-row mt-5 lg:mt-0">
                <Link to="/admin" className="text-white text-xl uppercase font-bold">Patients</Link>
                <Link to="/admin/profile" className="text-white text-xl uppercase font-bold">Profile</Link>
                
                <button onClick={logOut} className="text-white text-xl uppercase font-bold p-1 border-2" type="button">Log Out</button>
            </nav>
        </div>

    </header>
  )
}

export default Header