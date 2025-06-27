import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {  AlertTriangle, ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import Topbar from "../components/TopBar";
import { useGetInventoryByIdQuery } from "../features/user/inventory-slice";

const InventoryView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {data}= useGetInventoryByIdQuery(id);
  const mockInventoryItem = data?.data || {};
  

  const [toastVisible, setToastVisible] = useState(false);


  const isLowStock =
    mockInventoryItem.quantity <= mockInventoryItem.minStockLevel;

    const getCategoryColor = (category) => {
      switch (category) {
        case "ingredients":
          return "bg-green-100 text-green-800";
        case "ppe":
          return "bg-blue-100 text-blue-800";
        case "consumable":
          return "bg-orange-100 text-orange-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

  const getCategoryLabel = (category) => {
    switch (category) {
      case "ingredients":
        return "Ingredients";
      case "ppe":
        return "PPE";
      case "consumable":
        return "Consumable";
      default:
        return category;
    }
  };

  const handleDelete = () => {
    if (
      window.confirm("Are you sure you want to delete this inventory item?")
    ) {
      setToastVisible(true);
      setTimeout(() => navigate("/inventory"), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        title={`Inventory: ${mockInventoryItem.itemName}`}
        showSearch={false}
        showAddButton={false}
      />
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <button
              onClick={() => navigate("/inventory")}
              className="text-sm px-3 py-2 border border-gray-300 flex item-center rounded  gap-2 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Inventory
            </button>
            <h1 className="text-2xl font-bold">Inventory Item Details</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/inventory/${id}/edit`)}
              className="px-3 py-1 border flex items-center gap-2 border-gray-300 rounded hover:bg-gray-100 text-sm"
            >
              <Edit className="h-4 w-4 inline" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 border flex items-center gap-2 border-red-300 text-red-600 rounded hover:bg-red-50 text-sm"
            >
              <Trash2 className="h-4 w-4 inline" />
              Delete
            </button>
          </div>
        </div>

        {/* Low stock alert */}
        {isLowStock && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <div>
              <p className="font-medium text-amber-800">Low Stock Alert</p>
              <p className="text-sm text-amber-700">
                Current quantity ({mockInventoryItem.quantity}) is at or below
                minimum stock level ({mockInventoryItem.minStockLevel}).
              </p>
            </div>
          </div>
        )}

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white">
              <CardHeader>
                <CardTitle>Item Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Item Name
                    </p>
                    <p className="text-lg font-semibold">
                      {mockInventoryItem.itemName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Category
                    </p>
                    <Badge
                      className={getCategoryColor(mockInventoryItem.category)}
                    >
                      {getCategoryLabel(mockInventoryItem.category)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Current Quantity
                    </p>
                    <p
                      className={`text-lg font-semibold ${
                        isLowStock ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {mockInventoryItem.quantity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Minimum Stock Level
                    </p>
                    <p className="text-lg">{mockInventoryItem.minStockLevel}</p>
                  </div>
                  
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white">
              <CardHeader>
                <CardTitle>Stock Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className={`flex justify-between items-center p-3 rounded`}
                  >
                    <span className="font-medium text-gray-800">
                      Stock Level:
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        isLowStock
                          ? "bg-red-400 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {isLowStock ? "Low Stock" : "In Stock"}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        isLowStock ? "bg-red-500" : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          (mockInventoryItem.quantity /
                            (mockInventoryItem.minStockLevel * 2)) *
                            100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    {mockInventoryItem.quantity} of{" "}
                    {mockInventoryItem.minStockLevel * 2} recommended stock
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white">
              <CardHeader>
                <CardTitle>Record Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Created By
                  </p>
                  <p className="text-sm">{mockInventoryItem.createdBy?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Created At
                  </p>
                  <p className="text-sm">
                    {new Date(mockInventoryItem.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Last Updated
                  </p>
                  <p className="text-sm">
                    {new Date(mockInventoryItem.updatedAt).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button
                  variant="outline"
                  className="px-3 w-full py-2 font-semibold border flex items-center gap-2 border-gray-300 rounded hover:bg-gray-100 text-sm"
                  onClick={() => navigate(`/inventory/${id}/edit`)}
                >
                  Update Stock Quantity
                </button>
                <button
                  variant="outline"
                  className="px-3 py-2 font-semibold w-full border flex items-center gap-2 border-gray-300 rounded hover:bg-gray-100 text-sm"
                  onClick={() => navigate(`/inventory/${id}/edit`)}
                >
                  Adjust Minimum Level
                </button>
                <button
                  variant="outline"
                  className="px-3 py-2 font-semibold w-full border flex items-center gap-2 border-gray-300 rounded hover:bg-gray-100 text-sm"
                  onClick={() => navigate(`/inventory/${id}/edit`)}
                >
                  Update Unit Cost
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryView;
