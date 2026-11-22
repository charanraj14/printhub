require('dotenv').config();
require('express-async-errors');

const app = require('./src/app');
const connectDB = require('./src/config/db');

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
});

if (require.main === module) {
    app.listen(process.env.PORT || 5000, () => {
        console.log('PrintHub API running');
    });
}

module.exports = app;