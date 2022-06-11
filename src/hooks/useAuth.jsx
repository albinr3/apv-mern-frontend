import AuthContext from "../context/AuthProvider.jsx";
import { useContext} from "react";


function useAuth() {
    
  
  const value = useContext(AuthContext);
  return value;
  
}

export default useAuth