const express = require('express');
const {
  createTask, getTasks, updateTask, deleteTask
} = require('../controllers/taskController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', auth, createTask);
router.get('/:projectId', auth, getTasks);
router.put('/:taskId', auth, updateTask);
router.delete('/:taskId', auth, deleteTask);

module.exports = router;
