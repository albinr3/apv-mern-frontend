import usePatients from "../hooks/usePatients";

function Patient({patientObj}) {
  const {email, name, owner, symptoms, date, _id} = patientObj;

  const {editPatient, deletePatient} = usePatients();

  const formatDate = (date) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat("es-DO", {dateStyle: "long"}).format(newDate);
  }

  return (
    <div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl'>
        <p className='font-bold uppercase text-indigo-500 my-2'>Name: 
        <span className='font-normal normal-case text-black'> {name}</span></p>

        <p className='font-bold uppercase text-indigo-500 my-2'>Owner: 
        <span className='font-normal normal-case text-black'> {owner}</span></p>

        <p className='font-bold uppercase text-indigo-500 my-2'>Contact Email: 
        <span className='font-normal normal-case text-black'> {email}</span></p>

        <p className='font-bold uppercase text-indigo-500 my-2'>Date: 
        <span className='font-normal normal-case text-black'> {formatDate(date)}</span></p>

        <p className='font-bold uppercase text-indigo-500 my-2'>Symptoms: 
        <span className='font-normal normal-case text-black'> {symptoms}</span></p>

        <p className='font-bold uppercase text-indigo-500 my-2'>Id: 
        <span className='font-normal normal-case text-black'> {_id}</span></p>

        <div className='flex justify-between my-5'>
            <button onClick={() => editPatient(patientObj)} className='bg-indigo-600 text-white py-2 px-8 m-1 rounded-lg uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'>
                Edit
            </button>
            <button onClick={() => deletePatient(_id)} className='bg-red-600 text-white py-2 px-8 m-1 rounded-lg uppercase font-bold hover:bg-red-700 cursor-pointer transition-colors'>
                Delete
            </button>
        </div>
    </div>
  )
}

export default Patient