import {Route, Routes, BrowserRouter} from "react-router-dom"
import Authlayout from "./layout/Authlayout"
import Confirm from "./pages/Confirm"
import ForgotPassword from "./pages/ForgotPassword"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ResetPassword from "./pages/ResetPassword"
import { AuthProvider } from "./context/AuthProvider"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={< Authlayout />}>
            <Route index element={ <Login /> } />
            <Route path="sign-up" element= {<SignUp />}/>
            <Route path="forgot-password" element= {<ForgotPassword />}/>
            <Route path="forgot-password/:token" element= {<ResetPassword />}/>
            <Route path="confirm-account/:token" element= {<Confirm />}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
