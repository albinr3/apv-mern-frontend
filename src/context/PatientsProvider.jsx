import { createContext, useState, useEffect } from "react";

const PatientContext = createContext();

export const PatientsProvider = (props) => {
    const {children} = props;
    const [alert, setAlert] = useState({})
    const [patients, setPatients] = useState([]);

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
                //if everything is ok then
                setAlert({msg: "Patient created successfully", error1: false})
                
                
        
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

    return (
        <PatientContext.Provider 
        value={{
            patients, savePatient, alert
        }}>
            {children}
        </PatientContext.Provider>    
    )
}





export default PatientContext;


