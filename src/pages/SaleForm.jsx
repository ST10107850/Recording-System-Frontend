import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import Topbar from "../components/TopBar";
import { useGetProductsQuery } from "../features/user/product-slice";
import { useGetResellersQuery } from "../features/user/reseller-slice";
import { useGetSaleByIdQuery } from "../features/user/sale-slice";

const SaleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = Boolean(id);

   const { data: resellersData = { data: [] } } = useGetResellersQuery();
    const mockCustomers = resellersData.data;
    console.log("c: ", mockCustomers);
    
  
    const { data: productsData = { data: [] } } = useGetProductsQuery();
    const mockProducts = productsData.data;
    console.log("P: ", mockProducts);

    const { data: salesData = { data: [] } } = useGetSaleByIdQuery(id);
    const sale = salesData.data;

    console.log("sale", sale);
    
    

  const [formData, setFormData] = useState({
    customer: "",
    products: [{ product: "", quantity: 1, productTotal: 0 }],
    total: 0,
    invoiceNo: `INV-${Date.now()}`,
  });


  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        { product: "", quantity: 1, productTotal: 0 },
      ],
    }));
  };

  const removeProduct = (index) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
    calculateTotal();
  };

  const updateProduct = (index, field, value) => {
    setFormData((prev) => {
      const newProducts = [...prev.products];
      newProducts[index] = { ...newProducts[index], [field]: value };

      if (field === "product" || field === "quantity") {
        const product = mockProducts.find(
          (p) => p._id === newProducts[index].product
        );
        if (product) {
          newProducts[index].productTotal =
            product.price * newProducts[index].quantity;
        }
      }

      return { ...prev, products: newProducts };
    });
    calculateTotal();
  };

  const calculateTotal = () => {
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        total: prev.products.reduce(
          (sum, product) => sum + product.productTotal,
          0
        ),
      }));
    }, 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.customer || formData.products.some((p) => !p.product)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `Sale ${isEditing ? "updated" : "created"} successfully!`,
    });

    navigate("/sales");
  };


  const buttonClass =
    "inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded text-sm font-medium cursor-pointer hover:bg-gray-100 [#0f172a]";

  return (
    <div>
      <Topbar
        title={`Edit Sale No. ${isEditing ? sale.invoiceNo : "New Sale"}`}
        showSearch={false}
        showAddButton={false}
      />
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => navigate("/sales")}
            className={buttonClass}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sales
          </button>
          <h1 className="text-2xl font-bold">
            {isEditing ? "Edit Sale" : "Create New Sale"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white">
            <CardHeader>
              <CardTitle>Sale Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="customer"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Customer *
                  </label>
                  <select
                    id="customer"
                    value={formData.customer}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        customer: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Select customer</option>
                    {mockCustomers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="invoiceNo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Invoice Number
                  </label>
                  <input
                    id="invoiceNo"
                    type="text"
                    value={formData.invoiceNo}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        invoiceNo: e.target.value,
                      }))
                    }
                    placeholder="Invoice number"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Products</CardTitle>
              <button
                type="button"
                onClick={addProduct}
                className={buttonClass}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.products.map((product, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product *
                    </label>
                    <select
                      value={product.product}
                      onChange={(e) =>
                        updateProduct(index, "product", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select product</option>
                      {mockProducts.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.name} - R{prod.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) =>
                        updateProduct(index, "quantity", Number(e.target.value))
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Total
                    </label>
                    <input
                      value={`R${product.productTotal.toFixed(2)}`}
                      readOnly
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-700 sm:text-sm"
                    />
                  </div>

                  <div className="flex items-end">
                    {formData.products.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="inline-flex items-center justify-center rounded border border-gray-300 px-2 py-1 text-red-600 hover:text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-4 border-t border-gray-200">
                <div className="text-xl font-bold">
                  Total: R{formData.total.toFixed(2)}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/sales")}
              className={`${buttonClass} border border-gray-400 text-gray-700 hover:bg-gray-100`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded bg-[#0f172a] px-4 py-2 text-white hover:bg-indigo-700"
            >
              {isEditing ? "Update Sale" : "Create Sale"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleForm;
