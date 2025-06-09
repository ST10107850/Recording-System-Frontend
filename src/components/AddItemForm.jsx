import React, { useState } from "react";

export const AddItemForm = ({ isOpen, onClose, onAddItem }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    quantity: 0,
    minStockLevel: 0,
    unitCost: 0,
    unit: "",
  });

  const categories = ["consumable", "ppe", "ingredients"];
  const units = ["kg", "liters", "pieces", "grams", "ml", "boxes", "packs"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.itemName && formData.category && formData.unit) {
      onAddItem(formData);
      setFormData({
        itemName: "",
        category: "",
        quantity: 0,
        unitCost: 0,
        minStockLevel: 0,
        unit: "",
      });
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-lg font-semibold mb-4">Add New Inventory Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Item Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Item Name
            </label>
            <input
              id="itemName"
              value={formData.itemName}
              onChange={(e) => handleInputChange("itemName", e.target.value)}
              placeholder="Enter item name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Initial Quantity
            </label>
            <input
              id="quantity"
              type="number"
              value={formData.quantity || ""}
              onChange={(e) =>
                handleInputChange("quantity", Number(e.target.value))
              }
              placeholder="0"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Minimum Stock Level */}
          <div className="space-y-2">
            <label
              htmlFor="minStockLevel"
              className="block text-sm font-medium text-gray-700"
            >
              Minimum Stock Level
            </label>
            <input
              id="minStockLevel"
              type="number"
              value={formData.minStockLevel || ""}
              onChange={(e) =>
                handleInputChange("minStockLevel", Number(e.target.value))
              }
              placeholder="0"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="unitCost"
              className="block text-sm font-medium text-gray-700"
            >
              Unit Cost
            </label>
            <input
              id="unitCost"
              type="number"
              value={formData.unitCost || ""}
              onChange={(e) =>
                handleInputChange("unitCost", Number(e.target.value))
              }
              placeholder="0"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Unit */}
          <div className="space-y-2">
            <label
              htmlFor="unit"
              className="block text-sm font-medium text-gray-700"
            >
              Unit
            </label>
            <select
              value={formData.unit}
              onChange={(e) => handleInputChange("unit", e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Select unit</option>
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-400 text-white rounded-md text-sm hover:bg-blue-700"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
