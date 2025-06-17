import { useState } from "react";
import { useCreateInventoryMutation } from "../../features/user/inventory-slice";

export const useAddInventoryForm = (onSuccess) => {

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    quantity: 0,
    minStockLevel: 0,
    unit: "",
  });


  const [createInventory, { isLoading: saving }] = useCreateInventoryMutation();


  const handleInputChange = (field, value) =>
    setFormData((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { itemName, category, unit } = formData;
    if (!itemName || !category || !unit) return;

    try {
      await createInventory(formData).unwrap();
      setFormData({
        itemName: "",
        category: "",
        quantity: 0,
        minStockLevel: 0,
        unit: "",
      });
      onSuccess?.();
    } catch (err) {
      console.error("Create inventory failed:", err);
      alert(err?.data?.message || "Failed to save inventory item");
    }
  };

  return {
    formData,
    saving,
    handleInputChange,
    handleSubmit,
  };
};
