import {useEffect, useState } from "react";
import {auth} from"../firebase";
const Profile = () => {
   
    const [email,setEmail]=useState("");
    const [role,setRole]= useState("");
    

    useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("https://project-management-system-1jso.onrender.com/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) =>
  response.json())
  .then((data)=>{
    console.log("PROFILE DATA:",data);
    
    setEmail(auth.currentUser?.email||"");
    console.log(" Firebase Email :",auth.currentUser?.email);
    setRole(data.role);

  })
  .catch((error)=>{
  console.log("Error:",error);

    });
}, []);
        

    const handleSave = () => {
        console.log("Role:",role);
        console.log("Email:",email);
    };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">My Profile</h1>

      <p className="mt-2 text-gray-500">
        Manage your profile information
      </p>

      <div className="mt-6 max-w-xl rounded-lg border p-6">
        <h2 className="text-lg font-medium mb-4">
          Personal Information
        </h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <p>{email}</p>
          {/* <input
            type="email"
            placeholder="Your email"
            className="w-full border rounded-md px-3 py-2"
            value={email}
            onChange={(e) =>
                setEmail(e.target.value)
            }
          /> */}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Role
          </label>
          <p> {role}</p>
          {/* <input
            type="text"
            placeholder="Your role"
            className="w-full border rounded-md px-3 py-2"
            value={role}
            onChange={(e) =>
                setRole(e.target.value)
            }
          /> */}
        </div>

        {/* <button onClick={handleSave} 
            className="px-4 py-2 rounded-md bg-blue-600 text-white">
          Save Changes
        </button> */}
      </div>
    </div>
  );
};

export default Profile;