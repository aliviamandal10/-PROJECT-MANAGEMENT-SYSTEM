import { Routes, Route } from "react-router-dom";

import Login from "./Login";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Routes>

      {/* Login Page */}
      <Route path="/" element={<Login />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>

    </Routes>
  );
};

export default App;




