import { useState } from "react";
import { useGetResellersQuery } from "../../features/user/reseller-slice";
import { useGetProductsQuery } from "../../features/user/product-slice";
import { useCreateSaleMutation } from "../../features/user/sale-slice";

export const useAddSaleForm = (onSuccess) => {
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    products: [],
    invoiceNo: "",
  });

  const { data: resellersData = { data: [] } } = useGetResellersQuery();
  const customers = resellersData.data;

  const { data: productsData = { data: [] } } = useGetProductsQuery();
  const products = productsData.data;

  
  const [createSale, { isLoading }] = useCreateSaleMutation();

  const handleCustomerChange = (e) => {
    const customerId = e.target.value;
    const customer = customers.find((c) => c._id === customerId);
    setFormData((prev) => ({
      ...prev,
      customerId,
      customerName: customer?.name || "",
    }));
  };

  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        { productId: "", productName: "", quantity: 1, productTotal: 0 },
      ],
    }));
  };

  const removeProduct = (index) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const updateProduct = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.map((product, i) => {
        if (i !== index) return product;

        if (field === "productId") {
          const selectedProduct = products.find((p) => p._id === value);
          return {
            ...product,
            productId: value,
            productName: selectedProduct?.name || "",
            productTotal: (selectedProduct?.price || 0) * product.quantity,
          };
        }

        if (field === "quantity") {
          const selectedProduct = products.find(
            (p) => p._id === product.productId
          );
          return {
            ...product,
            quantity: value,
            productTotal: (selectedProduct?.price || 0) * value,
          };
        }

        return { ...product, [field]: value };
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerId || formData.products.length === 0) return;

    const total = formData.products.reduce((sum, p) => sum + p.productTotal, 0);

    const payload = {
      customer: formData.customerId,
      products: formData.products.map((p) => ({
        product: p.productId,
        quantity: p.quantity,
        productTotal: p.productTotal,
      })),
      total,
    };

    try {
      await createSale(payload).unwrap();
      setFormData({
        customerId: "",
        customerName: "",
        products: [],
      });
      onSuccess?.();
    } catch (err) {
      console.error("Sale creation failed:", err);
    }
  };

  return {
    formData,
    customers,
    products,
    isLoading,
    handleSubmit,
    handleCustomerChange,
    addProduct,
    removeProduct,
    updateProduct,
  };
};
