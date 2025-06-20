import React, { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, addTask, updateTask, deleteTask } from "@/services/api";
import { Task } from "@/types";
import { toast } from "react-toastify";
import { SignOut, Plus, X } from "phosphor-react";


const TaskCard = lazy(() => import("@/components/TaskCard"));
const TaskForm = lazy(() => import("@/components/TaskForm"));

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/");
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      toast.error("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (task: Omit<Task, "id">) => {
    console.log("Submitting task:", task);
    const newTask = await addTask(task);
    setTasks((prev) => [...prev, newTask]);
    toast.success("Task added");
    setShowModal(false);
  };

const handleUpdate = async (id: number, updates: Partial<Task>) => {
  const updated = await updateTask(id, updates);
  setTasks((prev) =>
    prev.map((t) => (t.id === id ? updated : t))  
  );
  toast.info("Task updated");
};

const handleDelete = async (id: number) => {
  try {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id)); 
    toast.warn("Task deleted");
  } catch (err: any) {
    console.error("Delete failed", err?.response?.status, err?.response?.data);
    toast.error("Failed to delete task");
  }
};


  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
     
      <div className="sticky top-0 bg-white z-10 shadow-sm px-4 sm:px-6 md:px-10 py-4 border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Task Dashboard</h1>
         <button
  onClick={handleLogout}
  className="flex items-center justify-center gap-2 text-sm text-gray-800 hover:text-gray-900 border border-gray-300 px-4 py-1.5 rounded-full transition duration-150"
>
  <SignOut size={18} weight="bold" />
  Logout
</button>

        </div>
      </div>

      <div className="max-w-full sm:max-w-4xl mx-auto p-4 sm:p-6 md:p-10">
        
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg relative mx-4">
            <button
  onClick={() => setShowModal(false)}
  className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
  aria-label="Close modal"
>
  <X size={16} weight="bold" />
</button>

              <Suspense fallback={<div>Loading form...</div>}>
                <TaskForm onSubmit={handleAdd} loading={false} />
              </Suspense>
            </div>
          </div>
        )}

        {/* Task Table */}
{loading ? (
  <div className="mt-10 space-y-4">
    {/* Table header skeleton */}
    <div className="flex items-center justify-between mb-4">
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
      <div className="h-9 w-24 bg-gray-200 rounded-full animate-pulse" />
    </div>

    {/* Table rows skeleton */}
    <div className="overflow-x-auto bg-white rounded-xl shadow-md">
      <div className="min-w-[600px]">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="grid grid-cols-5 px-6 py-4 border-b animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-48" />
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  </div>
) : (
  <div className="mt-10">
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-semibold text-lg">Tasks</h2>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition"
      >
        <Plus size={16} />
        Add Task
      </button>
    </div>

    <div className="overflow-x-auto bg-white rounded-xl shadow-md">
      <div className="min-w-[600px]">
        <div className="grid grid-cols-5 text-sm text-gray-600 font-semibold px-6 py-3 border-b bg-gray-100">
          <div>Title</div>
          <div>Description</div>
          <div>Date</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        <Suspense fallback={<div className="p-4">Loading tasks...</div>}>
          {tasks.length === 0 ? (
            <p className="p-4">No tasks available.</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))
          )}
        </Suspense>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Dashboard;
