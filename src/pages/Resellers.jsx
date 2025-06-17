import React, { useEffect, useState } from "react";
import Topbar from "../components/TopBar";
import { Card } from "../components/ui/Card";
import {
  MapPin,
  Phone,
  Mail,
  Gift,
  Package,
  Eye,
  Edit,
  Trash2,
  Building2,
} from "lucide-react";
import { Badge } from "../components/ui/Badge";
import AddResellerForm from "../components/AddResellerForm";
import ViewResellerModal from "../components/ViewResellerModal";
import EditResellerForm from "../components/EditResellerForm ";
import { Progress } from "../components/ui/Progress";
import { useGetCustomerCountSalesQuery } from "../features/user/sale-slice";

const Resellers = () => {
  const { data = {} } = useGetCustomerCountSalesQuery();
  const resellersData = React.useMemo(
    () => (Array.isArray(data.data) ? data.data : []),
    [data.data]
  );
  
  const [resellers, setResellers] = useState([]);

  useEffect(() => {
    setResellers(resellersData);
  }, [resellersData]);


  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReseller, setSelectedReseller] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  const filteredResellers = resellers.filter((reseller) => {
    const shopName = reseller.customer?.shopName?.toLowerCase() || "";
    const name = reseller.customer?.name?.toLowerCase() || "";
    return (
      shopName.includes(searchTerm.toLowerCase()) ||
      name.includes(searchTerm.toLowerCase())
    );
  });


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
        reseller._id === updatedReseller._id ? updatedReseller : reseller
      )
    );
    setSelectedReseller(null);
  };

  const handleDeleteReseller = (id) => {
    if (window.confirm("Are you sure you want to delete this reseller?")) {
      setResellers((prev) => prev.filter((reseller) => reseller._id !== id));
    }
  };

  const handleViewReseller = (id) => {
    const reseller = resellers.find((reseller) => reseller._id === id);
    setSelectedReseller(reseller || null);
    setIsViewModalOpen(true);
  };

  const handleEditReseller = (id) => {
    const reseller = resellers.find((r) => r._id === id);
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
            filteredResellers.map((reseller) => {
              const salesCount = reseller.saleCount || 0;
              const discountProgress = calculateDiscountProgress(salesCount);
              const discountStatus = getDiscountStatus(salesCount);

              const customer = reseller.customer || {};

              const products = reseller.products || [];

              const totalSales = reseller.totalSpent ?? 0;

              return (
                <Card
                  key={reseller._id}
                  className="p-6 hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {customer.shopName ||
                            customer.name ||
                            "Unnamed Customer"}
                        </h3>
                        <p className="text-sm text-gray-600">{customer.name}</p>
                        {customer.vatNo && (
                          <p className="text-xs text-gray-500">
                            VAT: VAT{customer.vatNo}
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
                          {salesCount}/15 sales
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
                      {customer.contact && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{customer.contact}</span>
                        </div>
                      )}
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

                    {products.length > 0 && (
                      <div className="space-y-2 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-700">
                            Products
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {products.slice(0, 3).map(({ product }, index) => (
                            <span
                              key={index}
                              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                            >
                              {product?.name || "Unnamed"}
                            </span>
                          ))}
                          {products.length > 3 && (
                            <span className="text-xs text-blue-600">
                              +{products.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          R {totalSales}
                        </div>
                        <div className="text-xs text-gray-500">Total Sales</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">
                          {salesCount}
                        </div>
                        <div className="text-xs text-gray-500">
                          Total Sales Count
                        </div>
                      </div>
                    </div>

                    <div className="flex pt-3 border-t justify-between border-gray-100">
                      <button
                        onClick={() => handleViewReseller(reseller._id)}
                        className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 border border-gray-200"
                        title="View Reseller"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleEditReseller(reseller._id)}
                        className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 border border-gray-200"
                        title="Edit Reseller"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReseller(reseller._id)}
                        className="flex items-center gap-2 px-3 py-1 rounded hover:bg-red-100 text-red-600 border border-gray-200"
                        title="Delete Reseller"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {isAddFormOpen && (
        <AddResellerForm
          onClose={() => setIsAddFormOpen(false)}
          onAdd={handleAddReseller}
        />
      )}

      <ViewResellerModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedReseller(null);
        }}
        reseller={selectedReseller}
      />

      {isEditFormOpen && selectedReseller && (
        <EditResellerForm
          reseller={selectedReseller}
          onClose={() => {
            setIsEditFormOpen(false);
            setSelectedReseller(null);
          }}
          onUpdate={handleUpdateReseller}
        />
      )}
    </div>
  );
};

export default Resellers;
