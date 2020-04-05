import React, { useState } from 'react';
import { IoIosAdd, IoIosArrowForward } from "react-icons/io";
import AppHeader from "../../AppHeader";

import './dashboard.css'

function Patient({ patient, getSession }) {
  return (
    <div className="patientName">
      <h3>{patient.firstName} {patient.lastInitial}</h3>
      <span>Last updated 04/04/2020 | Last shared 04/01/2020</span>
    </div>
  )
}

function PatientList({ patients, setAdd, getSession, inMenu }) {
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

function PatientCard({ patient, getSession }) {
  return (
    <div className="patientName-menu">
      <h3>{patient.firstName} {patient.lastInitial}</h3>
      <span>Last updated 04/04/2020 | Last shared 04/01/2020</span>
    </div>
  )
}

function PatientMenu({ patients, getSession, setAdd }) {
  return (
    <div className="dashboard-menu">
      <div className="addButtonContainer-menu">
        <h2>Create Session</h2>
        <IoIosAdd onClick={setAdd} size={32} />
      </div>
      <div className="patientContainer-menu">
        <div className="patientList-menu">
          {patients.map((patient) => (<PatientCard key={patient.id} patient={patient} getSession={getSession} />))}
        </div>
      </div>
    </div>
  )
}

function AddPatient({ addPatient, setAdd }) {
  const [firstName, setFirstName] = useState('');
  const [lastInitial, setLastInitial] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    setAdd(false)
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
        <button id="create" type="submit" className="btn">
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
      <AppHeader content={<PatientMenu getSession={getSession} patients={patients} setAdd={() => setAdd(false)} />} />
      {add ? <AddPatient addPatient={addPatient} setAdd={() => setAdd(false)} /> : <PatientList setAdd={() => setAdd(true)} patients={patients} getSession={getSession} />}
    </>
  )
}

export default Dashboard;
