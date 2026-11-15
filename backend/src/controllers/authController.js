const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const tokenFor = user => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
exports.register = async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || password.length < 8) return res.status(400).json({ message: 'Name, valid email and password (8+ characters) are required' });
    const exists = await User.findOne({ email }); if (exists) return res.status(409).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10), phone });
    res.status(201).json({ token: tokenFor(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};
exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password || '', user.password))) return res.status(401).json({ message: 'Invalid email or password' });
    res.json({ token: tokenFor(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};
exports.me = async (req, res) => res.json({ user: req.user });
