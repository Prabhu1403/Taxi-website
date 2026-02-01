const Admin = require('../models/Admin');

exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const admin = await Admin.findOne({ where: { username } });

        if (!admin) {
            return res.status(401).json({ error: 'Invalid username' });
        }

        if (admin.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // For now, returning basic admin info without JWT for simplicity as requested
        res.status(200).json({
            message: 'Login successful',
            admin: {
                id: admin.id,
                username: admin.username
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
