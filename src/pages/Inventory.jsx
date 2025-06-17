import React, { useState } from "react";
import { Link } from "react-router-dom";
import Topbar from "../components/TopBar";
import { AlertTriangle, Edit, Eye, Trash2 } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { AddItemForm } from "../components/AddItemForm";
import { useInventory } from "../hooks/inventory/use-inventory";
import { useCreateInventoryMutation } from "../features/user/inventory-slice";
import { useToast } from "../hooks/use-toast";

const Inventory = () => {
  const { data = {} } = useInventory();
  const [createInventory] = useCreateInventoryMutation();
  const inventory = data.data || [];
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const filteredInventory = inventory.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteInventoryItem = (id) => {
    if (
      window.confirm("Are you sure you want to delete this inventory item?")
    ) {
      // Implement delete logic here (e.g., API call)
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      await createInventory(newItem).unwrap();
      toast({
        title: "Inventory successfully!",
        description:
          "Inventory item added successfully to Dough Better Records System",
      });
      setIsAddFormOpen(false);
    } catch (err) {

      const errorDetails = err?.data?.error;
      if (Array.isArray(errorDetails)) {
        errorDetails.forEach((e) => {
          alert(e?.msg || "Validation error");
        });
      } else {
        alert(err?.data?.message || "Failed to add inventory item.");
      }
    }
  };

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

  const isLowStock = (quantity, minStockLevel) => quantity <= minStockLevel;

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        title="Inventory"
        showSearch={true}
        showAddButton={true}
        addButtonText="Add Inventory"
        onAddClick={() => setIsAddFormOpen(true)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredInventory.map((item) => (
          <Card
            key={item._id}
            className="p-6 hover:shadow-lg transition-shadow bg-white border-gray-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.itemName}
                  </h3>
                  {isLowStock(item.quantity, item.minStockLevel) && (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <Badge className={getCategoryColor(item.category)}>
                  {item.category}
                </Badge>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Current Stock:</span>
                <span
                  className={`font-medium ${
                    isLowStock(item.quantity, item.minStockLevel)
                      ? "text-red-600"
                      : "text-gray-900"
                  }`}
                >
                  {item.quantity} {item.unit}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Min Level:</span>
                <span className="text-gray-900">
                  {item.minStockLevel} {item.unit || "unit"}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                Added: {new Date(item.createdAt).toLocaleDateString("en-GB")}
              </span>
              <div className="flex space-x-6">
                <Link
                  to={`/inventory/${item._id}`}
                  className="text-gray-600 hover:bg-gray-100 p-2"
                >
                  <Eye className="h-5 w-5" />
                </Link>
                <Link
                  to={`/inventory/${item._id}/edit`}
                  className="text-gray-600 hover:bg-gray-100 p-2"
                >
                  <Edit className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => handleDeleteInventoryItem(item._id)}
                  className="text-red-600 hover:bg-gray-100 p-2"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AddItemForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onAddItem={handleAddItem}
      />
    </div>
  );
};

export default Inventory;
