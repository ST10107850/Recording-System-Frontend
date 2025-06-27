import { useNavigate } from "react-router-dom";
import Topbar from "../components/TopBar";
import { Card } from "../components/ui/card";
import { ArrowLeft } from "lucide-react";
import IngredientsSection from "../components/IngredientsSection";
import { useProductForm } from "../hooks/product/use-editProduct";

const ProductForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    onSubmit,
    isDirty,
    isEditing,
    fields,
    inventoryItems,
    invLoading,
    addIngredient,
    updateIngredient,
    removeIngredient,
  } = useProductForm();

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

          <Card className="p-6 shadow-lg border border-gray-300 bg-white">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Name</label>
                  <input
                    {...register("name", { required: true })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2"
                    placeholder="Enter name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (R)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    {...register("price", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  rows={3}
                  {...register("description", { required: true })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2"
                  placeholder="Enter product description"
                />
              </div>

              <IngredientsSection
                ingredients={fields}
                inventoryItems={inventoryItems}
                invLoading={invLoading}
                onAddIngredient={addIngredient}
                onUpdateIngredient={updateIngredient}
                onRemoveIngredient={removeIngredient}
              />

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate("/products")}
                  className="px-4 py-2 border text-gray-700 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!isDirty}
                  className={`px-4 py-2 rounded text-white ${
                    isDirty
                      ? "bg-gray-800 hover:bg-gray-900"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {isEditing ? "Update Item" : "Add Item"}
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
