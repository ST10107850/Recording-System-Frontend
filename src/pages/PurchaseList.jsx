import { useNavigate } from "react-router";
import Topbar from "../components/TopBar";
import { Card } from "../components/ui/Card";
import { Eye } from "lucide-react";
import { usePurchase } from "../hooks/purchase/use-purchase";

export const PurchaseList = () => {
  const navigate = useNavigate();
  const { data={}, isLoading, isError, error } = usePurchase();
  const purchases = data.data || [];

  console.log("Purchases:", purchases);

  const handleViewPurchase = (purchaseId) => {
    navigate(`/purchases/${purchaseId}`);
  };

  const handleNewPurchase = () => {
    navigate("/purchases/create");
  };

  if (isLoading) return <p>Loading purchases...</p>;
  if (isError)
    return <p>Error: {error?.data?.message || "Failed to load purchases"}</p>;


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
                <th className="p-4  font-semibold text-gray-900 border-b border-gray-200">
                  Items
                </th>
                <th className="p-4  font-semibold text-gray-900 border-b border-gray-200">
                  Total
                </th>
                <th className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-gray-50">
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
                  <td className="px-4 py-5 border-b border-gray-200">
                    <button
                      onClick={() => handleViewPurchase(purchase._id)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};
