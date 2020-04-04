import React, { useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/login';
import Settings from "./components/Settings";
import Share from './components/Share';
import PatientPortal from './components/PatientPortal';

import './App.css';

const client = new W3CWebSocket('ws://localhost:8999');

const App = () => {
  const initialState = {
    color: 'white',
    size: 4
  };
  const [state, setState] = useState(initialState);

  client.onopen = () => {
    console.log('client connected');
  };

  client.onmessage = (message) => {
    console.log(`got message ${JSON.stringify(message.data)}`);
    var data = JSON.parse(message.data)

    setState(prevState => ({ ...prevState, ...data }));
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

          <button value="red" onClick={e => updateSettings({ color: e.target.value })}>change color</button>
          <button onClick={() => updateSettings({ size: state.size + 1 })}>change size</button>

        </header>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
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
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/clients">
          <Clients />
        </Route>
        <Route exact path="/settings">
          <Settings state={state} />
        </Route>
        {/* <Route path="/preview">
          <Preview />
        </Route> */}
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

export default App;
