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
    list: function (req, res) {
        PromptModel.find(function (err, Prompts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Prompt.',
                    error: err
                });
            }

            return res.json(Prompts);
        });
    },

    /**
     * PromptController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PromptModel.findOne({_id: id}, function (err, Prompt) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Prompt.',
                    error: err
                });
            }

            if (!Prompt) {
                return res.status(404).json({
                    message: 'No such Prompt'
                });
            }

            return res.json(Prompt);
        });
    },

    /**
     * PromptController.create()
     */
    create: function (req, res) {
        var Prompt = new PromptModel({
			title : req.body.title,
			content : req.body.content,
			tags : req.body.tags,
			category : req.body.category,
			language : req.body.language,
			createdAt : req.body.createdAt,
			createdBy : req.body.createdBy
        });

        Prompt.save(function (err, Prompt) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Prompt',
                    error: err
                });
            }

            return res.status(201).json(Prompt);
        });
    },

    /**
     * PromptController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PromptModel.findOne({_id: id}, function (err, Prompt) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Prompt',
                    error: err
                });
            }

            if (!Prompt) {
                return res.status(404).json({
                    message: 'No such Prompt'
                });
            }

            Prompt.title = req.body.title ? req.body.title : Prompt.title;
			Prompt.content = req.body.content ? req.body.content : Prompt.content;
			Prompt.tags = req.body.tags ? req.body.tags : Prompt.tags;
			Prompt.category = req.body.category ? req.body.category : Prompt.category;
			Prompt.language = req.body.language ? req.body.language : Prompt.language;
			Prompt.createdAt = req.body.createdAt ? req.body.createdAt : Prompt.createdAt;
			Prompt.createdBy = req.body.createdBy ? req.body.createdBy : Prompt.createdBy;
			
            Prompt.save(function (err, Prompt) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Prompt.',
                        error: err
                    });
                }

                return res.json(Prompt);
            });
        });
    },

    /**
     * PromptController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PromptModel.findByIdAndRemove(id, function (err, Prompt) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Prompt.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
