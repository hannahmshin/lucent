import React, { useState } from 'react';

function Share({ shareSession }) {
  const [email, setEmail] = useState('');

  return (
    <div>
      <h2>Share</h2>
      <form onSubmit={() => shareSession(email)}>
        <div>
          <label>Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Share;