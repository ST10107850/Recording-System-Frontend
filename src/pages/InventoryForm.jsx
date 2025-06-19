import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../components/TopBar";
import {
  useGetInventoryByIdQuery,
  useUpdateInventoryMutation,
} from "../features/user/inventory-slice";
import { useForm } from "react-hook-form";
import { skipToken } from "@reduxjs/toolkit/query";
import { useToast } from "../hooks/use-toast";

const InventoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { data: getInventory } = useGetInventoryByIdQuery(id ?? skipToken);
  const [updateInventory] = useUpdateInventoryMutation();

  const newInventory = getInventory?.data;

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      itemName: "",
      category: "",
      quantity: 0,
      minStockLevel: 0,
    },
  });

  useEffect(() => {
    if (newInventory) {
      reset({
        itemName: newInventory.itemName,
        category: newInventory.category,
        quantity: newInventory.quantity,
        minStockLevel: newInventory.minStockLevel,
      });
    }
  }, [newInventory, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await updateInventory({ id, ...data }).unwrap();
      }

      toast({
        title: "Inventory updated!",
        description:
          "Changes have been saved to the Dough Better Records System.",
      });
      navigate("/inventory");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update inventory.");
    }
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                {...register("itemName", { required: true })}
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
                {...register("category", { required: true })}
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
                  {...register("quantity", { required: true, min: 0 })}
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
                  {...register("minStockLevel", { required: true, min: 0 })}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default InventoryForm;
