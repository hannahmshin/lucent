const WebSocket = require('ws');
const shortid = require('shortid');
const nodeMailer = require('nodemailer');
const config = require('config');

const baseUrl = process.env.baseUrl || `localhost:3000`
const transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'lucent.emdr@gmail.com',
    pass: config.get('pw')
  }
});

module.exports = {
  updateSettings: (clients, data) => {
    clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data.update));
      }
    });
  },
  shareSession: (db, data) => {
    let sessionId = shortid.generate();

    db.get('sessions')
      .push({ id: sessionId, state: data.state })
      .write()

    let link = `${baseUrl}/${sessionId}`;

    let mailOptions = {
      to: data.email,
      subject: "Your Personalized Lucent EMDR Session",
      body: `Enter the patient portal here: ${link}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(`message sent to ${data.email}`);
    });
  },
  getSession: (clients, db, data) => {
    var state = db.get('sessions')
      .find({ id: data.id })
      .value()
      .state;

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(state ? JSON.stringify(state) : null);
      }
    });
  }
}
