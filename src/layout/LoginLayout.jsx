import { Outlet, Navigate } from "react-router-dom"
import Footer from "../components/Footer";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

function LoginLayout() {

   
    const {auth, loading} = useAuth()
   
    //if is loading retrun loading, then render the page.
    if(loading) return "Loading....."

    return (
        <>
            <Header />
                {/* If profile object is not empty, then show admin page, else, go to login */}
                {auth.profile?._id ? (

                <main className="container w-11/12 mx-auto mt-10">
                    <Outlet />
                </main>
                
                ) : <Navigate to="/" />}
            <Footer />
        </>
  )
}

export default LoginLayout