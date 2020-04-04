import React, { useState } from 'react'
import AddPatient from './AddPatient'
import PatientList from './PatientList'

function Dashboard({ addPatient, patients }) {
  const [add, setAdd] = useState(false);

  return (
    <div>
      {add ? <button onClick={() => setAdd(false)}>Back</button> : <button onClick={() => setAdd(true)}>Add Patient</button>}
      {add ? <AddPatient addPatient={addPatient} /> : <PatientList patients={patients} />}
    </div>
  );
}

export default Dashboard;