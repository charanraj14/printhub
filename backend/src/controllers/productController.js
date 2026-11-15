const Product = require('../models/Product');
exports.list = async (req, res) => {
    const filter = { active: true };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search) filter.name = { $regex: req.query.search, $options: 'i' };
    if (req.query.featured === 'true') filter.featured = true;
    if (req.query.minPrice || req.query.maxPrice) filter.basePrice = { ...(req.query.minPrice ? { $gte: Number(req.query.minPrice) } : {}), ...(req.query.maxPrice ? { $lte: Number(req.query.maxPrice) } : {}) };
    const products = await Product.find(filter).populate('category', 'name slug').sort({ createdAt: -1 });
    res.json({ products });
};
exports.getOne = async (req, res) => { const product = await Product.findOne({ $or: [{ slug: req.params.slug }, ...(req.params.slug.match(/^[0-9a-f]{24}$/) ? [{ _id: req.params.slug }] : [])], active: true }).populate('category'); if (!product) return res.status(404).json({ message: 'Product not found' }); res.json({ product }); };
exports.create = async (req, res) => res.status(201).json({ product: await Product.create(req.body) });
exports.update = async (req, res) => { const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!product) return res.status(404).json({ message: 'Product not found' }); res.json({ product }); };
exports.remove = async (req, res) => { await Product.findByIdAndUpdate(req.params.id, { active: false }); res.json({ message: 'Product archived' }); };
