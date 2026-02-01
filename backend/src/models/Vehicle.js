const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    vehicleName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    serviceType: {
        type: DataTypes.ENUM('One Way', 'Round Trip'),
        allowNull: false,
    },
    ratePerKm: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    baseFare: {
        type: DataTypes.DECIMAL(10, 2), // Driver Bata
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Active', 'Inactive'),
        defaultValue: 'Active',
    },
}, {
    timestamps: true,
});

module.exports = Vehicle;
