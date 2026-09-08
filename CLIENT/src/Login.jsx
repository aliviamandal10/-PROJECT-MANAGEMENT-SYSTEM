import { useState } from "react";
import { auth } from "./firebase";
import {useNavigate}from"react-router-dom";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const [name,setName]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //  Signup
    const handleSignup = async () => {
    try {
  //     await createUserWithEmailAndPassword(auth, email, password);
  //     alert("Signup successful");
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await fetch("http://localhost:5000/users",{
    method:"POST",
    headers:{
      "Content-Type":
      "application/json"
    },
    body:JSON.stringify({
      name:name,
      email:email,
      password:password
    })
  });
  console.log("MongoDB responses: ",Response.status);
  alert("Signup Sucessful!");
}
catch(err){
  alert(err.message)
}
    };

  // Login
  const handleLogin = async () => {
    try {
     const userCredential = await signInWithEmailAndPassword(auth, email, password);
     const user = userCredential.user;
     const token = await user.getIdToken();
     
     localStorage.setItem("token", token);
      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Firebase Login</h2>
      <input 
      type = "text"
      placeholder="Name"
      value={name}
      onChange={(e) => 
        setName(e.target.value)
      }
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSignup}>Sign Up</button>

      <button onClick={handleLogin} style={{ marginLeft: "10px" }}>
        Login
      </button>
    </div>
  );
}