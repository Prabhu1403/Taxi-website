const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

exports.createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({ include: Vehicle });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id, { include: Vehicle });
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        await booking.update(req.body);
        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        await booking.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
