var BookmarkModel = require('../models/BookmarkModel.js');

/**
 * BookmarkController.js
 *
 * @description :: Server-side logic for managing Bookmarks.
 */
module.exports = {

    /**
     * BookmarkController.list()
     */
    list: async function (req, res) {
        try {
            const userId = req.user._id;

            // Find bookmarks where:
            // - created by you
            // OR
            // - starred by you
            const bookmarks = await BookmarkModel.find({
                $or: [
                    { createdBy: userId },
                    { starredBy: userId }
                ]
            }).populate('createdBy', 'username').lean();

            const filtered = bookmarks.map(b => {
                const isOwner = b.createdBy._id.equals(userId);
                const isStarred = b.starredBy?.some(id => id.equals(userId)) || false;

                return {
                    _id: b._id,
                    title: b.title,
                    url: b.url,
                    category: b.category,
                    public: b.public,
                    tags: b.tags,
                    description: b.description,
                    createdBy: b.createdBy,  // populated with username
                    createdAt: b.createdAt,
                    updatedAt: b.updatedAt,
                    isStarred: isStarred,
                    ...(isOwner && { starredBy: b.starredBy })  // only owner sees who starred
                };
            });

            return res.json(filtered);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting bookmarks.',
                error: err
            });
        }
    },

    /**
     * BookmarkController.show()
     */
    show: async function (req, res) {
        try {
            const userId = req.user._id;
            const id = req.params.id;

            const bookmark = await BookmarkModel.findOne({_id: id, createdBy: userId}).exec();

            if (!bookmark) {
                return res.status(404).json({
                    message: 'No such bookmark or you do not have access to it'
                });
            }

            return res.json(bookmark);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting bookmark.',
                error: err
            });
        }
    },

    /**
     * BookmarkController.create()
     */
    create: async function (req, res) {
        try {
            const userId = req.user._id;

            const bookmark = new BookmarkModel({
                title: req.body.title,
                url: req.body.url,
                category: req.body.category,
                tags: req.body.tags,
                description: req.body.description,
                createdBy: userId
            });

            const savedBookmark = await bookmark.save();
            return res.status(201).json(savedBookmark);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when creating bookmark',
                error: err
            });
        }
    },

    /**
     * BookmarkController.update()
     */
    update: async function (req, res) {
        try {
            const id = req.params.id;
            const bookmark = await BookmarkModel.findOne({_id: id}).exec();

            if (!bookmark) {
                return res.status(404).json({
                    message: 'No such Bookmark'
                });
            }

            // Update fields only if provided in req.body
            bookmark.title = req.body.title ?? bookmark.title;
            bookmark.url = req.body.url ?? bookmark.url;
            bookmark.category = req.body.category ?? bookmark.category;
            bookmark.tags = req.body.tags ?? bookmark.tags;
            bookmark.description = req.body.description ?? bookmark.description;
            bookmark.createdAt = req.body.createdAt ?? bookmark.createdAt;

            const updatedBookmark = await bookmark.save();
            return res.json(updatedBookmark);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when updating Bookmark.',
                error: err
            });
        }
    },

    /**
     * BookmarkController.remove()
     */
    remove: async function (req, res) {
        try {
            const id = req.params.id;
            await BookmarkModel.findByIdAndRemove(id).exec();
            return res.status(204).json();
        } catch (err) {
            return res.status(500).json({
                message: 'Error when deleting the Bookmark.',
                error: err
            });
        }
    },
    explore: async function (req, res) {
        try {
            const userId = req.user?._id;
            const publicBookmarks = await BookmarkModel.find({public: true})
                .populate('createdBy', 'username')
                .lean();

            const filtered = publicBookmarks.map(b => {
                const isStarred = userId ? (b.starredBy || []).some(id => id.toString() === userId.toString()) : false;

                return {
                    _id: b._id,
                    title: b.title,
                    url: b.url,
                    category: b.category,
                    public: b.public,
                    tags: b.tags,
                    description: b.description,
                    createdBy: b.createdBy,
                    createdAt: b.createdAt,
                    updatedAt: b.updatedAt,
                    isStarred: isStarred
                };
            });

            return res.json(filtered);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting public bookmarks.',
                error: err
            });
        }
    },
    star: async function (req, res) {
        const userId = req.user._id;
        const bookmarkId = req.params.id;

        try {
            const bookmark = await BookmarkModel.findById(bookmarkId);
            if (!bookmark) {
                return res.status(404).json({message: 'Bookmark not found'});
            }

            if (!bookmark.starredBy.includes(userId)) {
                bookmark.starredBy.push(userId);
                await bookmark.save();
            }

            return res.json({message: 'Bookmark starred', bookmark});
        } catch (err) {
            return res.status(500).json({message: 'Error starring bookmark', error: err});
        }
    },

    unstar: async function (req, res) {
        const userId = req.user._id;
        const bookmarkId = req.params.id;

        try {
            const bookmark = await BookmarkModel.findById(bookmarkId);
            if (!bookmark) {
                return res.status(404).json({message: 'Bookmark not found'});
            }

            bookmark.starredBy = bookmark.starredBy.filter(id => id.toString() !== userId.toString());
            await bookmark.save();

            return res.json({message: 'Bookmark unstarred', bookmark});
        } catch (err) {
            return res.status(500).json({message: 'Error unstarring bookmark', error: err});
        }
    },
    exploreById: async function (req, res) {
        try {
            const bookmarkId = req.params.id;

            // Find bookmark by ID that is public
            const bookmark = await BookmarkModel.findOne({ _id: bookmarkId, public: true })
                .populate('createdBy', 'username')
                .lean();

            if (!bookmark) {
                return res.status(404).json({ message: 'Public bookmark not found' });
            }

            // Don't expose starredBy or other sensitive info
            return res.json({
                _id: bookmark._id,
                title: bookmark.title,
                url: bookmark.url,
                category: bookmark.category,
                public: bookmark.public,
                tags: bookmark.tags,
                description: bookmark.description,
                createdBy: bookmark.createdBy,
                createdAt: bookmark.createdAt,
                updatedAt: bookmark.updatedAt,
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting public bookmark.',
                error: err,
            });
        }
    }
};
