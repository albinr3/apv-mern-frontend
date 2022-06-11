import {useState, useEffect, createContext} from "react";

const AuthContext = createContext();

const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinaries/profile`;

export const AuthProvider = (props) => {

    const {children} = props;
    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)
    
    //here check and get the token from the localstorage and we get the data of the user and we storage it on the AuthState
    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem("token");

            //if the localstorage does not have any token, then stop the function
            if(!token){
                setLoading(false);
                return
            }

            //here we fetch the url
            try {
                const response = await fetch(url, {
                  method: 'GET', 
                  headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${token}`
                  }
                });
          
                const result = await response.json();
                console.log(result)
                
                if (!response.ok){ //here we check if there is an error from the backend and we generate a new error with the message from backend
                  throw new Error(result.msg);
                }
                
                //if everything is ok then we pass the user that is logging in to the AuthState
                setAuth(result);
          
              } catch (error) {
                console.log(error.message)
                setAuth({})
              }

              setLoading(false);
        }
        authenticateUser();
    }, [])

    //function to log out from everywhere
    const logOut = () => {
      localStorage.removeItem("token");
      setAuth({})
    }

    return(
        <AuthContext.Provider value={{
            auth, 
            setAuth, 
            loading, 
            logOut
        }}>

            {children}

        </AuthContext.Provider>
    )

}

export default AuthContext