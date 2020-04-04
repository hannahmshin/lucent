import React from 'react';
import './login.css';

import Logo from '../Logo/Logo.js'

function Login() {
  return (
    <section class="container">
      <Logo />
      <form id="login">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
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