import { AuthProvider } from "../context/AuthProvider.jsx";
import { useContext} from "react";


const useAuth = () => {
    
  return useContext(AuthProvider)
  
}

export default useAuth