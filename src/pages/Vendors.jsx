import Topbar from "../components/TopBar";
import { Card } from "../components/ui/Card";
import { MapPin, Phone, Mail } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { useNavigate } from "react-router";
import { useVendor } from "../hooks/vendor/use-vendor";

const Vendors = () => {

  const {data={}} = useVendor();
  const resellers = data?.data || [];

  const navigate = useNavigate();
  const handleAddVendor = () => {
    navigate("/vendors/create");
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        title="Vendor Management"
        showSearch={true}
        showAddButton={true}
        addButtonText="Add Vendor"
        onAddClick={handleAddVendor}
      />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {resellers.map((reseller) => (
            <Card
              key={reseller._id}
              className="p-6 hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {reseller.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {reseller.contact || "Unknown"}
                    </p>
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

                <div className="flex pt-3  border-t justify-between border-gray-100">
                  <button className="border border-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-50 transition">
                    View Details
                  </button>
                  <button className="border border-gray-200 text-sm px-6 py-2 rounded hover:bg-gray-50 transition">
                    Edit
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vendors;
