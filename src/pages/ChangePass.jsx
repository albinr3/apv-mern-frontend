
import { useState } from 'react';
import AdminNav from '../components/AdminNav'
import Alert from '../components/Alert'
import useAuth from '../hooks/useAuth';

function ChangePass() {

  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState({ oldPass: "", pass: "", repeatPass: ""});
  const {savePassword} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(Object.values(password).some(item => item === "")) {
      setAlert({msg: "Every field is mandatory!", error1: true})
      return;
    }
  
    if(password.pass.length < 6){
      setAlert({msg: "New Password must be 6 characters or more!", error1: true})
      return;
    }
  
    if(password.pass != password.repeatPass){
      setAlert({msg: "New Password and Repeat password must be the same!", error1: true})
      return;
    }

    setAlert({})

    const response = await savePassword(password)
    
    setAlert(response);
  }


  const {msg} = alert;

  return (
    <>
    <AdminNav />
    <h2 className='font-black text-3xl text-center mt-10'>Change Password</h2>
    <p className='text-xl mt-5 mb-10 text-center'>Edit your <span className='text-indigo-600 font-bold'>password here</span> </p>
    <div className='flex justify-center'>
      <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>

        <form onSubmit={handleSubmit}>
          <label htmlFor="oldPass" className="text-gray-600 block text-xl pt-3 pb-2 font-bold">Actual Password</label>
          <input type="password" id='oldPass' name='oldPass' placeholder="Your old password"
          className="border w-full p-2 bg-gray-50 rounded-xl" onChange={(e) => {
            setPassword({...password, [e.target.name]: e.target.value})
          }}/>

          <label htmlFor="pass" className="text-gray-600 block text-xl pt-3 pb-2 font-bold">New Password</label>
          <input type="password" id='pass' name='pass' placeholder="Your new password"
          className="border w-full p-2 bg-gray-50 rounded-xl" onChange={(e) => {
            setPassword( {...password, [e.target.name]: e.target.value})
          }}/>

          <label htmlFor="repeatPass" className="text-gray-600 block text-xl pt-3 pb-2 font-bold">Repeat New Password</label>
          <input type="password" id='repeatPass' name='repeatPass' placeholder="Repeat Your new password"
          className="border w-full p-2 bg-gray-50 rounded-xl" onChange={(e) => {
            setPassword( { ...password,[e.target.name]: e.target.value})
          }}/>

          {msg && <Alert alert={alert} />}
          <input className='bg-indigo-700 w-full py-2 px-16 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800' type="submit" value={"SAVE NEW PASSWORD"} />
        </form>

      </div>
    </div>
    </>
  )
}

export default ChangePass