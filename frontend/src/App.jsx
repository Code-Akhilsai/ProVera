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
function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/provider-dashboard"} element={<ProviderDashboard />} />
      <Route path={"/profile"} element={<Profile />} />
      <Route path={"/upload-documents"} element={<UploadDocuments />} />
      <Route path={"/submit"} element={<Submit />} />
      <Route path={"/adminlogin"} element={<Adminlogin />} />
      <Route path={"/admin-dashboard"} element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
