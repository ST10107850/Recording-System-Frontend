import { useAddStaffForm } from "../hooks/staff/use-createStaff";

const AddStaffForm = ({ isOpen, onClose }) => {
  const { formData, saving, handleInputChange, handleSubmit } =
    useAddStaffForm(onClose);

  if (!isOpen) return null;


  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="text-xl font-semibold mb-4">
          Add New Staff Member
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Full Name
            </label>
            <input
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="role" className="block font-medium mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="management">Management</option>
              <option value="supervisor">Supervisor</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded hover:cursor-pointer"
            >
              {saving ? "Saving…" : "Add Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffForm;
