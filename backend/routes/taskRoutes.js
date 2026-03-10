const express = require('express');
const router = express.Router();
const { createTask, getTasks, getMyTasks, updateTaskStatus, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);

router.post('/', authorize('Admin'), createTask);
router.get('/', authorize('Admin'), getTasks);
router.get('/my', getMyTasks);
router.put('/:id/status', updateTaskStatus);
router.delete('/:id', authorize('Admin'), deleteTask);

module.exports = router;
