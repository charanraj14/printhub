const router = require('express').Router(); const c = require('../controllers/contactController'); router.post('/', c.create); module.exports = router;
