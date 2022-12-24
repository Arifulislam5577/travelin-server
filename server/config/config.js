import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.json";

const firebaseApp = admin.initializeApp({
  credential: admin.credential?.cert(serviceAccount),
});

export default firebaseApp;
