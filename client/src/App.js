import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import logo from './logo.svg';
import './App.css';

const client = new W3CWebSocket('ws://localhost:8999');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Hello World!'
    };
  }

  componentWillMount() {
    client.onopen = () => {
      console.log('client connected');
    };

    client.onmessage = (message) => {
      console.log(`data is ${message.data}`);
      this.setState({ text: message.data })
    };

    client.onclose = () => {
      console.log('client disconnected')
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.text}
          </p>
        </header>
      </div>
    );
  }
}

export default App;