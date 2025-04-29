import { useState } from 'react';

function TaskCard({ task, onStatusChange, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description
  });

  const statusColors = {
    'Not Started': 'bg-gray-100',
    'In Progress': 'bg-blue-100',
    'Completed': 'bg-green-100'
  };

  const handleEdit = () => {
    onEdit(task._id, editForm);
    setIsEditing(false);
  };

  return (
    <div className={`${statusColors[task.status]} p-4 rounded-lg shadow-sm transition-all duration-200`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            placeholder="Task title"
          />
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            placeholder="Task description"
            rows="3"
          ></textarea>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <h4 className="font-medium">{task.title}</h4>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
          
          <div className="mt-3">
            <select
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={task.status}
              onChange={(e) => {
                const status = e.target.value;
                const completedAt = status === "Completed" ? new Date() : null;
                onStatusChange(task._id, { status, completedAt });
              }}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
            <div>
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </div>
            {task.completedAt && (
              <div className="text-green-600">
                Completed: {new Date(task.completedAt).toLocaleDateString()}
              </div>
            )}
          </div>
          
          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskCard;