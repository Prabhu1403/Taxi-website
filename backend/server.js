const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');
const ensureDatabaseExists = require('./src/config/db-init');
require('dotenv').config();

const vehicleRoutes = require('./src/routes/vehicle.routes');
const bookingRoutes = require('./src/routes/booking.routes');
const routeRoutes = require('./src/routes/route.routes');
const adminRoutes = require('./src/routes/admin.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Sync Database and Start Server
const startServer = async () => {
    try {
        // Ensure database exists before connecting
        await ensureDatabaseExists();

        await sequelize.authenticate();
        console.log('Database connected successfully.');

        // Sync models
        await sequelize.sync({ alter: true });
        console.log('Database synchronized.');

        // Seed initial data
        const seedData = require('./src/config/seed');
        await seedData();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
