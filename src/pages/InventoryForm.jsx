import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../components/TopBar";

const InventoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    itemName: "",
    category: "ingredients",
    quantity: 0,
    minStockLevel: 0,
    unitCost: 0,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.itemName || formData.quantity < 0 || formData.unitCost < 0) {
      alert("Please fill in all required fields with valid values.");
      return;
    }

    alert(`Inventory item ${isEditing ? "updated" : "created"} successfully!`);
    navigate("/inventory");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Topbar title={isEditing ? "Edit Inventory" : "Create New Inventory"} />
      <div className="container mx-auto p-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/inventory")}
            className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-100 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Inventory
          </button>
          <h1 className="text-2xl font-bold">
            {isEditing ? "Edit Inventory Item" : "Add New Inventory Item"}
          </h1>
        </div>

        <div className="border rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow bg-white border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Item Details</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="itemName"
                className="block text-sm font-medium mb-1"
              >
                Item Name *
              </label>
              <input
                id="itemName"
                type="text"
                className="w-full px-3 py-2 border rounded border-gray-200"
                value={formData.itemName}
                onChange={(e) => handleInputChange("itemName", e.target.value)}
                placeholder="Enter item name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-1"
              >
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full border-gray-200 px-3 py-2 border rounded"
                required
              >
                <option value="ingredients">Ingredients</option>
                <option value="ppe">PPE (Personal Protective Equipment)</option>
                <option value="consumable">Consumable</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium mb-1"
                >
                  Current Quantity *
                </label>
                <input
                  id="quantity"
                  type="number"
                  className="w-full px-3 py-2 border rounded border-gray-200"
                  value={formData.quantity}
                  onChange={(e) =>
                    handleInputChange("quantity", Number(e.target.value))
                  }
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="minStockLevel"
                  className="block text-sm font-medium mb-1"
                >
                  Minimum Stock Level *
                </label>
                <input
                  id="minStockLevel"
                  type="number"
                  className="w-full px-3 py-2 border rounded border-gray-200"
                  value={formData.minStockLevel}
                  onChange={(e) =>
                    handleInputChange("minStockLevel", Number(e.target.value))
                  }
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="unitCost"
                className="block text-sm font-medium mb-1"
              >
                Unit Cost (R) *
              </label>
              <input
                id="unitCost"
                type="number"
                step="0.01"
                className="w-full px-3 py-2 border rounded border-gray-200"
                value={formData.unitCost}
                onChange={(e) =>
                  handleInputChange("unitCost", Number(e.target.value))
                }
                placeholder="0.00"
                min="0"
                required
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/inventory")}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {isEditing ? "Update Item" : "Add Item"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InventoryForm;
