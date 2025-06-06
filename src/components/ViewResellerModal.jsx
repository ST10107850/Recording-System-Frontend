import React from "react";
import { Badge } from "../components/ui/Badge";
import { MapPin, Phone, Mail, TrendingUp, Package, X } from "lucide-react";

const ViewResellerModal = ({ isOpen, onClose, reseller }) => {
  if (!isOpen || !reseller) return null;

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-lg w-full p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="relative mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Reseller Details</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
            aria-label="Close modal"
          >
            <X />
          </button>
        </header>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {reseller.name}
              </h3>
              <p className="text-gray-600">{reseller.contact}</p>
            </div>
            <Badge className={getStatusColor(reseller.status)}>
              {reseller.status}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-5 h-5 text-gray-400" />
              <span>{reseller.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-gray-400" />
              <span>{reseller.phone}</span>
            </div>
            <div className="flex items-start gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <span>{reseller.address}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">
                R {reseller.totalSales?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-500">Total Sales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-green-600">
                R {reseller.thisMonth?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-500">This Month</div>
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">
                Commission: {reseller.commission}%
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <div className="text-gray-700 font-medium mb-2">Products:</div>
                <div className="flex flex-wrap gap-1">
                  {reseller.products && reseller.products.length > 0 ? (
                    reseller.products.map((product, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {product}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-gray-500">No products assigned</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewResellerModal;
