import { useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import Topbar from "../components/TopBar";
import AddTaskForm from "../components/AddTaskForm";
// import AddTaskForm from "@/components/AddTaskForm";

const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      date: "12/10/2023",
      taskNo: "SI20134",
      type: "Delivery",
      description:
        "Deliver 2x 10L Scone to Ngwabeni Methodist Church by 10:30 am on Sunday 13 October 2023. The person you will deliver to is Mrs Abrahams",
      deadline: "13/10/2023 at 10:30am",
      allocatedBy: "L Montuma",
      assignedTo: "3",
      assignedStaffName: "Mike Williams",
      status: "Assigned",
    },
    {
      id: 2,
      date: "12/10/2023",
      taskNo: "SI20135",
      type: "Production",
      description: "Prepare 50 cupcakes for weekend orders",
      deadline: "14/10/2023 at 08:00am",
      allocatedBy: "L Montuma",
      assignedTo: "2",
      assignedStaffName: "Sarah Johnson",
      status: "In Progress",
    },
    {
      id: 3,
      date: "12/10/2023",
      taskNo: "SI20136",
      type: "Delivery",
      description: "Deliver special order to Corner Bakery",
      deadline: "13/10/2023 at 15:30pm",
      allocatedBy: "L Montuma",
      assignedTo: "3",
      assignedStaffName: "Mike Williams",
      status: "Completed",
    },
  ]);

  const [staffMembers] = useState([
    {
      id: 1,
      name: "Lwazi Montuma",
      department: "Administration",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      department: "Production",
      status: "active",
    },
    { id: 3, name: "Mike Williams", department: "Delivery", status: "active" },
    { id: 4, name: "Lisa Brown", department: "Production", status: "inactive" },
  ]);

  const [selectedTask, setSelectedTask] = useState(tasks[0]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Assigned":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleDeleteTask = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      if (selectedTask.id === id && updatedTasks.length > 0) {
        setSelectedTask(updatedTasks[0]);
      }
    }
  };

  const updateTaskStatus = (status) => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id ? { ...task, status } : task
    );
    setTasks(updatedTasks);
    setSelectedTask({ ...selectedTask, status });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        title="Task Management"
        showSearch={true}
        showAddButton={true}
        addButtonText="Add Task"
        onAddClick={() => setIsAddFormOpen(true)}
      />

      <div className="p-6">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="bg-white shadow-sm rounded-lg overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-3 font-medium">Date</th>
                    <th className="p-3 font-medium">Task No.</th>
                    <th className="p-3 font-medium">Type</th>
                    <th className="p-3 font-medium">Assigned To</th>
                    <th className="p-3 font-medium">Deadline</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr
                      key={task.id}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedTask.id === task.id ? "bg-purple-50" : ""
                      }`}
                      onClick={() => setSelectedTask(task)}
                    >
                      <td className="p-3">{task.date}</td>
                      <td className="p-3">{task.taskNo}</td>
                      <td className="p-3">{task.type}</td>
                      <td className="p-3">{task.assignedStaffName}</td>
                      <td className="p-3">{task.deadline}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 text-xs rounded ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              alert("View task");
                            }}
                          >
                            <Eye className="h-4 w-4 text-gray-600 hover:text-blue-600" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              alert("Edit task");
                            }}
                          >
                            <Edit className="h-4 w-4 text-gray-600 hover:text-yellow-600" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTask(task.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar panel */}
          <div className="w-80 bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Task {selectedTask.taskNo}
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              {selectedTask.description}
            </p>
            <p className="text-sm text-blue-600 mb-4">
              Assigned to: {selectedTask.assignedStaffName}
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Update status
              </label>
              <select
                className="w-full border border-gray-300 p-2 rounded"
                value={selectedTask.status}
                onChange={(e) => updateTaskStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Add Note</label>
              <textarea
                rows="4"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Add any additional notes..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Deadline</label>
              <div className="flex flex-wrap gap-2">
                <input
                  type="date"
                  className="min-w-[120px] flex-1 p-2 border border-gray-300 rounded"
                />
                <input
                  type="time"
                  className="min-w-[90px] p-2 border border-gray-300 rounded"
                />
                <select className="min-w-[60px] p-2 border border-gray-300 rounded">
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Save task
            </button>
          </div>
        </div>
      </div>

      <AddTaskForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onAddTask={handleAddTask}
        staffMembers={staffMembers}
      />
    </div>
  );
};

export default Tasks;
