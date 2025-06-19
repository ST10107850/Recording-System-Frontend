import { Link, useNavigate } from "react-router";
import Topbar from "../components/TopBar";
import { Card } from "../components/ui/Card";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { usePurchase } from "../hooks/purchase/use-purchase";
import { useToast } from "../hooks/use-toast";
import { useDeletePurchaseMutation } from "../features/user/purchase-slice";
import { useState } from "react";

export const PurchaseList = () => {
  const navigate = useNavigate();
  const { data={}, isLoading, isError, error } = usePurchase();
  const purchases = data.data || [];

  const {toast}= useToast();

  const [deletePurchase]= useDeletePurchaseMutation();

   const [searchTerm, setSearchTerm] = useState("");

  const handleViewPurchase = (purchaseId) => {
    navigate(`/purchases/${purchaseId}`);
  };

  const handleNewPurchase = () => {
    navigate("create");
  };

  const handleDeletePurchase = async (id) => {
    if (!id || id.length !== 24) {
      toast({
        title: "Invalid purchase ID",
        description: "Purchase not found — it may have already been deleted.",
        variant: "destructive",
      });
      return;
    }
    if (window.confirm("Are you sure you want to delete this purchase?")) {
      try {
        await deletePurchase(id).unwrap();
        toast({
          title: "Deletion Successful",
          description: "That purchase is now off the list — great job!",
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

  if (isLoading) return <p className="p-6">Loading purchases...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-600">
        Error: {error?.data?.message || "Failed to load purchases"}
      </p>
    );

  return (
    <div className="h-screen bg-gray-50">
      <Topbar
        title="Purchases"
        showSearch={true}
        showAddButton={true}
        addButtonText="New Purchase"
        onAddClick={handleNewPurchase}
      />
      <div className="p-6">
        <Card className="overflow-hidden hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white">
          <table className="min-w-full text-sm text-left border border-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                  Purchase No.
                </th>
                <th className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                  Date
                </th>
                <th className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                  Supplier
                </th>
                <th className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                  Items
                </th>
                <th className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                  Total
                </th>
                <th className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {purchases.length > 0 ? (
                purchases.map((purchase) => (
                  <tr key={purchase._id} className="hover:bg-gray-50">
                    <td className="px-4 py-5 font-medium border-b border-gray-200">
                      {purchase.purchaseNo}
                    </td>
                    <td className="px-4 py-5 border-b border-gray-200">
                      {new Date(purchase.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="p-4 py-5 border-b border-gray-200">
                      {purchase.vendor?.name || "Unknown"}
                    </td>
                    <td className="p-4 py-5 border-b border-gray-200">
                      {purchase.items.length}
                    </td>
                    <td className="p-4 py-5 border-b border-gray-200">
                      R{purchase.purchaseTotal.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 w-[150px]">
                      <div className="flex space-x-5">
                        <button
                          onClick={() => handleViewPurchase(purchase._id)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleViewPurchase(purchase._id)}
                          className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePurchase(purchase._id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-gray-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="flex justify-center items-center"></tr>
              )}
            </tbody>
          </table>

          {purchases.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto max-w-md">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <Plus className="h-full w-full" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No purchase found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Get started by creating your first purchase"}
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleNewPurchase}
                    className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create Purchase
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
