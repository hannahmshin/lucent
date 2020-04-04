import React, { useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/UserPanel/Login';
import Settings from "./components/Settings";
import Share from './components/Share';
import PatientPortal from './components/PatientPortal';
import Dashboard from './components/Dashboard/Dashboard';

import './App.css';

const client = new W3CWebSocket('wss://lucent-emdr-api.herokuapp.com/');

const App = () => {
  const initialState = {
    color: 'white',
    size: 4,
    isLoggedIn: false,
    patients: [],
    email: null,
    id: null
  };
  const [state, setState] = useState(initialState);

  client.onopen = () => {
    console.log('client connected');
  };

  client.onmessage = async (message) => {
    console.log(`got message ${JSON.stringify(message.data)}`);
    var data = JSON.parse(message.data)

    await setState({ ...state, ...data });
  };

  client.onclose = () => {
    console.log('client disconnected')
  }

  const clientSend = (data, event) => {
    client.send(JSON.stringify({ ...data, event: event }));
  }

  const updateSettings = (update) => {
    clientSend({ update }, "updateSettings")
  }

  const shareSession = (email) => {
    //todo: some email validation
    clientSend({ state, email }, "shareSession")
  }

  const getSession = (id) => {
    clientSend({ id }, "getSession")
  }

  // this doesn't do any password checking :P
  const login = (email, password) => {
    clientSend({ email }, "login")
  }

  const register = (email) => {
    clientSend({ email }, "register")
  }

  const addPatient = (firstName, lastInitial) => {
    clientSend({ firstName, lastInitial, email: state.email }, "addPatient")
  }

  return (
    <Router>
      <div className="App">
        <section className="top-header"></section>
        <header className="App-header">
          <p>
            Lucent
          </p>
        </header>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
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
          {state.isLoggedIn
            ? <Dashboard addPatient={addPatient} patients={state.patients} getSession={getSession} />
            : <Login handleLogin={login} handleRegister={register} />}
        </Route>
        <Route path="/clients">
          <Clients />
        </Route>
        <Route exact path="/settings">
          <Settings state={state} updateSettings={updateSettings} />
        </Route>
        <Route path="/preview">
          <Preview />
        </Route>
        <Route path="/share">
          <Share state={state} shareSession={shareSession} />
        </Route>

        <Route path="/:id">
          <PatientPortal getSession={getSession} />
        </Route>

      </Switch>
    </Router>
  );
}

const Clients = () => (
  <div>
    Clients
  </div>
)

const Preview = () => (
  <div>
    Preview
  </div>
)

export default App;
