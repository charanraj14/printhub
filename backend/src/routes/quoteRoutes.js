const router = require('express').Router(); const c = require('../controllers/quoteController'); const { protect, adminOnly } = require('../middleware/authMiddleware');
router.post('/', c.create); router.get('/', protect, adminOnly, c.list); router.patch('/:id', protect, adminOnly, c.update); module.exports = router;
