import { useState } from "react";
import { useGetInventoryQuery } from "../../features/user/inventory-slice";
import { useCreateProductMutation } from "../../features/user/product-slice";

export const useAddProductForm = (onSuccess) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    ingredients: [],
  });

  const { data: inventoryData, isLoading: invLoading } = useGetInventoryQuery();
  const inventoryItems = inventoryData?.data ?? [];
  


  const [createProduct, { isLoading: saving }] = useCreateProductMutation();


  const handleInputChange = (field, value) =>
    setFormData((p) => ({ ...p, [field]: value }));

  const addIngredient = () =>
    setFormData((p) => ({
      ...p,
      ingredients: [
        ...p.ingredients,
        { inventoryItemId: "", inventoryItemName: "", quantity: 0 },
      ],
    }));

  const removeIngredient = (idx) =>
    setFormData((p) => ({
      ...p,
      ingredients: p.ingredients.filter((_, i) => i !== idx),
    }));

  const updateIngredient = (idx, field, value) =>
    setFormData((p) => ({
      ...p,
      ingredients: p.ingredients.map((ing, i) => {
        if (i !== idx) return ing;
        if (field === "inventoryItemId") {
          const item = inventoryItems.find((it) => it._id === value);
          return {
            ...ing,
            inventoryItemId: value,
            inventoryItemName: item?.name || "",
          };
        }
        return { ...ing, [field]: value };
      }),
    }));


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || formData.price <= 0) return;

    const payload = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      ingredients: formData.ingredients.map((ing) => ({
        inventoryItems: ing.inventoryItemId,
        quantity: ing.quantity,
      })),
    };

    try {
      await createProduct(payload).unwrap();
      setFormData({ name: "", description: "", price: 0, ingredients: [] });
      onSuccess?.(); 
    } catch (err) {
      console.error("Create product failed:", err);
      alert("Failed to save product. See console for details.");
    }
  };

  return {
    formData,
    inventoryItems,
    invLoading,
    saving,
    handleInputChange,
    addIngredient,
    removeIngredient,
    updateIngredient,
    handleSubmit,
  };
};
