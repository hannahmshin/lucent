const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const db = low(new FileSync('db.json'))

const app = express()
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const { updateSettings, shareSession, getSession, login, register, addPatient } = require('./util.js');

db.defaults({ sessions: [], users: [] })
  .write()

wss.on('connection', (ws) => {
  ws.on('message', function incoming(msg) {
    const data = JSON.parse(msg);
    const event = data.event;

    const clients = wss.clients;

    if (event == "updateSettings") {
      updateSettings(clients, data);
    } else if (event == "shareSession") {
      shareSession(db, data)
    } else if (event == "getSession") {
      getSession(clients, db, data)
    } else if (event == "login") {
      login(clients, db, data)
    } else if (event == "register") {
      register(clients, db, data)
    } else if (event == "addPatient") {
      addPatient(clients, db, data)
    }
  });
});

server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
