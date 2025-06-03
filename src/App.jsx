import "./App.css";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { LoginPage } from "./pages/LoginPage";
import { CreateVendors } from "./components/createVendors";
import { Routes, Route } from "react-router-dom";
import AppSidebar from "./components/AppSidebar";
import Layout from "./layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import Resellers from "./pages/Resellers";

function App() {
  return (
    <div>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vendors" element={<CreateVendors />} />
          <Route path="/resellers" element={<Resellers />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
