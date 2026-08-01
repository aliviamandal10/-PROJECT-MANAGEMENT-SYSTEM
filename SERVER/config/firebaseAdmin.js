import * as firebaseAdmin from "firebase-admin";
//import admin from "firebase-admin";
import serviceAccount from "./project-management-5e028-firebase-adminsdk-fbsvc-3957835ccb.json" with { type: "json" };
// console.log( "ADMIN:",firebaseAdmin);
// console.log( "CREDENTIAL:",serviceAccount);
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.cert(serviceAccount),
});
// console.log("ADMIN:",firebaseAdmin);
// console.log("ADMIN.CREDENTIAL:",firebaseAdmin.credential);

export default firebaseAdmin;