import React, { useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Settings from "./components/Settings";

import './App.css';

const client = new W3CWebSocket('ws://localhost:8999');

const App  = () => {
  const initialState = {
    color: 'white',
    size: 4
  };
  const [state, setState] = useState(initialState);

  client.onopen = () => {
    console.log('client connected');
  };

  client.onmessage = (message) => {
    var data = JSON.parse(message.data)

    setState(prevState => {
      return {...prevState, ...data};
    })
  };

  client.onclose = () => {
    console.log('client disconnected')
  }

  const updateServer = (update) => {
    client.send(JSON.stringify(update));
  }

  return (
    <Router>
      <div className="App">
        <section className="top-header"></section>
        <header className="App-header">
          <p>
            Lucent
          </p>

          <p>
            Color: {state.color}
          </p>

          <p>
            Size: {state.size}
          </p>

          <button value="red" onClick={e => updateServer({ color:  e.target.value})}>change color</button>
          <button onClick={() => updateServer({ size: state.size + 1})}>change size</button>

        </header>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/clients">Clients</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/preview">Preview</Link>
          </li>
          <li>
            <Link to="/share">Share</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/clients">
          <Clients />
        </Route>
        <Route exact path="/settings">
          <Settings state={state}  />
        </Route>
        <Route path="/preview">
          <Preview />
        </Route>
        <Route path="/share">
          <Share />
        </Route>
      </Switch>
    </Router>
  );
}


function Login() {
  return (
    <div>
      <h2>Login</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function Clients() {
  return (
    <div>
      <h2>Clients</h2>
    </div>
  );
}

function Preview() {
  return (
    <div>
      <h2>Preview</h2>
    </div>
  );
}

function Share() {
  return (
    <div>
      <h2>Share</h2>
    </div>
  );
}

export default App;
