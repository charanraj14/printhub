const router = require('express').Router(); const c = require('../controllers/orderController'); const { protect, adminOnly } = require('../middleware/authMiddleware');
router.post('/', protect, c.create); router.get('/mine', protect, c.mine); router.get('/', protect, adminOnly, c.adminList); router.patch('/:id/status', protect, adminOnly, c.updateStatus); module.exports = router;
