import React, { useState } from "react";
import { Link } from "react-router-dom";
import Topbar from "../components/TopBar";
import { AlertTriangle, Edit, Eye, Trash2 } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import AddInventoryForm from "../components/AddInventoryForm ";
// import AddInventoryForm from "@/components/AddInventoryForm";

const Inventory = () => {
  //   const navigate = useNavigate();

  const [inventory, setInventory] = useState([
    {
      id: "1",
      itemName: "Flour",
      category: "ingredients",
      quantity: 50,
      minStockLevel: 10,
      unitCost: 25.5,
      createdBy: { id: "1", name: "John Doe" },
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      itemName: "Sugar",
      category: "ingredients",
      quantity: 5,
      minStockLevel: 15,
      unitCost: 18.99,
      createdBy: { id: "1", name: "John Doe" },
      createdAt: "2024-01-14",
    },
    {
      id: "3",
      itemName: "Safety Gloves",
      category: "ppe",
      quantity: 20,
      minStockLevel: 5,
      unitCost: 12.5,
      createdBy: { id: "1", name: "John Doe" },
      createdAt: "2024-01-13",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const filteredInventory = inventory.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddInventoryItem = (newItem) => {
    const item = {
      id: Date.now().toString(),
      ...newItem,
      createdBy: { id: "1", name: newItem.createdBy },
      createdAt: new Date().toISOString().split("T")[0],
    };
    setInventory((prev) => [...prev, item]);
  };

  const handleDeleteInventoryItem = (id) => {
    if (
      window.confirm("Are you sure you want to delete this inventory item?")
    ) {
      setInventory(inventory.filter((item) => item.id !== id));
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
            key={item.id}
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
                  {item.quantity} units
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Min Level:</span>
                <span className="text-gray-900">
                  {item.minStockLevel} units
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Unit Cost:</span>
                <span className="text-gray-900 font-medium">
                  R{item.unitCost.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                Added: {item.createdAt}
              </span>
              <div className="flex space-x-6">
                <Link
                  to={`/inventory/${item.id}`}
                  className="text-gray-600 hover:bg-gray-100 p-2"
                >
                  <Eye className="h-5 w-5" />
                </Link>
                <Link
                  to={`/inventory/${item.id}/edit`}
                  className="text-gray-600 hover:bg-gray-100 p-2 "
                >
                  <Edit className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => handleDeleteInventoryItem(item.id)}
                  className="text-red-600 hover:bg-gray-100 p-2"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <AddInventoryForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onAddItem={handleAddInventoryItem}
      />
    </div>
  );
};

export default Inventory;
