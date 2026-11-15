const Cart = require('../models/Cart');
const Order = require('../models/Order');
exports.create = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product'); if (!cart || !cart.items.length) return res.status(400).json({ message: 'Your cart is empty' });
    const { shippingAddress, paymentMethod = 'cod' } = req.body; if (!shippingAddress?.name || !shippingAddress?.line1 || !shippingAddress?.pincode || !shippingAddress?.phone) return res.status(400).json({ message: 'Complete shipping details are required' });
    const items = cart.items.map(i => ({ product: i.product._id, name: i.product.name, image: i.product.image, unitPrice: i.product.basePrice, quantity: i.quantity, customization: i.customization }));
    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0); const order = await Order.create({ orderNumber: `PH${Date.now().toString().slice(-9)}`, user: req.user._id, items, shippingAddress, subtotal, shipping: subtotal >= 2000 ? 0 : 99, total: subtotal + (subtotal >= 2000 ? 0 : 99), paymentMethod });
    cart.items = []; await cart.save(); res.status(201).json({ order });
};
exports.mine = async (req, res) => res.json({ orders: await Order.find({ user: req.user._id }).sort({ createdAt: -1 }) });
exports.adminList = async (req, res) => res.json({ orders: await Order.find().populate('user', 'name email').sort({ createdAt: -1 }) });
exports.updateStatus = async (req, res) => { const allowed = ['confirmed', 'printing', 'shipped', 'delivered', 'cancelled']; if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Invalid order status' }); const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }); if (!order) return res.status(404).json({ message: 'Order not found' }); res.json({ order }); };
