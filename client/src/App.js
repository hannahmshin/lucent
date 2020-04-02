import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Preview from "./components/Preview";

import './App.css';

const client = new W3CWebSocket('ws://localhost:8999');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        color: 'blue'
      }
    }
  }

  componentWillMount() {
    client.onopen = () => {
      console.log('client connected');
    };

    client.onmessage = (message) => {
      var data = JSON.parse(message.data)
      this.setState({ data })
    };

    client.onclose = () => {
      console.log('client disconnected')
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <p>
              Welcome to Lucent
            </p>

            <p>
              {this.state.data.color}
            </p>
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
            <Settings />
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

function Settings() {
  return (
    <div>
      <h2>Settings</h2>
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
