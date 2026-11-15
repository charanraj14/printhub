const Category = require('../models/Category');
const slugify = value => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
exports.list = async (req, res) => res.json({ categories: await Category.find(req.user?.role === 'admin' ? {} : { active: true }).sort({ name: 1 }) });
exports.create = async (req, res) => { const name = req.body.name; if (!name) return res.status(400).json({ message: 'Category name is required' }); res.status(201).json({ category: await Category.create({ ...req.body, slug: slugify(name) }) }); };
exports.update = async (req, res) => { const data = { ...req.body }; if (data.name) data.slug = slugify(data.name); const category = await Category.findByIdAndUpdate(req.params.id, data, { new: true }); if (!category) return res.status(404).json({ message: 'Category not found' }); res.json({ category }); };
exports.remove = async (req, res) => { await Category.findByIdAndUpdate(req.params.id, { active: false }); res.json({ message: 'Category archived' }); };
