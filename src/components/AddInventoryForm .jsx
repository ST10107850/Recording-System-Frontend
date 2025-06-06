import { useState } from "react";

const AddInventoryForm = ({ isOpen, onClose, onAddItem }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "ingredients",
    quantity: 0,
    minStockLevel: 0,
    unitCost: 0,
    createdBy: "John Doe",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.itemName && formData.quantity >= 0 && formData.unitCost >= 0) {
      onAddItem(formData);
      setFormData({
        itemName: "",
        category: "ingredients",
        quantity: 0,
        minStockLevel: 0,
        unitCost: 0,
        createdBy: "John Doe",
      });
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Inventory Item
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-lg font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="itemName"
              className="block font-medium text-sm text-gray-700 mb-1"
            >
              Item Name
            </label>
            <input
              id="itemName"
              value={formData.itemName}
              onChange={(e) => handleInputChange("itemName", e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter item name"
            />
          </div>

          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ingredients">Ingredients</option>
              <option value="ppe">PPE (Personal Protective Equipment)</option>
              <option value="consumable">Consumable</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="quantity"
                className="block font-medium text-sm text-gray-700 mb-1"
              >
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  handleInputChange("quantity", Number(e.target.value))
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>

            <div>
              <label
                htmlFor="minStockLevel"
                className="block font-medium text-sm text-gray-700 mb-1"
              >
                Min Stock Level
              </label>
              <input
                id="minStockLevel"
                type="number"
                value={formData.minStockLevel}
                onChange={(e) =>
                  handleInputChange("minStockLevel", Number(e.target.value))
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="unitCost"
              className="block font-medium text-sm text-gray-700 mb-1"
            >
              Unit Cost (R)
            </label>
            <input
              id="unitCost"
              type="number"
              step="0.01"
              value={formData.unitCost}
              onChange={(e) =>
                handleInputChange("unitCost", Number(e.target.value))
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInventoryForm;
