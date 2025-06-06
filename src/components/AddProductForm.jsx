import { useState } from "react";
import IngredientsSection from "./IngredientsSection";

const AddProductForm = ({ isOpen, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    ingredients: [],
  });

  const inventoryItems = [
    { id: "1", name: "Flour" },
    { id: "2", name: "Sugar" },
    { id: "3", name: "Chocolate Chips" },
    { id: "4", name: "Butter" },
    { id: "5", name: "Vanilla Extract" },
    { id: "6", name: "Eggs" },
    { id: "7", name: "Milk" },
    { id: "8", name: "Baking Powder" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.price > 0) {
      onAddProduct(formData);
      setFormData({
        name: "",
        description: "",
        price: 0,
        ingredients: [],
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

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { inventoryItemId: "", inventoryItemName: "", quantity: 0 },
      ],
    }));
  };

  const removeIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const updateIngredient = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ingredient, i) => {
        if (i === index) {
          if (field === "inventoryItemId") {
            const selectedItem = inventoryItems.find(
              (item) => item.id === value
            );
            return {
              ...ingredient,
              inventoryItemId: value,
              inventoryItemName: selectedItem?.name || "",
            };
          }
          return { ...ingredient, [field]: value };
        }
        return ingredient;
      }),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block font-medium text-sm text-gray-700 mb-1"
            >
              Product Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block font-medium text-sm text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              placeholder="Enter product description"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block font-medium text-sm text-gray-700 mb-1"
            >
              Price (R)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price || ""}
              onChange={(e) =>
                handleInputChange("price", Number(e.target.value))
              }
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <IngredientsSection
            ingredients={formData.ingredients}
            inventoryItems={inventoryItems}
            onAddIngredient={addIngredient}
            onUpdateIngredient={updateIngredient}
            onRemoveIngredient={removeIngredient}
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
