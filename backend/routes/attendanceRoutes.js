const express = require('express');
const router = express.Router();
const { markLogin, markLogout, getAttendance, getMyAttendance } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);

router.post('/login', markLogin);
router.post('/logout', markLogout);
router.get('/my', getMyAttendance);
router.get('/', authorize('Admin'), getAttendance);

module.exports = router;
