var express = require('express');
var router = express.Router();
var PromptController = require('../controllers/PromptController.js');

/*
 * GET
 */
router.get('/', PromptController.list);

/*
 * GET
 */
router.get('/:id', PromptController.show);

/*
 * POST
 */
router.post('/', PromptController.create);

/*
 * PUT
 */
router.put('/:id', PromptController.update);

/*
 * DELETE
 */
router.delete('/:id', PromptController.remove);

module.exports = router;
