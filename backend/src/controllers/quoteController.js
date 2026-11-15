const Quote = require('../models/Quote');
exports.create = async (req, res) => { const { name, email, product, quantity } = req.body; if (!name || !email || !product) return res.status(400).json({ message: 'Name, email and product are required' }); const quote = await Quote.create(req.body); res.status(201).json({ quote, message: 'Quote request submitted' }); };
exports.list = async (req, res) => res.json({ quotes: await Quote.find().sort({ createdAt: -1 }) });
exports.update = async (req, res) => { const quote = await Quote.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }); if (!quote) return res.status(404).json({ message: 'Quote not found' }); res.json({ quote }); };
