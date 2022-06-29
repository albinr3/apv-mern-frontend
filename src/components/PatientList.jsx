import usePatients from "../hooks/usePatients"
import Alert from "./Alert"
import Patient from "./Patient";


function PatientList() {

  const {patients} = usePatients();

  
  return (
    <>
      {patients.length ? (
        <>
          <h2 className="font-bold text-3xl text-center uppercase">Patient List</h2>
          <p className="text-lg text-center mb-5 uppercase font-bold">Manage yours <span className="text-indigo-600 font-bold">patients and appointments</span></p>
          {patients.map(patient => (
            <Patient 
              key={patient._id}
              patientObj={patient}
            />
          ))}
        </>
      ) : 
      (
      <>
        <h2 className="text-black text-3xl text-center uppercase">There is not patients</h2>
        <p className="text-xl text-center mt-5 mb-10">Start creating new patients <span className="text-indigo-600 font-bold">and they will appear in this section</span></p>
      </>
      )}
    </>
  )
}

export default PatientList