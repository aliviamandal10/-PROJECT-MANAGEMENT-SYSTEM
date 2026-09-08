import { Routes, Route } from "react-router-dom";

import Login from "./Login";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import ProjectDetails from "./pages/ProjectDetails";
import TaskDetails from "./pages/TaskDetails";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes> 

      {/* Login Page */}
      <Route path="/" element={<Login />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<ProtectedRoute >
              <Layout/>
              </ProtectedRoute>
      }
      >
        <Route index element={<Dashboard />} />
        </Route>
        <Route path="projects" element=
        {<ProtectedRoute>
          <Layout/>
          </ProtectedRoute>} >
        <Route index element = {<Projects/>}/>
        </Route>
        <Route path="/projectsDetails"
        element={<ProtectedRoute>
          <ProjectDetails/>
          </ProtectedRoute>
        }
        />
       
        <Route path="team" element={<ProtectedRoute>
          <Layout/>
          </ProtectedRoute>
          } 
          >
        <Route index element ={<Team/>}/>
        </Route>
        <Route path="/taskDetails" element={<ProtectedRoute>
          <TaskDetails/>
          </ProtectedRoute>}
        />
        <Route
        path="/profile"
        element = {
          <ProtectedRoute>
            <Profile/>

          </ProtectedRoute>
        }
        />

    </Routes>
  );
};

export default App;




