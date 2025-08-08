var express = require('express');
var router = express.Router();
var SnippetController = require('../controllers/SnippetController.js');

/*
 * GET
 */
router.get('/', SnippetController.list);

/*
 * GET
 */
router.get('/:id', SnippetController.show);

/*
 * POST
 */
router.post('/', SnippetController.create);

/*
 * PUT
 */
router.put('/:id', SnippetController.update);

/*
 * DELETE
 */
router.delete('/:id', SnippetController.remove);

module.exports = router;
