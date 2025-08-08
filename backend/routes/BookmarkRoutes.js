var express = require('express');
var router = express.Router();
var BookmarkController = require('../controllers/BookmarkController.js');

const {requireAuth, requireNotAuth} = require('../middleware/auth');


router.get('/', requireAuth, BookmarkController.list);
router.get('/explore', BookmarkController.explore);

router.get('/explore/:id', BookmarkController.exploreById);
router.get('/:id', requireAuth, BookmarkController.show);


router.post('/add', requireAuth, BookmarkController.create);
router.post('/:id/star', requireAuth, BookmarkController.star);
router.post('/:id/unstar', requireAuth, BookmarkController.unstar);

router.put('/:id/update', requireAuth, BookmarkController.update);


router.delete('/:id/remove', requireAuth, BookmarkController.remove);

module.exports = router;
