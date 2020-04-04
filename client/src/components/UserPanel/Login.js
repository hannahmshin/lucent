import React, { useState } from 'react';
import './login.css';

import Logo from '../Logo/Logo.js'

function Form({ handleSubmit, loginReq }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit(email, password)
  }

  return (
    <div>
      <form id="login" onSubmit={onSubmit} >
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" id="login-btn" class="btn">
          {loginReq ? "Login" : "Register"}
        </button>
      </form>
    </div>
  )
}

function UserPanel({ handleLogin, handleRegister }) {
  const [loginReq, setLoginReq] = useState(true);

  let form = loginReq ? <Form handleSubmit={handleLogin} loginReq={loginReq} /> : <Form handleSubmit={handleRegister} loginReq={loginReq} />

  return (
    <section class="container">
      <Logo />
      {form}
      {loginReq
        ? <p class="register">
          Don't have an account?&nbsp;
            <a class="register" onClick={() => setLoginReq(false)}>Register here</a>
        </p>
        : <p class="register">
          Already have an account?&nbsp;
            <a class="register" onClick={() => setLoginReq(true)}>Sign in Here</a>
        </p>}
    </section>
  );
}

export default UserPanel;
