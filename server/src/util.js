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

const publish = (clients, data) => {
  clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
<<<<<<< HEAD
      client.send(typeof data == String ? data : JSON.stringify(data));
=======
      client.send(typeof data == string ? data : JSON.stringify(data));
>>>>>>> d4b8e89... feat(Patients): add Patient server methods
    }
  });
}

module.exports = {
  updateSettings: (clients, data) => {
    publish(clients, data.update);
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

    publish(clients, state)
  },
  login: (clients, db, data) => {
    let user = db.get('users')
      .find({ email: data.email })
      .value();

    if (!user) {
      publish(clients, { isLoggedIn: false })
      return;
    }

    let patients = user.patients;
    publish(clients, { patients: patients, isLoggedIn: true });
  },
  register: (clients, db, data) => {
    db.get('users')
      .push({ email: data.email, patients: [] })
      .write();

    publish(clients, { isLoggedIn: true })
  },
  savePatientSession: (db, data) => {
    let sessionId = shortid.generate();

    db.get('sessions')
      .push({ id: sessionId, state: data.state })
      .write()

    // db.get('users')
    //   .find({ email: data.email });
    // push to their clients id.
  },
  getPatients: (clients, db, data) => {
    let patients = db.get('users')
      .find({ email: data.email })
      .value()
      .patients;

    publish(clients, { patients })
  }




}
