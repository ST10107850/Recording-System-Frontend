  import { useEffect, useState } from "react";
  import { useParams } from "react-router";
  import { useToast } from "../use-toast";
  import {
    useGetPurchaseByIdQuery,
    useUpdatePurchaseMutation,
  } from "../../features/user/purchase-slice";
  import { useGetInventoryQuery } from "../../features/user/inventory-slice";
  import { skipToken } from "@reduxjs/toolkit/query";
  import { useForm, useFieldArray } from "react-hook-form";

  export const usePurchaseForm = () => {
    const { id } = useParams();
    const isEditing = Boolean(id);
    const { toast } = useToast();

    const { data: getPurchaseRes } = useGetPurchaseByIdQuery(id ?? skipToken);
    const purchase = getPurchaseRes?.data;

    const { data: inventoryRes, isLoading: inventoryLoading } =
      useGetInventoryQuery();
    const inventoryItems = inventoryRes?.data || [];

    const {
      register,
      control,
      reset,
      setValue,
      watch,
      handleSubmit,
      formState: { isDirty },
    } = useForm({
      mode: "onChange",
      defaultValues: {
        vendor: { _id: "", name: "", email: "" },
        receipt: null,
        items: [],
      },
    });

    const { fields, append, remove, update } = useFieldArray({
      control,
      name: "items",
    });

    const [receiptPreview, setReceiptPreview] = useState(null);
    const [showSupplierList, setShowSupplierList] = useState(false);

    // Redux mutation
    const [updatePurchase, { isLoading: updating }] = useUpdatePurchaseMutation();

    useEffect(() => {
      if (purchase) {
        reset({
          vendor: {
            _id: purchase.vendor?._id || "",
            name: purchase.vendor?.name || "",
            email: purchase.vendor?.email || "",
          },
          receipt: purchase.receipt || null,
          items: purchase.items.map((it) => ({
            inventoryId: it.inventoryId || "",
            quantity: it.quantity,
            unitCost: it.unitCost,
          })),
        });
        setReceiptPreview(purchase.receipt || null);
      }
    }, [purchase, reset]);

    const handleSupplierSelect = (supplier) => {
      setValue("vendor._id", supplier._id, { shouldDirty: true });
      setValue("vendor.name", supplier.name, { shouldDirty: true });
      setValue("vendor.email", supplier.email, { shouldDirty: true });
      setShowSupplierList(false);
    };

    const addPurchaseItem = () => {
      append({ inventoryId: "", quantity: 0, unitCost: 0 });
    };

    const updatePurchaseItem = (index, key, value) => {
      const newRow = { ...fields[index], [key]: value };
      if (key === "inventoryId") {
        const found = inventoryItems.find((inv) => inv._id === value);
        if (found) {
          newRow.unitCost = found.unitCost || 0;
        }
      }
      update(index, newRow);
    };

    const subtotal = watch("items").reduce(
      (sum, it) => sum + (it.quantity * it.unitCost || 0),
      0
    );
    const vat = (subtotal * 0.15).toFixed(2);
    const total = subtotal + parseFloat(vat);

    const onSubmit = async (data) => {
      try {
        const payload = {
          ...data,
          vendor: data.vendor._id,
        };
        console.log("➡️ Payload sent for update:", payload);
        if (isEditing) {
          await updatePurchase({ id, body: payload }).unwrap();
          toast({
            title: "Updated",
            description: "Purchase updated successfully.",
          });
        } else {
          toast({ title: "Saved", description: "Purchase created." });
        }
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Error",
          description: err?.data?.message || "Failed to save purchase.",
        });
      }
    };

    const selectedInventoryIds = watch("items").map((it) => it.inventoryId);

    return {
      isEditing,
      register,
      control,
      fields,
      append,
      remove,
      update,
      updatePurchaseItem,
      addPurchaseItem,
      receiptPreview,
      setReceiptPreview,
      setValue,
      watch,
      handleSubmit,
      onSubmit,
      inventoryItems,
      inventoryLoading,
      isDirty,
      updating, 
      showSupplierList,
      setShowSupplierList,
      handleSupplierSelect,
      subtotal,
      vat,
      total,
      selectedInventoryIds,
    };
  };
