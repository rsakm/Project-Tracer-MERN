import { useEffect, useState } from "react";
import api from "../utils/api";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  const fetchTasks = async (projectId) => {
    const res = await api.get(`/tasks/${projectId}`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    if (projects.length >= 4) return alert("Max 4 projects allowed.");
    await api.post("/projects", { title: newProjectTitle });
    setNewProjectTitle("");
    fetchProjects();
  };

  const handleSelectProject = (id) => {
    setSelectedProjectId(id);
    fetchTasks(id);
  };

  const handleCreateTask = async () => {
    await api.post("/tasks", { ...newTask, projectId: selectedProjectId });
    setNewTask({ title: "", description: "" });
    fetchTasks(selectedProjectId);
  };

  const handleUpdateTask = async (taskId, updatedFields) => {
    await api.put(`/tasks/${taskId}`, updatedFields);
    fetchTasks(selectedProjectId);
  };

  const handleDeleteTask = async (taskId) => {
    await api.delete(`/tasks/${taskId}`);
    fetchTasks(selectedProjectId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
      </div>

      <div className="flex gap-6 flex-wrap">
        {projects.map(p => (
          <div key={p._id} className="bg-white shadow p-4 rounded w-64 cursor-pointer border hover:border-blue-500"
            onClick={() => handleSelectProject(p._id)}>
            <h2 className="text-lg font-semibold">{p.title}</h2>
          </div>
        ))}
        {projects.length < 4 && (
          <div className="bg-white p-4 shadow rounded w-64">
            <input
              className="border w-full px-2 py-1 mb-2"
              placeholder="Project title"
              value={newProjectTitle}
              onChange={e => setNewProjectTitle(e.target.value)}
            />
            <button onClick={handleCreateProject} className="bg-blue-600 text-white w-full py-1 rounded">+ Create</button>
          </div>
        )}
      </div>

      {selectedProjectId && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Tasks</h2>
          <div className="flex gap-4 flex-wrap">
            {tasks.map(task => (
              <div key={task._id} className="bg-white p-4 rounded shadow w-64 space-y-2">
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <select
                  className="w-full border p-1"
                  value={task.status}
                  onChange={(e) => {
                    const status = e.target.value;
                    const completedAt = status === "Completed" ? new Date() : null;
                    handleUpdateTask(task._id, { status, completedAt });
                  }}>
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                {task.completedAt && (
                  <p className="text-xs text-green-600">Completed: {new Date(task.completedAt).toLocaleDateString()}</p>
                )}
                <button onClick={() => handleDeleteTask(task._id)}
                        className="text-red-500 text-sm mt-1 hover:underline">Delete</button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white p-4 rounded w-64 shadow">
            <h3 className="font-semibold mb-2">New Task</h3>
            <input
              className="border w-full px-2 py-1 mb-2"
              placeholder="Task title"
              value={newTask.title}
              onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              className="border w-full px-2 py-1 mb-2"
              placeholder="Description"
              rows="2"
              value={newTask.description}
              onChange={e => setNewTask({ ...newTask, description: e.target.value })}
            />
            <button onClick={handleCreateTask} className="bg-green-600 text-white w-full py-1 rounded">+ Add Task</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
