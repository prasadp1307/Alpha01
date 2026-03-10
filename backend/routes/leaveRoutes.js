const express = require('express');
const router = express.Router();
const { applyLeave, getLeaves, getMyLeaves, updateLeaveStatus } = require('../controllers/leaveController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);

router.post('/', applyLeave);
router.get('/my', getMyLeaves);
router.get('/', authorize('Admin'), getLeaves);
router.put('/:id/status', authorize('Admin'), updateLeaveStatus);

module.exports = router;
