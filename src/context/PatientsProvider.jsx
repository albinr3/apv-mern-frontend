import { createContext, useState, useEffect } from "react";

const PatientContext = createContext();

export const PatientsProvider = (props) => {
    const {children} = props;
    const [alert, setAlert] = useState({})
    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState({});

    //get the patients from the database
    useEffect( () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/patients`;
        const token = localStorage.getItem("token");

        if(!token) return;

        const getPatients = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET', 
                    headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${token}`
                    }
                });
        
                const result = await response.json();
        
                if (!response.ok){ //here we check if there is an error from the backend and we generate a new error with the message from backend
                    throw new Error(result.msg);
                }
        
                const {createdAt, __v, updatedAt, ...savedPatient} = result; //this create a new object deleting this propieties

                setPatients(result)
                
                
        
                } catch (error) {
                setAlert({msg: error.message, error1: true}) //here we show the backend error on the frontend
                console.log(error)
                }
        }
        
        getPatients();
    }, [])

    const savePatient = async (patient) => {

        //Create the patient on the api
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/patients`;

        const token = localStorage.getItem("token");

        //check if we are givind the id, if we are givind the id, it mean that we are editing a patient
        if(patient.id) {
            try {
                const response = await fetch(`${url}/${patient.id}`, {
                    method: 'PUT', 
                    headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${token}`
                    },
                    body: JSON.stringify(patient)
                });
        
                const result = await response.json();

                console.log(result)
        
                if (!response.ok){ //here we check if there is an error from the backend and we generate a new error with the message from backend
                    throw new Error(result.msg);
                }

                const updatedPatients = patients.map(patientState => patientState._id === result._id ? result : patientState)
                setPatients(updatedPatients)

                //if everything is ok then
                setAlert({msg: "Patient Modified successfully", error1: false})
                
                return;

            } catch (error) {
            setAlert({msg: error.message, error1: true}) //here we show the backend error on the frontend
            console.log(error)
            }
        }

        //new patient
        try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(patient)
        });

        const result = await response.json();

        if (!response.ok){ //here we check if there is an error from the backend and we generate a new error with the message from backend
            throw new Error(result.msg);
        }

        const {createdAt, __v, updatedAt, ...savedPatient} = result; //this create a new object deleting this propieties

        setPatients([savedPatient, ...patients]);
        
        //if everything is ok then
        setAlert({msg: "Patient created successfully", error1: false})
        
        

        } catch (error) {
        setAlert({msg: error.message, error1: true}) //here we show the backend error on the frontend
        console.log(error)
        }
    }

    const editPatient = (patient) => {
        setPatient(patient);
    }

    //to delete a patient
    const deletePatient = async id => {
        const confirmation = confirm("This patient is going to be deleted, are you sure?");
        if(confirmation){

             //Create the patient on the api
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/patients`;

            const token = localStorage.getItem("token");

            try {
                const response = await fetch(`${url}/${id}`, {
                    method: 'DELETE', 
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

                const updatedPatients = patients.filter(patientState => patientState._id !== id)
                setPatients(updatedPatients)

                //if everything is ok then
                setAlert({msg: "Patient Deleted successfully", error1: false})

            } catch (error) {
            setAlert({msg: error.message, error1: true}) //here we show the backend error on the frontend
            console.log(error)
            }
        }
    }
    
    return (
        <PatientContext.Provider 
        value={{
            patients, savePatient, editPatient, patient, deletePatient
        }}>
            {children}
        </PatientContext.Provider>    
    )
}





export default PatientContext;


