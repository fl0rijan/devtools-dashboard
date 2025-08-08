const UserModel = require("../models/UserModel.js");

async function requireAuth(req, res, next) {
    try {
        const userId = req.session?.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const user = await UserModel.findById(userId).exec();
        if (!user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Authentication error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

function requireNotAuth(req, res, next) {
    if (req.session && req.session.userId) {
        return res.status(400).json({message: 'You are already logged in.'});
    }
    next();
}

module.exports = {
    requireAuth, requireNotAuth
};