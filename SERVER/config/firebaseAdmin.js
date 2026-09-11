import * as firebaseAdmin from "firebase-admin";
import { initializeApp,cert } from "firebase-admin/app";
import dotenv from "dotenv";
dotenv.config();
//import admin from "firebase-admin";
//import serviceAccount from "./project-management-5e028-firebase-adminsdk-fbsvc-3957835ccb.json" with { type: "json" };
// console.log( "ADMIN:",firebaseAdmin);
// console.log( "CREDENTIAL:",serviceAccount);
// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.cert(serviceAccount),
// });
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, "base64").toString("utf8")
);

initializeApp({
  credential: cert(serviceAccount),
});
// console.log("ADMIN:",firebaseAdmin);
// console.log("ADMIN.CREDENTIAL:",firebaseAdmin.credential);

export default firebaseAdmin;