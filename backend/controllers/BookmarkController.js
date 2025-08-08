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
    list: function (req, res) {
        BookmarkModel.find(function (err, Bookmarks) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Bookmark.',
                    error: err
                });
            }

            return res.json(Bookmarks);
        });
    },

    /**
     * BookmarkController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        BookmarkModel.findOne({_id: id}, function (err, Bookmark) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Bookmark.',
                    error: err
                });
            }

            if (!Bookmark) {
                return res.status(404).json({
                    message: 'No such Bookmark'
                });
            }

            return res.json(Bookmark);
        });
    },

    /**
     * BookmarkController.create()
     */
    create: function (req, res) {
        var Bookmark = new BookmarkModel({
			title : req.body.title,
			url : req.body.url,
			category : req.body.category,
			tags : req.body.tags,
			description : req.body.description,
			createdAt : req.body.createdAt
        });

        Bookmark.save(function (err, Bookmark) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Bookmark',
                    error: err
                });
            }

            return res.status(201).json(Bookmark);
        });
    },

    /**
     * BookmarkController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        BookmarkModel.findOne({_id: id}, function (err, Bookmark) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Bookmark',
                    error: err
                });
            }

            if (!Bookmark) {
                return res.status(404).json({
                    message: 'No such Bookmark'
                });
            }

            Bookmark.title = req.body.title ? req.body.title : Bookmark.title;
			Bookmark.url = req.body.url ? req.body.url : Bookmark.url;
			Bookmark.category = req.body.category ? req.body.category : Bookmark.category;
			Bookmark.tags = req.body.tags ? req.body.tags : Bookmark.tags;
			Bookmark.description = req.body.description ? req.body.description : Bookmark.description;
			Bookmark.createdAt = req.body.createdAt ? req.body.createdAt : Bookmark.createdAt;
			
            Bookmark.save(function (err, Bookmark) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Bookmark.',
                        error: err
                    });
                }

                return res.json(Bookmark);
            });
        });
    },

    /**
     * BookmarkController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        BookmarkModel.findByIdAndRemove(id, function (err, Bookmark) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Bookmark.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
