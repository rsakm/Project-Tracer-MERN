function ProjectSidebar({ projects, selectedProject, onSelectProject, onCreateProject }) {
    const [newProjectTitle, setNewProjectTitle] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!newProjectTitle.trim()) return;
      onCreateProject(newProjectTitle);
      setNewProjectTitle("");
    };
  
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Your Projects</h2>
        <div className="space-y-2">
          {projects.map(project => (
            <div 
              key={project._id} 
              className={`p-2 rounded-md cursor-pointer transition-colors duration-200 ${
                selectedProject?._id === project._id 
                  ? 'bg-blue-50 border-l-4 border-blue-500' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onSelectProject(project)}
            >
              <h3 className="font-medium">{project.title}</h3>
            </div>
          ))}
        </div>
  
        {projects.length < 4 && (
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="New project name"
              value={newProjectTitle}
              onChange={e => setNewProjectTitle(e.target.value)}
              required
            />
            <button 
              type="submit"
              className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Add Project
            </button>
          </form>
        )}
  
        {projects.length >= 4 && (
          <div className="mt-4 text-sm text-gray-500 italic">
            Maximum 4 projects limit reached
          </div>
        )}
      </div>
    );
  }

  export default ProjectSidebar;