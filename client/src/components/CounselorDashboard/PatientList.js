import React from 'react';

function Patient({ firstName, lastInitial }) {
  return (
    <div>
      <h1>{firstName} {lastInitial}</h1>
    </div>
  )
}

function PatientList({ patients }) {
  return (
    <div>
      <div>Activity</div>
      {patients.map(({ firstName, lastInitial }) => (
        <Patient firstName={firstName} lastInitial={lastInitial} />
      ))}
    </div>
  )
}

export default PatientList;