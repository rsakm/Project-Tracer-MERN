const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { projectId, title, description } = req.body;
  const task = await Task.create({ projectId, title, description });
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ projectId: req.params.projectId });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const { title, description, status, completedAt } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, {
    title, description, status, completedAt
  }, { new: true });
  res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.taskId);
  res.json({ message: 'Task deleted' });
};
