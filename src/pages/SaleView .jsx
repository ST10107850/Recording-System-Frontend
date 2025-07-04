import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import Topbar from "../components/TopBar";
import { useGetSaleByIdQuery } from "../features/user/sale-slice";

const SaleView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const { data, isLoading, isError } = useGetSaleByIdQuery(id);
  const sale = data?.data;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this sale?")) {
      toast({
        title: "Success",
        description: "Sale deleted successfully!",
      });
      navigate("/sales");
    }
  };

  const buttonBaseClass =
    "inline-flex items-center gap-2 px-3 py-1.5 border rounded text-sm font-medium cursor-pointer";

  if (isLoading) {
    return <div className="p-6">Loading sale data...</div>;
  }

  if (isError || !sale) {
    return (
      <div className="p-6 text-red-600">
        Failed to load sale data. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <Topbar
        title={`Sale No. ${sale.invoiceNo}`}
        showSearch={false}
        showAddButton={false}
      />
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/sales")}
              className={`${buttonBaseClass} border-gray-300 text-gray-700 hover:bg-gray-100`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sales
            </button>
            <h1 className="text-2xl font-bold">Sale Details</h1>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate(`/sales/${id}/edit`)}
              className={`${buttonBaseClass} border-gray-300 text-gray-700 hover:bg-gray-100`}
            >
              <Edit className="h-4 w-4" />
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className={`${buttonBaseClass} border-gray-300 text-red-600 hover:text-red-700 hover:bg-red-100`}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white">
              <CardHeader>
                <CardTitle>Sale Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Invoice Number
                    </p>
                    <p className="text-lg font-semibold">{sale.invoiceNo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Sale Date
                    </p>
                    <p className="text-lg">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Customer
                    </p>
                    <p className="text-lg">{sale.customer?.name}</p>
                    <p className="text-sm text-gray-600">
                      {sale.customer?.email || sale.customer?.contact}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Recorded By
                    </p>
                    <p className="text-lg">{sale.recordedBy?.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white">
              <CardHeader>
                <CardTitle>Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sale.products?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product?.name}</h3>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          R{item.productTotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">Total:</span>
                      <span className="text-xl font-bold">
                        R{sale.total?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white">
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge
                    variant="default"
                    className="mt-1 bg-[#0f172a] text-white"
                  >
                    Completed
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Created</p>
                  <p className="text-sm">
                    {new Date(sale.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Items Count
                  </p>
                  <p className="text-lg font-semibold">
                    {sale.products?.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Quantity
                  </p>
                  <p className="text-lg font-semibold">
                    {sale.products.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleView;
