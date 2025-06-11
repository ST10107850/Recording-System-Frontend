import "./App.css";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { LoginPage } from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import Resellers from "./pages/Resellers";
import Vendors from "./pages/Vendors";
import { Staff } from "./pages/Staff";
import { PurchaseList } from "./pages/PurchaseList";
import { Purchase } from "./pages/Purchase";
import { PurchaseView } from "./pages/PurchaseView";
import { Sales } from "./pages/Sales";
import { Product } from "./pages/Product";
import ProductView from "./pages/ProductView";
import ProductForm from "./pages/ProductForm";
import SaleView from "./pages/SaleView ";
import SaleForm from "./pages/SaleForm";
import Inventory from "./pages/Inventory";
import InventoryView from "./pages/InventoryView";
import InventoryForm from "./pages/InventoryForm";
import Tasks from "./pages/Task";

function App() {
  return (
    <div className="overflow-hidden">
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/resellers" element={<Resellers />} />
          <Route path="/staff" element={<Staff />} />

          <Route path="/purchases">
            <Route index element={<PurchaseList />} />
            <Route path="create" element={<Purchase />} />
            <Route path=":id" element={<PurchaseView />} />
          </Route>

          <Route path="/sales">
            <Route index element={<Sales />} />
            <Route path=":id" element={<SaleView />} />
            <Route path=":id/edit" element={<SaleForm />} />
          </Route>

          <Route path="/products">
            <Route index element={<Product />} />
            <Route path=":id" element={<ProductView />} />
            <Route path=":id/edit" element={<ProductForm />} />
          </Route>

          <Route path="/inventory">
            <Route index element={<Inventory />} />
            <Route path=":id" element={<InventoryView />} />
            <Route path=":id/edit" element={<InventoryForm />} />
          </Route>

          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
