import React from 'react'
import { useState } from 'react'

import PatientForm from '../components/PatientForm'
import PatientList from '../components/PatientList'
import usePatients from '../hooks/usePatients';



function AdminPatients() {

  const [showForm, setShowForm] = useState(false);
  const {loading} = usePatients();
  console.log(loading)

   
  return (
    <div className='flex flex-col md:flex-row'>
      <button onClick={()=> setShowForm(!showForm)}
       className='bg-indigo-600 text-white font-bold rounded-md uppercase mx-10 p-3 mb-10 md:hidden'>
        {showForm ? "Hide Form" : "Show Form"}
       </button>
      <div className={`${showForm ? "block" : "hidden"} md:block md:w-1/2 lg:w-2/5`}>
        <PatientForm />
      </div>

      <div className='md:w-1/2 lg:w-3/5'>
        <PatientList />
      </div>
    </div>
  )
  
}

export default AdminPatients