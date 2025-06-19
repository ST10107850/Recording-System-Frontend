import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Topbar from "../components/TopBar";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { AddSaleForm } from "../components/AddSaleForm";
import { useSale } from "../hooks/sales/use-sale";
import { useToast } from "../hooks/use-toast";
import { useDeleteSaleMutation } from "../features/user/sale-slice";

export const Sales = () => {
  const { data = {} } = useSale();

  const {toast} = useToast()


  const [sales, setSales] = useState([]);

  useEffect(() => {
    if (Array.isArray(data.data)) {
      setSales(data.data);
    }
  }, [data.data]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const [deleteSale] = useDeleteSaleMutation()

  const filteredSales = sales.filter(
    (sale) =>
      sale.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.products.some((p) =>
        p.product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleAddSale = (newSale) => {
    const sale = {
      id: Date.now().toString(),
      customer: { id: newSale.customerId, name: newSale.customerName },
      products: newSale.products.map((p) => ({
        product: { id: p.productId, name: p.productName },
        quantity: p.quantity,
        productTotal: p.productTotal,
      })),
      total: newSale.total,
      recordedBy: { id: "1", name: newSale.recordedBy },
      date: new Date().toISOString().split("T")[0],
      invoiceNo: newSale.invoiceNo,
    };
    setSales((prev) => [...prev, sale]);
  };

  const handleDeleteSale = async (id) => {
    if (!id || id.length !== 24) {
      toast({
        title: "Invalid sale ID",
        description: "Sale not found — it may have already been deleted.",
        variant: "destructive",
      });
      return;
    }

    if (confirm("Are you sure you want to delete this sale?")) {
      try {
        await deleteSale(id).unwrap();
        toast({
          title: "Sale Deleted",
          description: "Successfully deleted the sale.",
        });
      } catch (error) {
        toast({
          title: "Deletion failed",
          description: error?.data?.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        title="Sales"
        showSearch={true}
        onSearchChange={(term) => setSearchTerm(term)}
        showAddButton={true}
        addButtonText="Add Sale"
        onAddClick={() => setIsAddFormOpen(true)}
      />

      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Actions */}
          {/* <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  placeholder="Search sales..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
            </div>
            <button onClick={() => setIsAddFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Sale
            </button>
          </div> */}

          {/* Sales Grid */}
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">
                    Invoice No.
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSales.map((sale) => (
                  <tr key={sale._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {sale.invoiceNo}
                    </td>
                    <td className="px-6 py-4">{sale.customer.name}</td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-sm">
                        {sale.products.slice(0, 2).map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <span className="text-gray-600">
                              {item.product?.name}
                            </span>
                            <span className="bg-gray-200 text-xs px-2 py-0.5 rounded">
                              {item.quantity} × R
                              {(item.productTotal / item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                        {sale.products.length > 2 && (
                          <p className="text-xs text-gray-500">
                            +{sale.products.length - 2} more...
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(sale.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 font-semibold text-green-600">
                      R{sale.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Link
                          to={`/sales/${sale._id}`}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          to={`/sales/${sale._id}/edit`}
                          className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteSale(sale._id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-gray-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredSales.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto max-w-md">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <Plus className="h-full w-full" />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No sales found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : "Get started by creating your first sale"}
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => setIsAddFormOpen(true)}
                      className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Create Sale
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddSaleForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onAddSale={handleAddSale}
      />
    </div>
  );
};
