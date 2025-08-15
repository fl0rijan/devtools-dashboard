const UserModel = require('../models/UserModel.js');

module.exports = {

    /**
     * UserController.list()
     */
    list: async (req, res) => {
        try {
            const users = await UserModel.find();
            return res.json(users);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting Users.',
                error: err
            });
        }
    },

    /**
     * UserController.show()
     */
    show: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await UserModel.findOne({_id: id});
            if (!user) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }
            return res.json(user);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting User.',
                error: err
            });
        }
    },

    /**
     * UserController.create()
     */
    create: async (req, res) => {
        try {
            const user = new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            const savedUser = await user.save();
            return res.status(201).json(savedUser);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when creating User',
                error: err
            });
        }
    },

    /**
     * UserController.update()
     */
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await UserModel.findOne({_id: id});
            if (!user) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }

            user.username = req.body.username ?? user.username;
            user.email = req.body.email ?? user.email;
            user.password = req.body.password ?? user.password;

            const updatedUser = await user.save();
            return res.json(updatedUser);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when updating User.',
                error: err
            });
        }
    },

    /**
     * UserController.remove()
     */
    remove: async (req, res) => {
        try {
            const id = req.params.id;
            await UserModel.findByIdAndRemove(id);
            return res.status(204).json();
        } catch (err) {
            return res.status(500).json({
                message: 'Error when deleting the User.',
                error: err
            });
        }
    },

    showSelf: async function (req, res) {
        if (req.session && req.session.userId) {
            try {
                const user = await UserModel.findById(req.session.userId);

                if (!user) {
                    return res.status(404).json({message: 'User not found'});
                }

                return res.status(200).json({message: 'User profile retrieved successfully', user: user});

            } catch (err) {
                return res.status(500).json({message: 'Error retrieving user profile', error: err.message});
            }
        }
        return res.status(401).json({message: 'Not authenticated'});
    },
    registerSelf: async (req, res) => {
        try {
            if (req.session && req.session.userId) {
                return res.status(400).json({message: 'Before registering logout!'});
            }

            const user = new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });

            const savedUser = await user.save();

            return res.status(201).json({message: 'User registered successfully', user: savedUser});

        } catch (err) {
            console.error(err);
            if (err.name === 'ValidationError') {
                const messages = Object.values(err.errors).map(e => e.message);
                return res.status(400).json({message: messages.join(', ')});
            } else if (err.code === 11000) {
                if (err.keyPattern && err.keyPattern.username) {
                    return res.status(400).json({message: 'Username already exists'});
                } else if (err.keyPattern && err.keyPattern.email) {
                    return res.status(400).json({message: 'Email already exists'});
                } else {
                    return res.status(400).json({message: 'Duplicate key error'});
                }
            }

            return res.status(500).json({
                message: 'Error registering user',
                error: err.message
            });
        }
    },
    loginSelf: async (req, res) => {
        try {
            if (req.session && req.session.userId) {
                return res.status(400).json({message: 'You are already logged in.'});
            }

            const user = await UserModel.authenticate(req.body.username, req.body.password);

            req.session.userId = user._id;

            return res.status(200).json({
                message: 'Login successful',
                user: user
            });

        } catch (err) {
            return res.status(401).json({message: err.message});
        }
    },
    logoutSelf: async (req, res) => {
        try {
            if (req.session) {
                await new Promise((resolve, reject) => {
                    req.session.destroy((err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }

            return res.status(200).json({message: 'Logout successful'});

        } catch (err) {
            return next(err);
        }
    },

    checkAuth: async function (req, res) {
        try {
            console.log('Checking session userId:', req.session.userId);

            if (req.session && req.session.userId) {
                const user = await UserModel.findById(req.session.userId).exec();

                if (!user) {
                    return res.status(404).json({message: 'User not found'});
                }

                const safeUser = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                };

                return res.json({isAuthenticated: true, user: safeUser});
            } else {
                return res.json({isAuthenticated: false});
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({message: 'Server error'});
        }
    }

};