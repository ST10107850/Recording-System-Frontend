import { useState, useEffect } from "react";
import { useInventory } from "../inventory/use-inventory";
import { useCreatePurchaseMutation } from "../../features/user/purchase-slice";
import { useToast } from "../../hooks/use-toast";
import { useNavigate } from "react-router";

export const useCreatePurchase = () => {
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState();
  const [receiptImage, setReceiptImage] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [predefinedItems, setPredefinedItems] = useState([]);
  const [formError, setFormError] = useState(null);
   const [showSupplierList, setShowSupplierList] = useState(false);

  const { data, isLoading } = useInventory();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [createPurchase] = useCreatePurchaseMutation();

  useEffect(() => {
    if (data?.data) {
      const names = data.data
        .map((item) => item.itemName)
        .filter((name, index, self) => name && self.indexOf(name) === index);
      setPredefinedItems(names);
    }
  }, [data]);

  const addPurchaseItem = () => {
    setPurchaseItems((prev) => [
      ...prev,
      { id: Date.now(), name: "", quantity: 0, amount: 0 },
    ]);
  };

  const removePurchaseItem = (id) => {
    setPurchaseItems((items) => items.filter((item) => item.id !== id));
  };

  const updatePurchaseItem = (id, field, value) => {
    setPurchaseItems((items) =>
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSupplierSelect = (supplier) => {
    setSelectedSupplier(supplier);
    setShowSupplierList(false);
  };

  const handleReceiptUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReceiptImage(file);

    const reader = new FileReader();
    reader.onload = (event) => setReceiptPreview(event.target.result);
    reader.readAsDataURL(file);
  };

  const removeReceipt = () => {
    setReceiptImage(null);
    setReceiptPreview(null);
  };

  const handleAddNewItem = (newItem) => {
    setPredefinedItems((prev) => [...prev, newItem.name]);
  };

  const subtotal = purchaseItems.reduce(
    (acc, item) => acc + item.quantity * item.amount,
    0
  );
  const vat = +(subtotal * 0.15).toFixed(2); 
  const total = +(subtotal + vat).toFixed(2);
  
  

  const validateItems = (items) => {
    for (const item of items) {
      if (!item.name?.trim()) return "Please enter a valid item name.";
      if (!item.quantity || item.quantity <= 0)
        return "Quantity must be greater than zero.";
      if (!item.amount || item.amount <= 0)
        return "Amount must be greater than zero.";
    }
    return null;
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSavePurchase = async () => {
    setFormError(null);

    const validationError = validateItems(purchaseItems);
    if (validationError) return setFormError(validationError);

    if (!selectedSupplier?._id)
      return setFormError("Please select a supplier.");

    let receiptBase64 = null;
    if (receiptImage) {
      try {
        receiptBase64 = await toBase64(receiptImage);
      } catch {
        return setFormError("Failed to read receipt image.");
      }
    }

    const payload = {
      vendor: selectedSupplier._id,
      items: purchaseItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        unitCost: item.amount,
        category: "ingredients",
        minStockLevel: 0,
      })),
      receipt: receiptBase64,
    };

    try {
      await createPurchase(payload).unwrap();
      toast({
        title: "Purchase successfully!",
        description: "Purchase saved to Dough Better Records System",
      });
      navigate("/purchases");
    } catch (err) {
      setFormError(err?.data?.message || "Failed to save purchase.");
    }
  };

  return {
    isLoading,
    purchaseItems,
    selectedSupplier,
    receiptImage,
    receiptPreview,
    predefinedItems,
    formError,
    subtotal,   
    vat,
    total,
    addPurchaseItem,
    removePurchaseItem,
    updatePurchaseItem,
    handleSupplierSelect,
    handleReceiptUpload,
    removeReceipt,
    handleAddNewItem,
    handleSavePurchase,
    showSupplierList,
    setShowSupplierList,
  };
};

