import React, { useState } from "react";
import { Card } from "./ui/Card";
import { MapPin, Phone, Search } from "lucide-react";
import { useSupplier } from "../hooks/use-supplier";

export const SupplierList = ({ onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data = {}, isLoading, isError, error } = useSupplier();

  const suppliers = data.data || [];

  if (isLoading) return <p>Loading supplier...</p>;
  if (isError)
    return <p>Error: {error?.data?.message || "Failed to load supplier"}</p>;

  
  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-white max-h-[80vh] flex flex-col border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Select Supplier</h2>
            <button variant="ghost" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {filteredSuppliers.map((supplier) => (
              <Card
                key={supplier._id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors border-gray-200"
                onClick={() => onSelect(supplier)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{supplier.name}</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {supplier.type || "Unknown"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {supplier?.address
                        ? `${supplier.address.street}, ${supplier.address.city}, ${supplier.address.zip}`
                        : "No address"}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-3 w-3 mr-1" />
                      {supplier.phoneNumber}
                    </div>
                  </div>
                  <button
                    variant="outline"
                    size="sm"
                    className="ml-4 px-4 py-2 text-sm  border border-gray-200 hover:bg-blue-50"
                  >
                    Select
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
