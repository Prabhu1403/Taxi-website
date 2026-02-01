const Route = require('../models/Route');

exports.getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.findAll();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRouteById = async (req, res) => {
    try {
        const route = await Route.findByPk(req.params.id);
        if (!route) return res.status(404).json({ error: 'Route not found' });
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createRoute = async (req, res) => {
    try {
        const route = await Route.create(req.body);
        res.status(201).json(route);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateRoute = async (req, res) => {
    try {
        const route = await Route.findByPk(req.params.id);
        if (!route) return res.status(404).json({ error: 'Route not found' });
        await route.update(req.body);
        res.status(200).json(route);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteRoute = async (req, res) => {
    try {
        const route = await Route.findByPk(req.params.id);
        if (!route) return res.status(404).json({ error: 'Route not found' });
        await route.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
