import { useState } from "react";

const AddTaskForm = ({ isOpen, onClose, onAddTask, staffMembers }) => {
  const [formData, setFormData] = useState({
    taskNo: "",
    type: "Delivery",
    description: "",
    deadline: "",
    time: "",
    assignedTo: "",
    status: "Assigned",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignedStaff = staffMembers.find(
      (staff) => staff.id.toString() === formData.assignedTo
    );
    onAddTask({
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      allocatedBy: "L Montuma",
      assignedStaffName: assignedStaff?.name || "Unassigned",
    });
    setFormData({
      taskNo: "",
      type: "Delivery",
      description: "",
      deadline: "",
      time: "",
      assignedTo: "",
      status: "Assigned",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="taskNo" className="block text-sm font-medium mb-1">
              Task Number
            </label>
            <input
              id="taskNo"
              value={formData.taskNo}
              onChange={(e) =>
                setFormData({ ...formData, taskNo: e.target.value })
              }
              placeholder="SI20134"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Delivery">Delivery</option>
              <option value="Production">Production</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Administrative">Administrative</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Task description..."
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Assign To</label>
            <select
              value={formData.assignedTo}
              onChange={(e) =>
                setFormData({ ...formData, assignedTo: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select staff member</option>
              {staffMembers
                .filter((staff) => staff.status === "active")
                .map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.name} - {staff.department}
                  </option>
                ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-medium mb-1"
              >
                Deadline Date
              </label>
              <input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium mb-1">
                Time
              </label>
              <input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 border border-gray-300 p-2 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
