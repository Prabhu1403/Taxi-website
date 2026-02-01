const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Vehicle = require('./Vehicle');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    customerId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerPhone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vehicleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Vehicle,
            key: 'id',
        },
    },
    pickupLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dropoffLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    serviceType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'One Way',
    },
    pickupTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed'),
        defaultValue: 'Pending',
    },
}, {
    timestamps: true,
});

// Associations
Vehicle.hasMany(Booking, { foreignKey: 'vehicleId' });
Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

module.exports = Booking;
