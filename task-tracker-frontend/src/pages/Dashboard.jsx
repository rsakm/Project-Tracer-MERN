import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import TaskCard from "../components/TaskCard";
import ProjectSidebar from "../components/ProjectSidebar";
import Header from "../components/Header";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/projects");
      setProjects(res.data);
      if (res.data.length > 0 && !selectedProject) {
        setSelectedProject(res.data[0]);
        fetchTasks(res.data[0]._id);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      if (error.response?.status === 401) {
        logout();
      }
      setIsLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  const fetchTasks = async (projectId) => {
    try {
      const res = await api.get(`/tasks/${projectId}`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProjects();
  }, []);

  const handleCreateProject = async (title) => {
    if (projects.length >= 4) {
      alert("Maximum 4 projects allowed per user");
      return;
    }
    
    try {
      await api.post("/projects", { title });
      fetchProjects();
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project");
    }
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    fetchTasks(project._id);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    try {
      await api.post("/tasks", { 
        ...newTask, 
        projectId: selectedProject._id 
      });
      setNewTask({ title: "", description: "" });
      setIsAddingTask(false);
      fetchTasks(selectedProject._id);
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task");
    }
  };

  const handleUpdateTask = async (taskId, updatedFields) => {
    try {
      await api.put(`/tasks/${taskId}`, updatedFields);
      fetchTasks(selectedProject._id);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks(selectedProject._id);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    task.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group tasks by status
  const tasksByStatus = {
    "Not Started": filteredTasks.filter(t => t.status === "Not Started"),
    "In Progress": filteredTasks.filter(t => t.status === "In Progress"),
    "Completed": filteredTasks.filter(t => t.status === "Completed")
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header user={user} onLogout={logout} />

      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="col-span-1 space-y-6">
            <ProjectSidebar 
              projects={projects}
              selectedProject={selectedProject}
              onSelectProject={handleSelectProject}
              onCreateProject={handleCreateProject}
            />
          </div>

          {/* Main Content */}
          <div className="col-span-1 md:col-span-3 space-y-6">
            {selectedProject ? (
              <>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{selectedProject.title}</h2>
                      <p className="text-sm text-gray-500">
                        {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 w-full sm:w-auto">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Search tasks..."
                          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                          onClick={() => setIsAddingTask(true)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                          Add Task
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Task Adding Form */}
                  {isAddingTask && (
                    <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                      <form onSubmit={handleCreateTask}>
                        <h3 className="text-lg font-medium mb-3">New Task</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Task title"
                              value={newTask.title}
                              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Task description"
                              rows="3"
                              value={newTask.description}
                              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            ></textarea>
                          </div>
                          
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setIsAddingTask(false);
                                setNewTask({ title: "", description: "" });
                              }}
                              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                            >
                              Create Task
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Task Board */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
                      <div key={status} className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <span 
                            className={`inline-block w-3 h-3 rounded-full ${
                              status === 'Not Started' ? 'bg-gray-400' :
                              status === 'In Progress' ? 'bg-blue-500' :
                              'bg-green-500'
                            }`}
                          ></span>
                          {status} ({statusTasks.length})
                        </h3>
                        <div className="space-y-3">
                          {statusTasks.length === 0 ? (
                            <div className="text-sm text-gray-500 p-2">No tasks</div>
                          ) : (
                            statusTasks.map((task) => (
                              <TaskCard 
                                key={task._id}
                                task={task}
                                onStatusChange={handleUpdateTask}
                                onDelete={handleDeleteTask}
                                onEdit={(taskId, updatedFields) => handleUpdateTask(taskId, updatedFields)}
                              />
                            ))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <h2 className="text-xl font-medium text-gray-800">No Projects Yet</h2>
                <p className="text-gray-600 mt-2">Create your first project to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;