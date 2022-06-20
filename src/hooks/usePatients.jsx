import { useContext } from 'react';
import PatientContext from '../context/PatientsProvider';


function usePatients() {
    const value = useContext(PatientContext);
    return value;
}

export default usePatients