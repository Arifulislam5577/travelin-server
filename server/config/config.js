import admin from "firebase-admin";
import { serviceAccount } from "./serviceAccount.js";

const firebaseApp = admin.initializeApp({
  credential: admin.credential?.cert(serviceAccount),
});

export default firebaseApp;
