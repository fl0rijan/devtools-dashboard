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
            const prompts = await PromptModel.find().exec();
            return res.json(prompts);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting Prompt.',
                error: err
            });
        }
    },

    /**
     * PromptController.show()
     */
    show: async function (req, res) {
        try {
            const id = req.params.id;
            const prompt = await PromptModel.findOne({ _id: id }).exec();

            if (!prompt) {
                return res.status(404).json({
                    message: 'No such Prompt'
                });
            }

            return res.json(prompt);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting Prompt.',
                error: err
            });
        }
    },

    /**
     * PromptController.create()
     */
    create: async function (req, res) {
        try {
            const prompt = new PromptModel({
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags,
                category: req.body.category,
                language: req.body.language,
                createdAt: req.body.createdAt,
                createdBy: req.body.createdBy
            });

            const savedPrompt = await prompt.save();
            return res.status(201).json(savedPrompt);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when creating Prompt',
                error: err
            });
        }
    },

    /**
     * PromptController.update()
     */
    update: async function (req, res) {
        try {
            const id = req.params.id;
            const prompt = await PromptModel.findOne({ _id: id }).exec();

            if (!prompt) {
                return res.status(404).json({
                    message: 'No such Prompt'
                });
            }

            prompt.title = req.body.title ?? prompt.title;
            prompt.content = req.body.content ?? prompt.content;
            prompt.tags = req.body.tags ?? prompt.tags;
            prompt.category = req.body.category ?? prompt.category;
            prompt.language = req.body.language ?? prompt.language;
            prompt.createdAt = req.body.createdAt ?? prompt.createdAt;
            prompt.createdBy = req.body.createdBy ?? prompt.createdBy;

            const updatedPrompt = await prompt.save();
            return res.json(updatedPrompt);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when updating Prompt.',
                error: err
            });
        }
    },

    /**
     * PromptController.remove()
     */
    remove: async function (req, res) {
        try {
            const id = req.params.id;
            await PromptModel.findByIdAndRemove(id).exec();
            return res.status(204).json();
        } catch (err) {
            return res.status(500).json({
                message: 'Error when deleting the Prompt.',
                error: err
            });
        }
    }
};
