import { useEffect, useMemo, useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import Topbar from "../components/TopBar";
import AddTaskForm from "../components/AddTaskForm";
import { Badge } from "../components/ui/Badge";
import { useGetTasksQuery } from "../features/user/task-slice";

const Tasks = () => {
  const { data = {} } = useGetTasksQuery();

  const taskData = useMemo(
    () =>
      Array.isArray(data.data)
        ? data.data.map((task) => ({ ...task, id: task._id })) 
        : [],
    [data.data]
  );

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTasks(taskData);
    if (taskData.length > 0) {
      setSelectedTask({ ...taskData[0] }); 
    }
  }, [taskData]);

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
    setTasks((prev) => [...prev, { ...newTask, id: newTask._id }]);
  };

  const handleDeleteTask = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      if (selectedTask?.id === id && updatedTasks.length > 0) {
        setSelectedTask({ ...updatedTasks[0] });
      }
    }
  };

  const updateTaskStatus = (status) => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id ? { ...task, status } : task
    );
    setTasks(updatedTasks);
    setSelectedTask((prev) => ({ ...prev, status }));
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
                    <th className="p-3 font-medium">Sale</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr
                      key={task.id}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedTask?.id === task.id ? "bg-purple-50" : ""
                      }`}
                      onClick={() => setSelectedTask({ ...task })}
                    >
                      <td className="p-3">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3">{task.taskNo}</td>
                      <td className="p-3">{task.type}</td>
                      <td className="p-3">{task.assignedTo?.name}</td>
                      <td className="p-3">
                        {new Date(task.deadline).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        {task.order?.invoiceNo} -{" "}
                        {task.order?.customer?.shopName ||
                          task.order?.customer?.name}
                      </td>

                      <td className="p-3">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        {task.completedAt && (
                          <div className="text-xs text-green-600 mt-1">
                            Completed: {task.completedAt}
                          </div>
                        )}
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
          {selectedTask && (
            <div className="w-80 bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Task {selectedTask.taskNo}
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                {selectedTask.description}
              </p>
              <p className="text-sm text-blue-600 mb-2">
                Assigned to: {selectedTask.assignedTo?.name}
              </p>

              <div className="text-sm text-gray-600 mb-4">
                Assigned by: {selectedTask.assignedBy?.name}
              </div>

              {selectedTask.order?._id && (
                <div className="text-sm text-gray-600 mb-4">
                  Related Sale: {selectedTask.order?.invoiceNo} -{" "}
                  {selectedTask.order?.customer?.shopName ||
                    selectedTask.order?.customer?.name}
                </div>
              )}

              {selectedTask.completedAt && (
                <div className="text-sm text-green-600 mb-4">
                  Completed on: {selectedTask.completedAt}
                </div>
              )}

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
                <label className="block text-sm font-medium mb-1">
                  Add Note
                </label>
                <textarea
                  rows="4"
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Add any additional notes..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Deadline
                </label>
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
          )}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto max-w-md">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <Plus className="h-full w-full" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No task found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Get started by creating your first task"}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setIsAddFormOpen(true)}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create Task
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AddTaskForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default Tasks;
