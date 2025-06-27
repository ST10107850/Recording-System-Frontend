import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useToast } from "../use-toast";
import { useGetInventoryQuery } from "../../features/user/inventory-slice";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../features/user/product-slice";
import { skipToken } from "@reduxjs/toolkit/query";


export const useProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const { toast } = useToast();
  const [updateProduct] = useUpdateProductMutation();

  const { data: getProductRes } = useGetProductByIdQuery(id ?? skipToken);
  const newProduct = getProductRes?.data;

  const { data: inventoryRes, isLoading: invLoading } = useGetInventoryQuery();
  const inventoryItems = inventoryRes?.data || [];

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      ingredients: [{ inventoryItemId: "", quantity: 0 }],
    },
  });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  useEffect(() => {
    if (newProduct) {
      reset({
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        ingredients: newProduct.ingredients.map((i) => ({
          inventoryItemId: i.inventoryItems?._id || "",
          quantity: i.quantity,
        })),
      });
    }
  }, [newProduct, reset]);

  const addIngredient = () => {
    append({ inventoryItemId: "", quantity: 0 });
  };

  const updateIngredient = (index, field, value) => {
    if (field === "inventoryItemId") {
      const duplicate = fields.some(
        (ing, i) => i !== index && ing.inventoryItemId === value
      );
      if (duplicate) {
        toast({
          title: "Ingredient already selected",
          description: "This inventory item is already on the list.",
          variant: "destructive",
        });
        return;
      }
    }

    update(index, {
      ...fields[index],
      [field]: value,
    });
  };

  const removeIngredient = (index) => {
    remove(index);
  };

  const onSubmit = async (formData) => {
    const ids = formData.ingredients.map((i) => i.inventoryItemId);
    const hasDupes = new Set(ids).size !== ids.length;

    if (hasDupes) {
      toast({
        title: "Duplicate ingredients",
        description: "Please remove duplicate inventory items before saving.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      ...formData,
      ingredients: formData.ingredients.map((i) => ({
        inventoryItems: i.inventoryItemId,
        quantity: i.quantity,
      })),
    };

    try {
      if (isEditing) {
        await updateProduct({ id, ...payload }).unwrap();
      }

      toast({
        title: "Product updated!",
        description:
          "Changes have been saved to the Dough Better Records System.",
      });

      navigate("/products");
    } catch (err) {
      toast({
        title: "Error",
        description: err?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return {
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
  };
};
