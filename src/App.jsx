import {Route, Routes, BrowserRouter} from "react-router-dom"
import Authlayout from "./layout/Authlayout"
import Confirm from "./pages/Confirm"
import ForgotPassword from "./pages/ForgotPassword"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ResetPassword from "./pages/ResetPassword"
import { AuthProvider } from "./context/AuthProvider"
import { PatientsProvider } from "./context/PatientsProvider"
import LoginLayout from "./layout/LoginLayout"
import AdminPatients from "./pages/AdminPatients"
import Profile from "./pages/Profile"
import ChangePass from "./pages/ChangePass"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
          <Routes>
            <Route path="/" element={< Authlayout />}>
              <Route index element={ <Login /> } />
              <Route path="sign-up" element= {<SignUp />}/>
              <Route path="forgot-password" element= {<ForgotPassword />}/>
              <Route path="forgot-password/:token" element= {<ResetPassword />}/>
              <Route path="confirm-account/:token" element= {<Confirm />}/>
            </Route>

            <Route path="/admin" element={<LoginLayout />}>
              <Route index element={<AdminPatients />} />
              <Route path="profile" element= {<Profile />}/>
              <Route path="change-password" element= {<ChangePass />}/>
            </Route>
          </Routes>
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
