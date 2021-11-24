var admin = require("firebase-admin");

var serviceAccount = require("./connection.json");

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const fbService = admin.firestore();

module.exports = fbService;
