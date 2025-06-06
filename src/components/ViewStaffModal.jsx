import { User, Mail, Phone, Shield, Calendar, X } from "lucide-react";

const ViewStaffModal = ({ isOpen, onClose, staff }) => {
  if (!staff || !isOpen) return null;

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

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "";
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-lg max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <header>
            <h2
              id="modal-title"
              className="text-xl font-semibold text-gray-900"
            >
              Staff Details
            </h2>
          </header>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-800 text-3xl font-bold flex items-center justify-center">
              {getInitials(staff.name)}
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {staff.name}
              </h3>
              <p className="text-gray-600">{staff.department}</p>

              <div className="flex gap-2 justify-center">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${getRoleColor(
                    staff.role
                  )}`}
                >
                  {staff.role}
                </span>
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                    staff.status
                  )}`}
                >
                  {staff.status}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span>{staff.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span>{staff.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <span className="capitalize">{staff.role}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span>
                Joined {new Date(staff.joinDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStaffModal;
