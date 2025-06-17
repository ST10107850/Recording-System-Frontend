import { useEffect, useState } from "react";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import {  Link } from "react-router-dom";
import Topbar from "../components/TopBar";
import AddProductForm from "../components/AddProductForm";
import { useProduct } from "../hooks/product/use-product";

export const Product = () => {
  const { data = {} } = useProduct();
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    if (Array.isArray(data.data)) {
      setProducts(data.data);
    }
  }, [data.data]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (newProduct) => {
    const product = {
      id: Date.now().toString(),
      ...newProduct,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setProducts((prev) => [...prev, product]);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product._id !== id));
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        title="Products"
        showSearch={true}
        showAddButton={true}
        addButtonText="New Product"
        onAddClick={() => setIsAddFormOpen(true)}
      />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {product.description}
              </p>
              <div className="mb-3 text-2xl text-green-600 font-bold">
                R{product.price.toFixed(2)}
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Ingredients:
                </h4>
                <div className="space-y-1">
                  {product.ingredients.slice(0, 2).map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-600">
                        {ingredient.inventoryItems?.itemName}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-200 rounded">
                        {ingredient.quantity}{" "}
                        {ingredient.inventoryItems?.unit || "units"}
                      </span>
                    </div>
                  ))}
                  {product.ingredients.length > 2 && (
                    <p className="text-xs text-gray-500">
                      +{product.ingredients.length - 2} more ingredients...
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-200 text-xs text-gray-500">
                <span>
                  Created:{" "}
                  {new Date(product.createdAt).toLocaleDateString("en-GB")}
                </span>
                <div className="flex gap-1">
                  <Link
                    to={`/products/${product._id}`}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link
                    to={`/products/${product.id}/edit`}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto max-w-md">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <Plus className="h-full w-full" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No products found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Get started by creating your first product"}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setIsAddFormOpen(true);
                  }}
                  className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
                >
                  <Plus className="h-4 w-4" />
                  {searchTerm ? "Clear Search" : "Create Product"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AddProductForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};
