const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const db = low(new FileSync('db.json'))

const app = express()
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const { updateSettings, shareSession, getSession } = require('./util.js');

db.defaults({ sessions: [] })
  .write()

wss.on('connection', (ws) => {
  ws.on('message', function incoming(msg) {
    const data = JSON.parse(msg);

    if (data.event == "updateSettings") {
      updateSettings(wss.clients, data);
    } else if (data.event == "shareSession") {
      shareSession(db, data)
    } else if (data.event == "getSession") {
      getSession(wss.clients, db, data)
    }
  });
});

server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
