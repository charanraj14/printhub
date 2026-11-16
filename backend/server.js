require('dotenv').config();
require('express-async-errors');
const app = require('./src/app');
const connectDB = require('./src/config/db');
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`weprint API running on ${PORT}`));
connectDB().then(() => app.listen(PORT, () => console.log(`weprint API running on ${PORT}`))).catch(error => { console.error(error); process.exit(1); });
