import { User, Mail, Phone, Shield, Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import Topbar from "../components/TopBar";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { useNavigate } from "react-router";
import ViewStaffModal from "../components/ViewStaffModal";
import AddStaffForm from "../components/AddStaffForm";
import EditStaffForm from "../components/EditStaffForm";

export const Staff = () => {
  const [staff] = useState([
    {
      id: 1,
      name: "Lwazi Montuma",
      email: "lwazi@doughbetter.com",
      phone: "+27 71 234 5678",
      role: "management",
      department: "Administration",
      status: "active",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@doughbetter.com",
      phone: "+27 72 345 6789",
      role: "supervisor",
      department: "Production",
      status: "active",
      joinDate: "2023-03-20",
    },
    {
      id: 3,
      name: "Mike Williams",
      email: "mike@doughbetter.com",
      phone: "+27 73 456 7890",
      role: "employee",
      department: "Delivery",
      status: "active",
      joinDate: "2023-06-10",
    },
    {
      id: 4,
      name: "Lisa Brown",
      email: "lisa@doughbetter.com",
      phone: "+27 74 567 8901",
      role: "employee",
      department: "Production",
      status: "inactive",
      joinDate: "2023-02-28",
    },
  ]);

  const navigate = useNavigate();

  const handleAddVendor = () => {
    navigate("/staff/create");
  };
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

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleAddStaff = (newStaff) => {
    setStaff((prev) => [...prev, newStaff]);
  };
  const handleUpdateStaff = (updatedStaff) => {
    setStaff(prev => prev.map(member => 
      member.id === updatedStaff.id ? updatedStaff : member
    ));
    setSelectedStaff(null);
  };

  const handleDeleteStaff = (id) => {
    if (confirm("Are you sure you want to delete this staff member?")) {
      setStaff(staff.filter(member => member.id !== id));
    }
  };

  const handleViewStaff = (id) => {
    const staffMember = staff.find(member => member.id === id);
    setSelectedStaff(staffMember);
    setIsViewModalOpen(true);
  };

  const handleEditStaff = (id) => {
    const staffMember = staff.find(member => member.id === id);
    setSelectedStaff(staffMember);
    setIsEditFormOpen(true);
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
              key={member.id}
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
                  <p className="text-sm text-gray-600">{member.department}</p>

                  <div className="flex gap-2 justify-center">
                    <Badge className={getRoleColor(member.role)}>
                      {member.role}
                    </Badge>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
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
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>
                      Joined {new Date(member.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-5 w-full">
                  <button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewStaff(member.id)}
                    className="border border-gray-200 text-sm px-3 py-1 flex items-center justify-center rounded hover:bg-gray-50 transition w-full"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                  <button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditStaff(member.id)}
                    className="border border-gray-200 text-sm px-3 py-1 flex items-center justify-center rounded hover:bg-gray-50 transition w-full"
                  >
                    <Edit className="w-3 h-3" />
                  </button>

                  <button
                    variant="outline"
                    size="sm"
                    className="border border-gray-200 text-sm px-3 py-1 text-red-600 rounded hover:bg-gray-50 transition w-full flex items-center justify-center"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
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
