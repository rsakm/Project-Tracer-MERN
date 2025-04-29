const Task = require('../models/Task');
const Project = require('../models/Project');

exports.createTask = async (req, res) => {
  try {
    const { projectId, title, description } = req.body;
    
    // Verify project belongs to user
    const project = await Project.findOne({ _id: projectId, userId: req.userId });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    const task = await Task.create({ projectId, title, description });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    // Verify project belongs to user
    const project = await Project.findOne({ _id: req.params.projectId, userId: req.userId });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving tasks' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, completedAt } = req.body;
    
    // Find task and verify ownership
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    // Verify project belongs to user
    const project = await Project.findOne({ _id: task.projectId, userId: req.userId });
    if (!project) return res.status(403).json({ message: 'Not authorized' });
    
    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, {
      title, description, status, completedAt
    }, { new: true });
    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    // Find task and verify ownership
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    // Verify project belongs to user
    const project = await Project.findOne({ _id: task.projectId, userId: req.userId });
    if (!project) return res.status(403).json({ message: 'Not authorized' });
    
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};