import React from "react";
import { useNavigate, useParams } from "react-router";
import TopBar from "../components/TopBar";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { useGetPurchaseByIdQuery } from "../features/user/purchase-slice";

export const PurchaseView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 
  const { data } = useGetPurchaseByIdQuery(id);

  const purchase = data?.data || {};
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        title={`Purchase No. ${purchase.purchaseNo}`}
        showSearch={false}
        showAddButton={false}
      />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <button
            variant="ghost"
            onClick={() => navigate("/purchases")}
            className="mb-4 text-blue-600 flex items-center hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Purchases
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-8 bg-white hover:shadow-lg transition-shadow shadow-md border-b border-gray-200">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">
                      Purchase No. {purchase.purchaseNo}
                    </h1>
                    <div className="text-gray-600">
                      Date:{" "}
                      {new Date(purchase.createdAt).toLocaleDateString("en-GB")}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      variant="outline"
                      size="sm"
                      className="flex items-center border border-gray-200 px-3 py-2 rounded-md"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </button>
                    <button
                      variant="outline"
                      size="sm"
                      className="flex items-center border border-gray-200 px-3 py-2 rounded-md"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>

                {/* Supplier Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Supplier
                      </div>
                      <div className="text-lg font-medium">
                        {purchase.vendor?.name || "Unknown Supplier"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items Table */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Items</h3>
                  <div className="overflow-hidden border rounded-lg border-gray-200">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                            Item
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                            Quantity
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                            Item Type
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {purchase.items?.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3">{item.name}</td>
                            <td className="px-4 py-3">{item.quantity}</td>
                            <td className="px-4 py-3">{item.category}</td>
                            <td className="px-4 py-3">R{item.unitCost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Purchase Summary */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="max-w-sm ml-auto">
                    <h3 className="text-lg font-semibold mb-4">
                      Purchase Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>R{purchase.purchaseTotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>VAT</span>
                        <span>{purchase.vat || "0"}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-gray-200 border-t pt-2">
                        <span>Total</span>
                        <span>R{purchase.purchaseTotal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Receipt Image Section */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-white hover:shadow-lg transition-shadow shadow-md border-b border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Receipt</h3>
                {purchase.receipt ? (
                  <div className="space-y-4">
                    <img
                      src={purchase.receipt}
                      alt="Purchase receipt"
                      className="w-full h-auto rounded-lg border border-gray-200 shadow-sm mb-4"
                    />
                    <div className="flex gap-2 w-full">
                      <button
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-center border border-gray-200 px-3 py-2 rounded-md w-full"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </button>
                      <button
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-center border border-gray-200 px-3 py-2 rounded-md w-full"
                      >
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-sm">No receipt image available</div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
