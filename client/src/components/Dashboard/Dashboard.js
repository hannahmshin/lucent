import React, { useState } from 'react';
import { IoIosAdd } from "react-icons/io";

import './dashboard.css'

function Patient({ patient, getSession }) {
  return (
    <div class="patientName">
      <a onClick={() => getSession(patient.id)} >{patient.firstName} {patient.lastInitial}</a>
    </div>
  )
}

function PatientList({ patients, setAdd, getSession }) {
  return (
    <div class="dashboard">
      <div class="addButtonContainer">
        <div class="createSession">Create Session</div>
        <IoIosAdd onClick={setAdd} size={32} />
      </div>
      <div class="patientContainer">
        <div class="patientHeader">Activity</div>
        <div class="patientList">
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
    <div class="addPatient">
      <form class="patientForm" onSubmit={onSubmit} >
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
    <div>
      {add ? <AddPatient addPatient={addPatient} /> : <PatientList setAdd={() => setAdd(true)} patients={patients} getSession={getSession} />}
    </div>
  )
}

export default Dashboard;