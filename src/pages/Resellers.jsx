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
  Plus,
} from "lucide-react";
import { Badge } from "../components/ui/Badge";
import AddResellerForm from "../components/AddResellerForm";
import ViewResellerModal from "../components/ViewResellerModal";
import EditResellerForm from "../components/EditResellerForm ";
import { Progress } from "../components/ui/Progress";
import { useResellers } from "../hooks/resellers/use-getReseller";

const Resellers = () => {
  const {
    filteredResellers,
    isAddFormOpen,
    setIsAddFormOpen,
    isEditFormOpen,
    setIsEditFormOpen,
    isViewModalOpen,
    setIsViewModalOpen,
    selectedReseller,
    setSelectedReseller,
    searchTerm,
    setSearchTerm,
    calculateDiscountProgress,
    getDiscountStatus,
    handleAddReseller,
    handleUpdateReseller,
    handleDeleteReseller,
    handleViewReseller,
    handleEditReseller,
  } = useResellers();

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
              {/* No resellers found matching your search criteria. */}
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

        {filteredResellers.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto max-w-md">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <Plus className="h-full w-full" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No customer sale found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Get started by creating your first customer sale"}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setIsAddFormOpen(false)}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create Customer Sale
                </button>
              </div>
            </div>
          </div>
        )}
      </div>


      <AddResellerForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(true)}
        onAdd={handleAddReseller}
      />

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
