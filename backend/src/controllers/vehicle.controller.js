const Vehicle = require('../models/Vehicle');

exports.createVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.create(req.body);
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByPk(req.params.id);
        if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByPk(req.params.id);
        if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
        await vehicle.update(req.body);
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByPk(req.params.id);
        if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
        await vehicle.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
