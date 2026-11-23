const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const errorHandler = require('./middleware/errorMiddleware');
const app = express();
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: [
    process.env.CLIENT_URL,
    process.env.ADMIN_URL,
    'http://localhost:5173',
    'http://localhost:5174'
].filter(Boolean), credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.get('/', (req, res) => res.json({ success: true, message: 'wePrint API is running' }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.get('/api/health', (req, res) => res.json({ success: true, message: 'wePrint API is running' }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/quotes', require('./routes/quoteRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use(errorHandler);
module.exports = app;
