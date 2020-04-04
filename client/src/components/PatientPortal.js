import React from 'react';
import {
  useParams
} from "react-router-dom";

function PatientPortal({ getSession }) {
  const { id } = useParams();

  return (
    <div>
      <button onClick={() => getSession(id)}>enter session</button>
    </div>
  );
}

export default PatientPortal;