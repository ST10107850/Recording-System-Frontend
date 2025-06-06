import React, { useState } from "react";
import { useNavigate } from "react-router";
import Topbar from "../components/TopBar";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Eye } from "lucide-react";


export const PurchaseList = () => {
  const navigate = useNavigate();
  const [purchases] = useState([
    {
      id: "P2023120076",
      date: "12/10/2023",
      supplier: "Shoprite Flagstaff",
      items: 3,
      total: 400,
      status: "Completed",
    },
    {
      id: "P2023120075",
      date: "11/10/2023",
      supplier: "Pick n Pay",
      items: 2,
      total: 250,
      status: "Pending",
    },
    {
      id: "P2023120074",
      date: "10/10/2023",
      supplier: "Spar",
      items: 5,
      total: 680,
      status: "Completed",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewPurchase = (purchaseId) => {
    navigate(`/purchases/${purchaseId}`);
  };

  const handleNewPurchase = () => {
    navigate("/purchases/create");
  };
  return (
    <div className="h-screen bg-gray-50">
      <Topbar
        title="Purchases"
        showSearch={true}
        showAddButton={true}
        addButtonText="New Purchase"
        onAddClick={handleNewPurchase}
      />
      <div className="p-6">
        <Card className="overflow-hidden hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white">
          <table className="min-w-full text-sm text-left border border-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                  Purchase No.
                </th>
                <th className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                  Date
                </th>
                <th className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                  Supplier
                </th>
                <th className="p-4  font-semibold text-gray-900 border-b border-gray-200">
                  Items
                </th>
                <th className="p-4  font-semibold text-gray-900 border-b border-gray-200">
                  Total
                </th>
                <th className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                  Status
                </th>
                <th className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-gray-50">
                  <td className="px-4 py-5 font-medium border-b border-gray-200">
                    {purchase.id}
                  </td>
                  <td className="px-4 py-5 border-b border-gray-200">
                    {purchase.date}
                  </td>
                  <td className="p-4 py-5 border-b border-gray-200">
                    {purchase.supplier}
                  </td>
                  <td className="p-4 py-5 border-b border-gray-200">
                    {purchase.items}
                  </td>
                  <td className="p-4 py-5 border-b border-gray-200">
                    R{purchase.total}
                  </td>
                  <td className="p-4 py-5 border-b border-gray-200">
                    <Badge className={getStatusColor(purchase.status)}>
                      {purchase.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-5 border-b border-gray-200">
                    <button
                      onClick={() => handleViewPurchase(purchase.id)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};
