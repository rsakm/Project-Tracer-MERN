const express = require('express');
const { createProject, getProjects } = require('../controllers/projectController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', auth, createProject);
router.get('/', auth, getProjects);

module.exports = router;
