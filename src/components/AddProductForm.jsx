import { useAddProductForm } from "../hooks/product/use-createProduct";
import IngredientsSection from "./IngredientsSection";

const AddProductForm = ({ isOpen, onClose, }) => {
  const {
    formData,
    inventoryItems,
    invLoading,
    saving,
    handleInputChange,
    addIngredient,
    removeIngredient,
    updateIngredient,
    handleSubmit,
  } = useAddProductForm(onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              placeholder="Enter product description"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">
              Price (R)
            </label>
            <input
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
            invLoading={invLoading}
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
              {saving ? "Saving…" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
