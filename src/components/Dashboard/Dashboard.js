import React, { useState } from 'react';
import { IoIosAdd } from "react-icons/io";
import AppHeader from "../../AppHeader";

import './dashboard.css'

function Patient({ patient, getSession }) {
  return (
    <div className="patientName">
      <a onClick={() => getSession(patient.id)} >{patient.firstName} {patient.lastInitial}</a>
      <span>Last updated 04/04/2020 | Last shared 04/01/2020</span>
    </div>
  )
}

function PatientList({ patients, setAdd, getSession }) {
  return (
    <div className="dashboard">
      <div className="addButtonContainer">
        <h2>Create Session</h2>
        <IoIosAdd onClick={setAdd} size={32} />
      </div>
      <div className="patientContainer">
        <div className="patientHeader">Activity</div>
        <div className="patientList">
          {patients.map((patient) => (<Patient key={patient.id} patient={patient} getSession={getSession} />))}
        </div>
      </div>
    </div>
  )
}

function AddPatient({ addPatient }) {
  const [firstName, setFirstName] = useState('');
  const [lastInitial, setLastInitial] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    addPatient(firstName, lastInitial)
  }

  return (
    <div className="addPatient">
      <form className="patientForm" onSubmit={onSubmit} >
        <input
          id="name"
          type="text"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          id="name"
          type="text"
          placeholder="Last Initial"
          onChange={(e) => setLastInitial(e.target.value)}
        />
        <button id="create" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

function Dashboard({ addPatient, patients, getSession }) {
  const [add, setAdd] = useState(false);

  return (
    <>
      <AppHeader />
        {add ? <AddPatient addPatient={addPatient} /> : <PatientList setAdd={() => setAdd(true)} patients={patients} getSession={getSession} />}
    </>
  )
}

export default Dashboard;
