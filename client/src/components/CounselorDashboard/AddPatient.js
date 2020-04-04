import React, { useState } from 'react';

function AddPatient({ addPatient }) {
  const [firstName, setFirstName] = useState('');
  const [lastInitial, setLastInitial] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    addPatient(firstName, lastInitial)
  }

  return (
    <div>
      <form id="login" onSubmit={onSubmit} >
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Initial"
          onChange={(e) => setLastInitial(e.target.value)}
        />
        <button type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default AddPatient;