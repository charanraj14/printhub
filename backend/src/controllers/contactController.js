const Contact = require('../models/Contact');
exports.create = async (req, res) => { const { name, email, message } = req.body; if (!name || !email || !message) return res.status(400).json({ message: 'Name, email and message are required' }); res.status(201).json({ contact: await Contact.create(req.body), message: 'Message received' }); };
