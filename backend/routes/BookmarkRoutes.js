var express = require('express');
var router = express.Router();
var BookmarkController = require('../controllers/BookmarkController.js');

/*
 * GET
 */
router.get('/', BookmarkController.list);

/*
 * GET
 */
router.get('/:id', BookmarkController.show);

/*
 * POST
 */
router.post('/', BookmarkController.create);

/*
 * PUT
 */
router.put('/:id', BookmarkController.update);

/*
 * DELETE
 */
router.delete('/:id', BookmarkController.remove);

module.exports = router;
