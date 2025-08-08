var SnippetModel = require('../models/SnippetModel.js');

module.exports = {
    list: async function (req, res) {
        try {
            const userId = req.user._id;

            const snippets = await SnippetModel.find({
                $or: [
                    { createdBy: userId },
                    { starredBy: userId }
                ]
            }).populate('createdBy', 'username');

            const filtered = snippets.map(s => {
                const isOwner = s.createdBy._id.equals(userId);
                const isStarred = s.starredBy?.some(id => id.equals(userId)) || false;

                return {
                    _id: s._id,
                    title: s.title,
                    code: s.code,
                    language: s.language,
                    description: s.description,
                    tags: s.tags,
                    createdBy: s.createdBy,
                    createdAt: s.createdAt,
                    updatedAt: s.updatedAt,
                    isStarred: isStarred
                };
            });

            return res.json(filtered);
        } catch (err) {
            return res.status(500).json({ message: 'Error fetching snippets', error: err });
        }
    },

    show: async function (req, res) {
        try {
            const snippet = await SnippetModel.findById(req.params.id).populate('createdBy', 'username');
            if (!snippet) return res.status(404).json({ message: 'Snippet not found' });

            const userId = req.user._id;
            const isOwner = snippet.createdBy._id.equals(userId);
            const isStarred = snippet.starredBy?.some(id => id.equals(userId)) || false;

            let response = {
                _id: snippet._id,
                title: snippet.title,
                code: snippet.code,
                language: snippet.language,
                description: snippet.description,
                tags: snippet.tags,
                createdBy: snippet.createdBy,
                createdAt: snippet.createdAt,
                updatedAt: snippet.updatedAt,
                isStarred: isStarred
            };

            if (isOwner) response.starredBy = snippet.starredBy;

            return res.json(response);
        } catch (err) {
            return res.status(500).json({ message: 'Error getting snippet', error: err });
        }
    },

    create: async function (req, res) {
        try {
            const data = req.body;
            data.createdBy = req.user._id;

            const snippet = new SnippetModel(data);
            await snippet.save();

            return res.status(201).json(snippet);
        } catch (err) {
            return res.status(500).json({ message: 'Error creating snippet', error: err });
        }
    },

    update: async function (req, res) {
        try {
            const snippet = await SnippetModel.findById(req.params.id);
            if (!snippet) return res.status(404).json({ message: 'Snippet not found' });

            if (!snippet.createdBy.equals(req.user._id))
                return res.status(403).json({ message: 'Unauthorized' });

            Object.assign(snippet, req.body);
            await snippet.save();

            return res.json(snippet);
        } catch (err) {
            return res.status(500).json({ message: 'Error updating snippet', error: err });
        }
    },

    remove: async function (req, res) {
        try {
            const snippet = await SnippetModel.findById(req.params.id);
            if (!snippet) return res.status(404).json({ message: 'Snippet not found' });

            if (!snippet.createdBy.equals(req.user._id))
                return res.status(403).json({ message: 'Unauthorized' });

            await snippet.remove();
            return res.json({ message: 'Snippet deleted' });
        } catch (err) {
            return res.status(500).json({ message: 'Error deleting snippet', error: err });
        }
    },

    star: async function (req, res) {
        try {
            const snippet = await SnippetModel.findById(req.params.id);
            if (!snippet) return res.status(404).json({ message: 'Snippet not found' });

            const userId = req.user._id;
            if (!snippet.starredBy) snippet.starredBy = [];

            if (!snippet.starredBy.some(id => id.equals(userId))) {
                snippet.starredBy.push(userId);
                await snippet.save();
            }

            return res.json({ message: 'Snippet starred' });
        } catch (err) {
            return res.status(500).json({ message: 'Error starring snippet', error: err });
        }
    },

    unstar: async function (req, res) {
        try {
            const snippet = await SnippetModel.findById(req.params.id);
            if (!snippet) return res.status(404).json({ message: 'Snippet not found' });

            const userId = req.user._id;

            snippet.starredBy = snippet.starredBy.filter(id => !id.equals(userId));
            await snippet.save();

            return res.json({ message: 'Snippet unstarred' });
        } catch (err) {
            return res.status(500).json({ message: 'Error unstarring snippet', error: err });
        }
    },

    listStarred: async function (req, res) {
        try {
            const userId = req.user._id;
            const starredSnippets = await SnippetModel.find({ starredBy: userId })
                .populate('createdBy', 'username')
                .sort({ createdAt: -1 });

            const result = starredSnippets.map(s => ({
                _id: s._id,
                title: s.title,
                code: s.code,
                language: s.language,
                description: s.description,
                tags: s.tags,
                createdBy: s.createdBy,
                createdAt: s.createdAt,
                updatedAt: s.updatedAt,
                isStarred: true
            }));

            return res.json(result);
        } catch (err) {
            return res.status(500).json({ message: 'Error fetching starred snippets', error: err });
        }
    },

    explore: async function (req, res) {
        try {
            const publicSnippets = await SnippetModel.find({ public: true })
                .populate('createdBy', 'username')
                .sort({ createdAt: -1 });

            const filtered = publicSnippets.map(s => ({
                _id: s._id,
                title: s.title,
                code: s.code,
                language: s.language,
                description: s.description,
                tags: s.tags,
                createdBy: s.createdBy,
                createdAt: s.createdAt,
                updatedAt: s.updatedAt,
                isStarred: false
            }));

            return res.json(filtered);
        } catch (err) {
            return res.status(500).json({ message: 'Error fetching public snippets', error: err });
        }
    }
};