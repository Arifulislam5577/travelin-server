import firebaseApp from "firebase-admin";

import serviceAccount from "./serviceAccount.json" assert { type: "json" };
firebaseApp.initializeApp;
const admin = firebaseApp.initializeApp({
  credential: firebaseApp.credential.cert(serviceAccount),
});

export default admin;
