const Cart = require('../models/Cart');
const Product = require('../models/Product');
exports.get = async (req, res) => { const cart = await Cart.findOne({ user: req.user._id }).populate('items.product'); res.json({ cart: cart || { items: [] } }); };
exports.add = async (req, res) => {
    const { productId, quantity = 1, customization = {} } = req.body;
    const product = await Product.findOne({ _id: productId, active: true }); if (!product) return res.status(404).json({ message: 'Product not found' });
    let cart = await Cart.findOne({ user: req.user._id }); if (!cart) cart = new Cart({ user: req.user._id, items: [] });
    const key = JSON.stringify(customization); const item = cart.items.find(i => i.product.toString() === productId && JSON.stringify(i.customization || {}) === key);
    if (item) item.quantity += Math.max(1, Number(quantity)); else cart.items.push({ product: productId, quantity: Math.max(1, Number(quantity)), customization });
    await cart.save(); await cart.populate('items.product'); res.json({ cart });
};
exports.update = async (req, res) => { const cart = await Cart.findOne({ user: req.user._id }); if (!cart) return res.status(404).json({ message: 'Cart not found' }); const item = cart.items.id(req.params.itemId); if (!item) return res.status(404).json({ message: 'Cart item not found' }); if (req.body.quantity < 1) cart.items.pull(req.params.itemId); else item.quantity = Number(req.body.quantity); await cart.save(); await cart.populate('items.product'); res.json({ cart }); };
exports.clear = async (req, res) => { await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] }, { upsert: true }); res.json({ message: 'Cart cleared' }); };
