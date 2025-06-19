import Topbar from "../components/TopBar";
import { Card } from "../components/ui/Card";
import { MapPin, Phone, Mail, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useVendor } from "../hooks/vendor/use-vendor";
import { useToast } from "../hooks/use-toast";
import { useDeleteVendorMutation } from "../features/user/vendorSlice";
import { useState } from "react";
import { AddVendorForm } from "../components/AddVendorForm";
import { EditVendorForm } from "../components/EditVendorForm";

const Vendors = () => {
  const { data = {} } = useVendor();
  const resellers = data?.data || [];

  const { toast } = useToast();

  const [deleteVendor] = useDeleteVendorMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const filteredVendor = resellers.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteVendor = async (id) => {
    if (!id || id.length !== 24) {
      toast({
        title: "Invalid supplier ID",
        description: "Supplier not found — it may have already been deleted.",
        variant: "destructive",
      });
      return;
    }

    if (confirm("Are you sure you want to delete this supplier?")) {
      try {
        await deleteVendor(id).unwrap();
        toast({
          title: "Sale Deleted",
          description: "Successfully deleted the supplier.",
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
        title="Supplier Management"
        showSearch={true}
        showAddButton={true}
        addButtonText="Add Supplier"
        onAddClick={() => setIsAddFormOpen(true)}
      />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredVendor.map((reseller) => (
            <Card
              key={reseller._id}
              className="p-6 max-w-lg hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {reseller.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{reseller.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{reseller.phoneNumber}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>
                      {reseller.address.street}, {reseller.address.city},
                      {reseller.address.zip},
                    </span>
                  </div>
                </div>

                <div className="flex pt-3  border-t items-center justify-center space-x-8 border-gray-100">
                  <button className="border flex item item-center border-gray-200 text-sm px-3 text-gray-400 py-2 rounded hover:bg-gray-50 transition">
                    <Eye/>
                  </button>
                  <button
                    onClick={() => handleDeleteVendor(reseller._id)}
                    className="border flex item item-center border-gray-200 text-sm px-3 text-red-400 py-2 rounded hover:bg-gray-50 transition"
                  >
                    <Trash2 />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedVendor(reseller);
                      setIsEditFormOpen(true);
                    }}
                    className="border flex item item-center border-gray-200 text-sm px-3 text-gray-400 py-2 rounded hover:bg-gray-50 transition"
                  >
                    <Edit />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredVendor.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto max-w-md">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <Plus className="h-full w-full" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No supplier found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Get started by creating your first supplier"}
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
                  {searchTerm ? "Clear Search" : "Create Supplier"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AddVendorForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        // onAddItem={handleAddItem}
      />

      <EditVendorForm
        isOpen={isEditFormOpen}
        onClose={() => {
          setIsEditFormOpen(false);
          setSelectedVendor(null);
        }}
        vendor={selectedVendor}
      />
    </div>
  );
};

export default Vendors;
