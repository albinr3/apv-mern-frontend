
import { useEffect } from 'react';
import { useState } from 'react'
import usePatients from '../hooks/usePatients';
import Alert from './Alert';


function PatientForm() {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [id, setId] = useState(null);

  const {savePatient, alert,  patient} = usePatients();
  

  useEffect(() => {
    if(patient?.name){
        setName(patient.name)
        setOwner(patient.owner)
        setEmail(patient.email)
        setDate(patient.date)
        setSymptoms(patient.symptoms)
        setId(patient._id)
    }
    
  }, [patient])
  
  const [alert1, setAlert1] = useState({});

  const {msg} = alert1;

  const handleSubmit = e => {
    e.preventDefault();

    //first we do a validation
    if([email, owner, name, symptoms].includes("")) {
        setAlert1({msg: "There are empty fields!", error1: true})
        return;
      }

      //if there is not error, empty the error message
      setAlert1({});

      savePatient({email, owner, name, symptoms, id});
    
    if(id){
        setAlert1({msg: "Patient Modified successfully", error1: false})
    } else {
        setAlert1({msg: "Patient created successfully", error1: false})
    }
    
    setName("")
    setOwner("")
    setEmail("")
    setDate("")
    setSymptoms("")
    setId(null)
      
  }
 
  return (
    <>
    <h2 className="font-bold text-3xl text-center uppercase">Manage your patients</h2>
    <p className='text-lg text-center mb-5 uppercase font-bold'>Add new patients and <span className='text-indigo-600'>Manage them</span></p>

    <form onSubmit={handleSubmit} className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md'>
        <div className='mb-5'>
            <label htmlFor="pet" className='uppercase text-grey-700 font-bold'>Pet Name:</label>
            <input 
            type="text" name="pet" id="pet" placeholder='Pet Name' 
            className='border-2 w-full p-2 mt-2 placeholder:grey-400 rounded-md'
            value={name} onChange={e => setName(e.target.value)}/>
        </div>

        <div className='mb-5'>
            <label htmlFor="owner" className='uppercase text-grey-700 font-bold'>Owner Name:</label>
            <input 
            type="text" name="owner" id="owner" placeholder='Owner Name' 
            className='border-2 w-full p-2 mt-2 placeholder:grey-400 rounded-md'
            value={owner} onChange={e => setOwner(e.target.value)}/>
        </div>

        <div className='mb-5'>
            <label htmlFor="email" className='uppercase text-grey-700 font-bold'>Email:</label>
            <input 
            type="email" name="email" id="email" placeholder='Write your email' 
            className='border-2 w-full p-2 mt-2 placeholder:grey-400 rounded-md'
            value={email} onChange={e => setEmail(e.target.value)}/>
        </div>

        <div className='mb-5'>
            <label htmlFor="date" className='uppercase text-grey-700 font-bold'>Date:</label>
            <input 
            type="date" name="date" id="date"
            className='border-2 w-full p-2 mt-2 placeholder:grey-400 rounded-md'
            value={date} onChange={e => setDate(e.target.value)}/>
        </div>

        <div className='mb-5'>
            <label htmlFor="symptoms" className='uppercase text-grey-700 font-bold'>Symptoms:</label>
            <textarea 
            id="symptoms" placeholder='Write the symptoms of your pet' 
            className='border-2 w-full p-2 mt-2 placeholder:grey-400 rounded-md'
            value={symptoms} onChange={e => setSymptoms(e.target.value)}/>
        </div>
        {msg && <Alert alert={alert1} />}
        <input type="submit" value={id ? "Save Changes" : "Add Pattient"} 
        className='bg-indigo-600 text-white p-3 w-full uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors' />

    </form>
    </>
  )
}

export default PatientForm