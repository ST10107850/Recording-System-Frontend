import React, { useState } from "react";
import Topbar from "../components/TopBar";
import { Card } from "../components/ui/Card";
import { MapPin, Phone, Mail } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { useNavigate } from "react-router";

const Vendors = () => {
  const [resellers] = useState([
    {
      id: 1,
      name: "Sweet Treats Café",
      contact: "Jenny Smith",
      email: "jenny@sweettreats.co.za",
      phone: "+27 21 555 0123",
      address: "123 Main Street, Cape Town",
      status: "active",
      commission: 15,
      totalSales: 45000,
      thisMonth: 20,
      products: ["Cupcakes", "Muffins", "Scones"],
    },
    {
      id: 2,
      name: "Corner Bakery",
      contact: "David Williams",
      email: "david@cornerbakery.co.za",
      phone: "+27 21 555 0456",
      address: "456 Oak Avenue, Stellenbosch",
      status: "active",
      commission: 12,
      totalSales: 32000,
      thisMonth: 10,
      products: ["Bread", "Pastries", "Cakes"],
    },
    {
      id: 3,
      name: "Gourmet Delights",
      contact: "Maria Garcia",
      email: "maria@gourmetdelights.co.za",
      phone: "+27 21 555 0789",
      address: "789 Pine Road, Paarl",
      status: "pending",
      commission: 18,
      totalSales: 28500,
      thisMonth: 5,
      products: ["Artisan Breads", "Croissants", "Macarons"],
    },
    {
      id: 4,
      name: "Local Market Stand",
      contact: "Peter Johnson",
      email: "peter@localmarket.co.za",
      phone: "+27 21 555 0321",
      address: "321 Market Square, Somerset West",
      status: "inactive",
      commission: 10,
      totalSales: 15000,
      thisMonth: 2,
      products: ["Scones", "Muffins"],
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const navigate = useNavigate();
  const handleAddVendor = () => {
    navigate("/vendors/create");
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        title="Vendor Management"
        showSearch={true}
        showAddButton={true}
        addButtonText="Add Vendor"
        onAddClick={handleAddVendor}
      />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {resellers.map((reseller) => (
            <Card
              key={reseller.id}
              className="p-6 hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {reseller.name}
                    </h3>
                    <p className="text-sm text-gray-600">{reseller.contact}</p>
                  </div>
                  <Badge className={getStatusColor(reseller.status)}>
                    {reseller.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{reseller.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{reseller.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>{reseller.address}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">
                      R {reseller.totalSales.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Total Purchased</div>
                  </div>
                  <div className="text-center">
                    {/* <div className="text-lg font-semibold text-green-600">
                      {reseller.thisMonth.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      Total Number of Items
                    </div> */}
                  </div>
                </div>

                <div className="flex pt-3  border-t justify-between border-gray-100">
                  <button className="border border-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-50 transition">
                    View Details
                  </button>
                  <button className="border border-gray-200 text-sm px-6 py-2 rounded hover:bg-gray-50 transition">
                    Edit
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vendors;
