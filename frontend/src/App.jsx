import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Provider/Profile";
import { Routes, Route } from "react-router-dom";
import ProviderDashboard from "./Provider/ProviderDashboard";
import UploadDocuments from "./Provider/UploadDocument";
import Submit from "./Provider/Submit";
import Adminlogin from "./Admin/Adminlogin";
import AdminDashboard from "./Admin/Admindashboard";
import ProtectedRoute from "./Pages/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/adminlogin"} element={<Adminlogin />} />

      {/* Protected Provider Routes */}
      <Route
        path={"/provider-dashboard"}
        element={
          <ProtectedRoute role="user">
            <ProviderDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={"/profile"}
        element={
          <ProtectedRoute role="user">
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path={"/upload-documents"}
        element={
          <ProtectedRoute role="user">
            <UploadDocuments />
          </ProtectedRoute>
        }
      />
      <Route
        path={"/submit"}
        element={
          <ProtectedRoute role="user">
            <Submit />
          </ProtectedRoute>
        }
      />

      {/* Protected Admin Route */}
      <Route
        path={"/admin-dashboard"}
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
