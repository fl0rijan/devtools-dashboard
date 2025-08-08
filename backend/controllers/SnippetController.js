var SnippetModel = require('../models/SnippetModel.js');

/**
 * SnippetController.js
 *
 * @description :: Server-side logic for managing Snippets.
 */
module.exports = {

    /**
     * SnippetController.list()
     */
    list: function (req, res) {
        SnippetModel.find(function (err, Snippets) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Snippet.',
                    error: err
                });
            }

            return res.json(Snippets);
        });
    },

    /**
     * SnippetController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        SnippetModel.findOne({_id: id}, function (err, Snippet) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Snippet.',
                    error: err
                });
            }

            if (!Snippet) {
                return res.status(404).json({
                    message: 'No such Snippet'
                });
            }

            return res.json(Snippet);
        });
    },

    /**
     * SnippetController.create()
     */
    create: function (req, res) {
        var Snippet = new SnippetModel({
			title : req.body.title,
			code : req.body.code,
			language : req.body.language,
			description : req.body.description,
			tags : req.body.tags,
			createdAt : req.body.createdAt,
			createdBy : req.body.createdBy
        });

        Snippet.save(function (err, Snippet) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Snippet',
                    error: err
                });
            }

            return res.status(201).json(Snippet);
        });
    },

    /**
     * SnippetController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        SnippetModel.findOne({_id: id}, function (err, Snippet) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Snippet',
                    error: err
                });
            }

            if (!Snippet) {
                return res.status(404).json({
                    message: 'No such Snippet'
                });
            }

            Snippet.title = req.body.title ? req.body.title : Snippet.title;
			Snippet.code = req.body.code ? req.body.code : Snippet.code;
			Snippet.language = req.body.language ? req.body.language : Snippet.language;
			Snippet.description = req.body.description ? req.body.description : Snippet.description;
			Snippet.tags = req.body.tags ? req.body.tags : Snippet.tags;
			Snippet.createdAt = req.body.createdAt ? req.body.createdAt : Snippet.createdAt;
			Snippet.createdBy = req.body.createdBy ? req.body.createdBy : Snippet.createdBy;
			
            Snippet.save(function (err, Snippet) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Snippet.',
                        error: err
                    });
                }

                return res.json(Snippet);
            });
        });
    },

    /**
     * SnippetController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        SnippetModel.findByIdAndRemove(id, function (err, Snippet) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Snippet.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
