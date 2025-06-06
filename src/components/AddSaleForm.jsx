import React, { useState } from "react";

export const AddSaleForm = ({ isOpen, onClose, onAddSale }) => {
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    products: [],
    total: 0,
    recordedBy: "John Doe",
    invoiceNo: "",
  });

  const customers = [
    { id: "1", name: "Ngwabeni Methodist Church" },
    { id: "2", name: "Local Bakery" },
    { id: "3", name: "Community Center" },
  ];

  const products = [
    { id: "1", name: "Scones", price: 40 },
    { id: "2", name: "Chocolate Chip Cookies", price: 25.99 },
    { id: "3", name: "Vanilla Cupcakes", price: 35.5 },
  ];

  const generateInvoiceNo = () => {
    const number = Math.floor(Math.random() * 90000) + 10000;
    return `SI${number}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.customerId && formData.products.length > 0) {
      const invoiceNo = formData.invoiceNo || generateInvoiceNo();
      const total = formData.products.reduce(
        (sum, product) => sum + product.productTotal,
        0
      );

      onAddSale({
        ...formData,
        invoiceNo,
        total,
      });

      setFormData({
        customerId: "",
        customerName: "",
        products: [],
        total: 0,
        recordedBy: "John Doe",
        invoiceNo: "",
      });

      onClose();
    }
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
        if (i === index) {
          if (field === "productId") {
            const selectedProduct = products.find((p) => p.id === value);
            const quantity = product.quantity || 1;
            return {
              ...product,
              productId: value,
              productName: selectedProduct?.name || "",
              productTotal: (selectedProduct?.price || 0) * quantity,
            };
          }
          if (field === "quantity") {
            const selectedProduct = products.find(
              (p) => p.id === product.productId
            );
            return {
              ...product,
              quantity: value,
              productTotal: (selectedProduct?.price || 0) * value,
            };
          }
          return { ...product, [field]: value };
        }
        return product;
      }),
    }));
  };

  const handleCustomerChange = (e) => {
    const customerId = e.target.value;
    const customer = customers.find((c) => c.id === customerId);
    setFormData((prev) => ({
      ...prev,
      customerId,
      customerName: customer?.name || "",
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Add New Sale</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer + Invoice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="customer"
                className="block text-sm font-medium mb-1"
              >
                Customer
              </label>
              <select
                id="customer"
                value={formData.customerId}
                onChange={handleCustomerChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="invoiceNo"
                className="block text-sm font-medium mb-1"
              >
                Invoice Number
              </label>
              <input
                id="invoiceNo"
                value={formData.invoiceNo}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    invoiceNo: e.target.value,
                  }))
                }
                placeholder="Auto-generated if empty"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Products Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Products</label>
              <button
                type="button"
                onClick={addProduct}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                + Add Product
              </button>
            </div>

            {formData.products.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-3 items-end mb-4 pb-4"
              >
                <div className="col-span-5">
                  <label className="block text-sm mb-1">Product</label>
                  <select
                    value={product.productId}
                    onChange={(e) =>
                      updateProduct(index, "productId", e.target.value)
                    }
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Select product</option>
                    {products.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name} - R{prod.price}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-3">
                  <label className="block text-sm mb-1">Quantity</label>
                  <input
                    type="number"
                    value={product.quantity || ""}
                    onChange={(e) =>
                      updateProduct(index, "quantity", Number(e.target.value))
                    }
                    placeholder="1"
                    min="1"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-sm mb-1">Total</label>
                  <input
                    type="number"
                    value={product.productTotal.toFixed(2)}
                    readOnly
                    className="w-full border border-gray-200 rounded-md px-3 py-2 bg-gray-100"
                  />
                </div>
                <div className="col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="text-red-600 hover:text-red-800 text-xl"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-900 text-white"
            >
              Add Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
