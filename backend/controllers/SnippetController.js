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
    list: async function (req, res) {
        try {
            const snippets = await SnippetModel.find().exec();
            return res.json(snippets);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting Snippet.',
                error: err
            });
        }
    },

    /**
     * SnippetController.show()
     */
    show: async function (req, res) {
        try {
            const id = req.params.id;
            const snippet = await SnippetModel.findOne({ _id: id }).exec();

            if (!snippet) {
                return res.status(404).json({
                    message: 'No such Snippet'
                });
            }

            return res.json(snippet);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting Snippet.',
                error: err
            });
        }
    },

    /**
     * SnippetController.create()
     */
    create: async function (req, res) {
        try {
            const snippet = new SnippetModel({
                title: req.body.title,
                code: req.body.code,
                language: req.body.language,
                description: req.body.description,
                tags: req.body.tags,
                createdAt: req.body.createdAt,
                createdBy: req.body.createdBy
            });

            const savedSnippet = await snippet.save();
            return res.status(201).json(savedSnippet);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when creating Snippet',
                error: err
            });
        }
    },

    /**
     * SnippetController.update()
     */
    update: async function (req, res) {
        try {
            const id = req.params.id;
            const snippet = await SnippetModel.findOne({ _id: id }).exec();

            if (!snippet) {
                return res.status(404).json({
                    message: 'No such Snippet'
                });
            }

            snippet.title = req.body.title ?? snippet.title;
            snippet.code = req.body.code ?? snippet.code;
            snippet.language = req.body.language ?? snippet.language;
            snippet.description = req.body.description ?? snippet.description;
            snippet.tags = req.body.tags ?? snippet.tags;
            snippet.createdAt = req.body.createdAt ?? snippet.createdAt;
            snippet.createdBy = req.body.createdBy ?? snippet.createdBy;

            const updatedSnippet = await snippet.save();
            return res.json(updatedSnippet);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when updating Snippet.',
                error: err
            });
        }
    },

    /**
     * SnippetController.remove()
     */
    remove: async function (req, res) {
        try {
            const id = req.params.id;
            await SnippetModel.findByIdAndRemove(id).exec();
            return res.status(204).json();
        } catch (err) {
            return res.status(500).json({
                message: 'Error when deleting the Snippet.',
                error: err
            });
        }
    }
};
