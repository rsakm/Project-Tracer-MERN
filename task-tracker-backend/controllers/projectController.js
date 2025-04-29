const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const count = await Project.countDocuments({ userId: req.userId });
    if (count >= 4) return res.status(400).json({ message: 'Max 4 projects allowed' });

    const project = await Project.create({ title: req.body.title, userId: req.userId });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error creating project' });
  }
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ userId: req.userId });
  res.json(projects);
};
