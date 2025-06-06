import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../components/TopBar";
import { Card } from "../components/ui/card";
import { ArrowLeft } from "lucide-react";
import IngredientsSection from "../components/IngredientsSection";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

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

  useEffect(() => {
    if (isEditing && id) {
      const mockProduct = {
        name: "Chocolate Chip Cookies",
        description: "Delicious homemade chocolate chip cookies",
        price: 25.99,
        ingredients: [
          { inventoryItemId: "1", inventoryItemName: "Flour", quantity: 2 },
          { inventoryItemId: "2", inventoryItemName: "Sugar", quantity: 1 },
          {
            inventoryItemId: "3",
            inventoryItemName: "Chocolate Chips",
            quantity: 0.5,
          },
        ],
      };
      setFormData(mockProduct);
    }
  }, [isEditing, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      console.log("Product updated:", formData);
    } else {
      console.log("Product created:", formData);
    }
    navigate("/products");
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title={isEditing ? "Edit Product" : "Create New Product"} />
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => navigate("/products")}
              className="flex items-center text-sm text-gray-700 hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </button>
          </div>

          <Card className="p-6 hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter product name"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
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
                      setFormData((prev) => ({
                        ...prev,
                        price: Number(e.target.value),
                      }))
                    }
                    placeholder="0.00"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Enter product description"
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <IngredientsSection
                ingredients={formData.ingredients}
                inventoryItems={inventoryItems}
                onAddIngredient={addIngredient}
                onUpdateIngredient={updateIngredient}
                onRemoveIngredient={removeIngredient}
              />

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate("/products")}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0f172a] text-white rounded hover:bg-blue-700"
                >
                  {isEditing ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
