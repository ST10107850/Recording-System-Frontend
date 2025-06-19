import { User, Mail, Phone, Shield, Eye, Edit, Trash2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Topbar from "../components/TopBar";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import ViewStaffModal from "../components/ViewStaffModal";
import AddStaffForm from "../components/AddStaffForm";
import EditStaffForm from "../components/EditStaffForm";
import { useGetStaff } from "../hooks/staff/use-getStaff";
import { useToast } from "../hooks/use-toast";
import { useDeleteUserMutation } from "../features/user/userSlice";

export const Staff = () => {
  const { data = {} } = useGetStaff();

  const [staff, setStaff] = useState([]);
  const { toast } = useToast();

  const [deleteStaff] = useDeleteUserMutation();

  useEffect(() => {
    if (Array.isArray(data?.data)) {
      setStaff(data.data);
    }
  }, [data]);

  const getRoleColor = (role) => {
    switch (role) {
      case "management":
        return "bg-purple-100 text-purple-800";
      case "supervisor":
        return "bg-blue-100 text-blue-800";
      case "employee":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddStaff = (newStaff) => {
    setStaff((prev) => [...prev, newStaff]);
  };
  const handleUpdateStaff = (updatedStaff) => {
    setStaff((prev) =>
      prev.map((member) =>
        member._id === updatedStaff._id ? updatedStaff : member
      )
    );
    setSelectedStaff(null);
  };

  const handleViewStaff = (id) => {
    const staffMember = staff.find((member) => member._id === id);
    setSelectedStaff(staffMember);
    setIsViewModalOpen(true);
  };

  const handleEditStaff = (id) => {
    const staffMember = staff.find((member) => member._id === id);
    setSelectedStaff(staffMember);
    setIsEditFormOpen(true);
  };

  const handleDeleteUser = async (id) => {
    if (!id || id.length !== 24) {
      toast({
        title: "Invalid user ID",
        description: "User not found — it may have already been deleted.",
        variant: "destructive",
      });
      return;
    }
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteStaff(id).unwrap();
        toast({
          title: "Deletion Successful",
          description: "That staff is now off the list — great job!",
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
        title="Staff Management"
        showSearch={true}
        showAddButton={true}
        addButtonText="Add Staff Member"
        onAddClick={() => setIsAddFormOpen(true)}
      />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {staff.map((member) => (
            <Card
              key={member._id}
              className="p-6 hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100">
                  <div className="text-blue-800 text-lg font-semibold ">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>

                  <div className="flex gap-2 justify-center">
                    <Badge className={getRoleColor(member.role)}>
                      {member.role}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 w-full">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{member.phoneNumber || "Unknown"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>
                      Joined: {new Date(member.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-5 w-full">
                  <button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewStaff(member._id)}
                    className="border border-gray-200 text-sm px-3 py-1 flex items-center justify-center rounded hover:bg-gray-50 transition w-full"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                  <button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditStaff(member._id)}
                    className="border border-gray-200 text-sm px-3 py-1 flex items-center justify-center rounded hover:bg-gray-50 transition w-full"
                  >
                    <Edit className="w-3 h-3" />
                  </button>

                  <button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteUser(member._id)}
                    className="border border-gray-200 text-sm px-3 py-1 text-red-600 rounded hover:bg-gray-50 transition w-full flex items-center justify-center"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {staff.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto max-w-md">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <Plus className="h-full w-full" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No staff found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Get started by creating your first staff"}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setIsAddFormOpen(true)}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create Staff
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AddStaffForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onAddStaff={handleAddStaff}
      />

      <EditStaffForm
        isOpen={isEditFormOpen}
        onClose={() => {
          setIsEditFormOpen(false);
          setSelectedStaff(null);
        }}
        onUpdateStaff={handleUpdateStaff}
        staff={selectedStaff}
      />

      <ViewStaffModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedStaff(null);
        }}
        staff={selectedStaff}
      />
    </div>
  );
};
