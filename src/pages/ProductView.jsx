import { useParams, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Edit, Trash2, ArrowLeft } from "lucide-react";
import Topbar from "../components/TopBar";
import { useGetProductByIdQuery } from "../features/user/product-slice";

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetProductByIdQuery(id);
  const fetchedProducts = data?.data || {};

  const handleEdit = () => {
    navigate(`/products/${id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Deleting product:", id);
      navigate("/products");
    }
  };

  if (!fetchedProducts) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Product Details" />
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => navigate("/products")}
              className="flex items-center text-sm text-blue-700 hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </button>
          </div>

          <Card className="p-6 bg-white shadow-md border border-gray-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {fetchedProducts.name}
                </h1>
                <p className="text-gray-600 text-lg">
                  {fetchedProducts.description}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleEdit}
                  className="flex items-center border border-gray-300 text-sm px-3 py-1.5 rounded hover:bg-gray-100"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center border border-red-300 text-red-500 text-sm px-3 py-1.5 rounded hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Product Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Price</span>
                    <p className="text-2xl font-bold text-green-600">
                      R{fetchedProducts.price}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Created Date</span>
                    <p className="text-gray-900">
                      {fetchedProducts.createdAt || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                <div className="space-y-3">
                  {fetchedProducts.ingredients?.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium truncate max-w-[60%]">
                        {ingredient.inventoryItems.itemName}
                      </span>
                      <Badge variant="secondary">
                        {ingredient.quantity}{" "}
                        {ingredient.inventoryItems.unit || "Unit"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
