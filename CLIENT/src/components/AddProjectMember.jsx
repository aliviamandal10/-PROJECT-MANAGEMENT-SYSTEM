import { useState,useEffect } from "react";
import { Mail, UserPlus } from "lucide-react";

import { useSearchParams } from "react-router-dom";

const AddProjectMember = ({ isDialogOpen, setIsDialogOpen }) => {

    const [searchParams] = useSearchParams();

    const id = searchParams.get('id');

    const [email, setEmail] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [users,setUsers]= useState([]);
    useEffect (()=>{
        const fetchUsers = async ()=>{
           
            try {
                const response = await fetch ("http://localhost:5000/users");
                const data = await response.json();
                console.log("Users API response:",data);
                if(!response.ok)
                {
                    throw new Error(data.message || "Failed to fetch users");
                }
                setUsers(data);
            } catch (error) {
                console.error("Fetch users error:", error);
            }
        };
        fetchUsers();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        try {
            const token = localStorage.getItem("token");
             console.log("Sending add member reques...");
            const response = await fetch(`http://localhost:5000/projects/${id}/members`,{
                method:"PUT",
                headers :{
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`,
                },
                body:JSON.stringify({
                    email:email,
                }),

            });
            console.log("Response received:",response.status);
            const data = await response.json();
            console.log("Add member response:",data);
            if(!response.ok){
                throw new Error(data.message || "Failed to add member");
            }
            alert ("Member added successfully!");
            setEmail("");
            setIsDialogOpen(false);
        }
        catch (error){
            console.error("Add member error:",error);
            alert(error.message);
        }
        finally {
            setIsAdding(false);
        }
        
    };

    if (!isDialogOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl p-6 w-full max-w-md text-zinc-900 dark:text-zinc-200">
                {/* Header */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <UserPlus className="size-5 text-zinc-900 dark:text-zinc-200" /> Add Member to Project
                    </h2>
                   
                        
                
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 w-4 h-4" />
                            {/* List All non project members */}
                            <select
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-2 pl-10 pr-3"
                            >
                                <option value="">Select a user</option>
                                {users.map((user) => (
                                    <option key={user._id} value={user.email}>
                                        {user.email}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={() => setIsDialogOpen(false)} className="px-5 py-2 text-sm rounded border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition" >
                            Cancel
                        </button>
                        <button type="submit" disabled={isAdding || !email} className="px-5 py-2 text-sm rounded bg-gradient-to-br from-blue-500 to-blue-600 hover:opacity-90 text-white disabled:opacity-50 transition" >
                            {isAdding ? "Adding..." : "Add Member"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProjectMember;
