const router = require('express').Router(); const c = require('../controllers/cartController'); const { protect } = require('../middleware/authMiddleware');
router.use(protect); router.get('/', c.get); router.post('/items', c.add); router.patch('/items/:itemId', c.update); router.delete('/', c.clear); module.exports = router;
