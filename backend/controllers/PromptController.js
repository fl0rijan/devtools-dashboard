var PromptModel = require('../models/PromptModel.js');

/**
 * PromptController.js
 *
 * @description :: Server-side logic for managing Prompts.
 */
module.exports = {

    /**
     * PromptController.list()
     */
    list: async function (req, res) {
        try {
            const userId = req.user._id;
            const prompts = await PromptModel.find({
                $or: [
                    {createdBy: userId},
                    {starredBy: userId}
                ]
            }).sort({createdAt: -1});

            const result = prompts.map(p => {
                const isOwner = p.createdBy.equals(userId);
                const isStarred = p.starredBy.some(id => id.equals(userId));
                return {
                    _id: p._id,
                    title: p.title,
                    content: p.content,
                    tags: p.tags,
                    category: p.category,
                    language: p.language,
                    createdBy: p.createdBy,
                    createdAt: p.createdAt,
                    updatedAt: p.updatedAt,
                    isStarred,
                    ...(isOwner && {starredBy: p.starredBy}) // only owner sees who starred
                };
            });

            return res.json(result);
        } catch (err) {
            return res.status(500).json({message: 'Error fetching prompts', error: err});
        }
    },

    /**
     * PromptController.show()
     */
    show: async function (req, res) {
        try {
            const prompt = await PromptModel.findById(req.params.id).populate('createdBy', 'username');
            if (!prompt) return res.status(404).json({message: 'Prompt not found'});

            if (!prompt.createdBy._id.equals(req.user._id)) {
                return res.status(403).json({message: 'Not authorized to view this prompt'});
            }

            return res.json(prompt);
        } catch (err) {
            return res.status(500).json({message: 'Error getting prompt', error: err});
        }
    },

    /**
     * PromptController.create()
     */
    create: async function (req, res) {
        try {
            const userId = req.user._id; // assuming auth middleware sets req.user
            const promptData = {
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags || [],
                category: req.body.category || 'General',
                language: req.body.language || '',
                createdBy: userId,
            };

            const newPrompt = await PromptModel.create(promptData);
            return res.status(201).json(newPrompt);
        } catch (err) {
            return res.status(500).json({message: 'Error creating prompt', error: err});
        }
    },

    /**
     * PromptController.update()
     */
    update: async function (req, res) {
        try {
            const prompt = await PromptModel.findById(req.params.id);
            if (!prompt) return res.status(404).json({message: 'Prompt not found'});
            if (!prompt.createdBy.equals(req.user._id)) {
                return res.status(403).json({message: 'Not authorized to update this prompt'});
            }

            const updates = ['title', 'content', 'tags', 'category', 'language'];
            updates.forEach(field => {
                if (req.body[field] !== undefined) prompt[field] = req.body[field];
            });

            await prompt.save();
            return res.json(prompt);
        } catch (err) {
            return res.status(500).json({message: 'Error updating prompt', error: err});
        }
    },

    /**
     * PromptController.remove()
     */
    remove: async function (req, res) {
        try {
            const prompt = await PromptModel.findById(req.params.id);
            if (!prompt) return res.status(404).json({message: 'Prompt not found'});
            if (!prompt.createdBy.equals(req.user._id)) {
                return res.status(403).json({message: 'Not authorized to delete this prompt'});
            }

            await prompt.deleteOne();
            return res.json({message: 'Prompt deleted'});
        } catch (err) {
            return res.status(500).json({message: 'Error deleting prompt', error: err});
        }
    },

    explore: async function (req, res) {
        try {
            const prompts = await PromptModel.find({public: true})
                .populate('createdBy', 'username')
                .sort({createdAt: -1});
            return res.json(prompts);
        } catch (err) {
            return res.status(500).json({message: 'Error fetching public prompts', error: err});
        }
    },

    star: async function (req, res) {
        try {
            const userId = req.user._id;
            const promptId = req.params.id;

            const prompt = await PromptModel.findById(promptId);
            if (!prompt) return res.status(404).json({message: 'Prompt not found'});

            if (!prompt.starredBy.some(id => id.equals(userId))) {
                prompt.starredBy.push(userId);
                await prompt.save();
            }

            return res.json({message: 'Prompt starred'});
        } catch (err) {
            return res.status(500).json({message: 'Error starring prompt', error: err});
        }
    },

    unstar: async function (req, res) {
        try {
            const userId = req.user._id;
            const promptId = req.params.id;

            const prompt = await PromptModel.findById(promptId);
            if (!prompt) return res.status(404).json({message: 'Prompt not found'});

            prompt.starredBy = prompt.starredBy.filter(id => !id.equals(userId));
            await prompt.save();

            return res.json({message: 'Prompt unstarred'});
        } catch (err) {
            return res.status(500).json({message: 'Error unstarring prompt', error: err});
        }
    },
    starred: async function (req, res) {
        try {
            const userId = req.user._id;

            const starredPrompts = await PromptModel.find({ starredBy: userId }).sort({ createdAt: -1 });

            const result = starredPrompts.map(p => ({
                _id: p._id,
                title: p.title,
                content: p.content,
                tags: p.tags,
                category: p.category,
                language: p.language,
                createdBy: p.createdBy,
                createdAt: p.createdAt,
                updatedAt: p.updatedAt,
                isStarred: true
            }));

            return res.json(result);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting starred prompts.',
                error: err
            });
        }
    }
};
