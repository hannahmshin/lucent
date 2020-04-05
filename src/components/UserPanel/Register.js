import React, { useState } from 'react';
import './login.css';

import Logo from '../Logo/Logo.js'

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section class="container">
      <Logo />
      <form id="login" onSubmit={() => handleLogin(email, password)} >
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
        <button type="submit" id="login-btn" class="login-btn">
          Login
      </button>
      </form>
      <p class="register">
        Don't have an account?&nbsp;
      <a class="register" href="blank">Register here</a>
      </p>
    </section>
  );
}

export default Login;