import React, { useState } from "react";
import Topbar from "../components/TopBar";
import { Card } from "../components/ui/Card";
import {
  MapPin,
  Phone,
  Mail,
  TrendingUp,
  Package,
  Eye,
  Edit,
  Trash2,
  Building2,
  Gift,
} from "lucide-react";
import { Badge } from "../components/ui/Badge";
import AddResellerForm from "../components/AddResellerForm";
import ViewResellerModal from "../components/ViewResellerModal";
import EditResellerForm from "../components/EditResellerForm ";
import { Progress } from "../components/ui/Progress";

const Resellers = () => {
  const [resellers, setResellers] = useState([
    {
      id: "1",
      shopName: "Sweet Treats Café",
      name: "Jenny Smith",
      email: "jenny@sweettreats.co.za",
      contact: "+27 21 555 0123",
      address: "123 Main Street, Cape Town",
      vatNo: "VAT001",
      status: "active",
      totalSales: 45000,
      thisMonth: 8500,
      salesCount: 12,
      discountEarned: false,
    },
    {
      id: "2",
      shopName: "Corner Bakery",
      name: "David Williams",
      email: "david@cornerbakery.co.za",
      contact: "+27 21 555 0456",
      address: "456 Oak Avenue, Stellenbosch",
      vatNo: "VAT002",
      status: "active",
      totalSales: 32000,
      thisMonth: 6200,
      salesCount: 18,
      discountEarned: true,
    },
    {
      id: "3",
      shopName: "Gourmet Delights",
      name: "Maria Garcia",
      email: "maria@gourmetdelights.co.za",
      contact: "+27 21 555 0789",
      address: "789 Pine Road, Paarl",
      vatNo: "VAT003",
      status: "pending",
      totalSales: 28500,
      thisMonth: 4800,
      salesCount: 10,
      discountEarned: false,
    },
    {
      id: "4",
      shopName: "Local Market Stand",
      name: "Peter Johnson",
      email: "peter@localmarket.co.za",
      contact: "+27 21 555 0321",
      address: "321 Market Square, Somerset West",
      vatNo: "VAT004",
      status: "inactive",
      totalSales: 15000,
      thisMonth: 0,
      salesCount: 3,
      discountEarned: false,
    },
  ]);

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReseller, setSelectedReseller] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResellers = resellers.filter(
    (reseller) =>
      reseller.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reseller.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateDiscountProgress = (salesCount) => {
    const targetSales = 15;
    return Math.min((salesCount / targetSales) * 100, 100);
  };

  const getDiscountStatus = (salesCount) => {
    if (salesCount >= 15) {
      return { eligible: true, remaining: 0 };
    }
    return { eligible: false, remaining: 15 - salesCount };
  };

  const handleAddReseller = (newReseller) => {
    setResellers((prev) => [...prev, newReseller]);
  };

  const handleUpdateReseller = (updatedReseller) => {
    setResellers((prev) =>
      prev.map((reseller) =>
        reseller.id === updatedReseller.id ? updatedReseller : reseller
      )
    );
    setSelectedReseller(null);
  };

  const handleDeleteReseller = (id) => {
    if (confirm("Are you sure you want to delete this reseller?")) {
      setResellers(resellers.filter((reseller) => reseller.id !== id));
    }
  };

  const handleViewReseller = (id) => {
    const reseller = resellers.find((reseller) => reseller.id === id);
    setSelectedReseller(reseller || null);
    setIsViewModalOpen(true);
  };

  const handleEditReseller = (id) => {
    const reseller = resellers.find((reseller) => reseller.id === id);
    setSelectedReseller(reseller || null);
    setIsEditFormOpen(true);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        title="Reseller Management"
        showSearch={true}
        showAddButton={true}
        onSearchChange={(term) => setSearchTerm(term)}
        addButtonText="Add Reseller"
        onAddClick={() => setIsAddFormOpen(true)}
      />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredResellers.length === 0 ? (
            <div className="col-span-1 lg:col-span-2 xl:col-span-3 text-center text-gray-500">
              No resellers found matching your search criteria.
            </div>
          ) : (
            filteredResellers.map((customer) => {
              const discountProgress = calculateDiscountProgress(
                customer.salesCount
              );
              const discountStatus = getDiscountStatus(customer.salesCount);

              return (
                <Card
                  key={customer.id}
                  className="p-6 hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {customer.shopName || customer.name}
                        </h3>
                        <p className="text-sm text-gray-600">{customer.name}</p>
                        {customer.vatNo && (
                          <p className="text-xs text-gray-500">
                            VAT: {customer.vatNo}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {discountStatus.eligible && (
                          <Badge className="bg-purple-100 text-purple-800">
                            <Gift className="w-3 h-3 mr-1" />
                            Discount Eligible
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Discount Progress Section */}
                    <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          Discount Progress
                        </span>
                        <span className="text-sm text-gray-600">
                          {customer.salesCount}/15 sales
                        </span>
                      </div>
                      <Progress value={discountProgress} className="h-2" />
                      <div className="text-xs text-gray-500">
                        {discountStatus.eligible
                          ? "🎉 Eligible for 10% discount on next purchase!"
                          : `${discountStatus.remaining} more sales needed for discount`}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {customer.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{customer.email}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{customer.contact}</span>
                      </div>
                      {customer.address && (
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mt-0.5" />
                          <span>{customer.address}</span>
                        </div>
                      )}
                      {customer.shopName && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building2 className="w-4 h-4" />
                          <span>Shop: {customer.shopName}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex pt-3  border-t justify-between border-gray-100">
                      <button
                        onClick={() => handleViewReseller(customer.id)}
                        className="border border-gray-200 text-sm px-3 py-1 flex items-center gap-2 rounded hover:bg-gray-50 transition"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleEditReseller(customer.id)}
                        className="border border-gray-200 text-sm px-6 py-2 flex items-center gap-2 rounded hover:bg-gray-50 transition"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={handleDeleteReseller}
                        className="border border-gray-200 text-sm text-red-500 px-6 py-2 flex items-center gap-2 rounded hover:bg-gray-50 transition"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
      <AddResellerForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onAddReseller={handleAddReseller}
      />

      <EditResellerForm
        isOpen={isEditFormOpen}
        onClose={() => {
          setIsEditFormOpen(false);
          setSelectedReseller(null);
        }}
        onUpdateReseller={handleUpdateReseller}
        reseller={selectedReseller}
      />

      <ViewResellerModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedReseller(null);
        }}
        reseller={selectedReseller}
      />
    </div>
  );
};

export default Resellers;
