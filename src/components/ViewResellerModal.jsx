import React from "react";
import { Badge } from "../components/ui/Badge";
import { MapPin, Phone, Mail, X, Building2, Package } from "lucide-react";

const ViewResellerModal = ({ isOpen, onClose, reseller }) => {
  if (!isOpen || !reseller) return null;

  const customer = reseller.customer || {};
  const products = reseller.products || [];
  const totalSales = reseller.totalSpent ?? 0;
  const salesCount = reseller.saleCount ?? 0;

  

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-4xl w-full p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto"
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
                {customer.shopName || customer.name || "N/A"}
              </h3>
              <p className="text-gray-600">{customer.name || "—"}</p>
              {customer.vatNo && (
                <p className="text-xs text-gray-500">
                  VAT: VAT{customer.vatNo}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {customer.email && (
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>{customer.email}</span>
              </div>
            )}
            {customer.contact && (
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>{customer.contact}</span>
              </div>
            )}
            {customer.address && (
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <span>{customer.address}</span>
              </div>
            )}
            {customer.shopName && (
              <div className="flex items-start gap-3 text-gray-700">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                <span>{customer.shopName}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">
                R {totalSales.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Total Sales</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">
                {salesCount}
              </div>
              <div className="text-sm text-gray-500">Total Sales Count</div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-5 h-5 text-gray-400" />
              <h4 className="text-lg font-semibold text-gray-900">
                Products Purchased
              </h4>
            </div>

            {products.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="text-left px-4 py-2 border-b border-gray-200">
                        Product Name
                      </th>
                      <th className="text-center px-4 py-2 border-b border-gray-200">
                        Quantity
                      </th>
                      <th className="text-right px-4 py-2 border-b border-gray-200">
                        Unit Price
                      </th>
                      <th className="text-right px-4 py-2 border-b border-gray-200">
                        Total Price
                      </th>
                      <th className="text-right px-4 py-2 border-b border-gray-200">
                        Sale Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(
                      (
                        {
                          product,
                          quantity,
                          unitPrice,
                          productTotal,
                          saleDate,
                        },
                        index
                      ) => (
                        <tr key={index} className="border-t border-gray-200">
                          <td className="px-4 py-2">
                            {product?.name || "Unnamed"}
                          </td>
                          <td className="text-center px-4 py-2">
                            {quantity || 0}
                          </td>
                          <td className="text-right px-4 py-2">
                            R {unitPrice?.toFixed(2) || "0.00"}
                          </td>
                          <td className="text-right px-4 py-2 font-semibold">
                            R {productTotal?.toFixed(2) || "0.00"}
                          </td>
                          <td className="text-right px-4 py-2 text-gray-500">
                            {saleDate
                              ? new Date(saleDate).toLocaleDateString()
                              : "—"}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-3xl mb-2">📦</div>
                <p>No products purchased yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewResellerModal;
