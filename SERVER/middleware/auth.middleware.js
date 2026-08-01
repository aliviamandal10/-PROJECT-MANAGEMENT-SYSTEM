  import{getAuth}from "firebase-admin/auth";
  import firebaseAdmin from "../config/firebaseAdmin.js";
  console.log("auth middleware loaded")

const verifyToken = async (req, res, next) => {
  console.log("verify token function executed");
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    console.log("middleware hit");
    console.log("AUTH HEADER:", req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    console.log(firebaseAdmin);

    const decodedUser = await getAuth().verifyIdToken(token);
      // .auth()
      // .verifyIdToken(token);
      console.log("DECODED USER:", decodedUser);

    req.authenticatedUser = decodedUser;

    next();
  } catch (error) {
    console.log("Firebase   Error code : ", error.code);
    console.log("Firebase   Error message : ", error.message);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default verifyToken;