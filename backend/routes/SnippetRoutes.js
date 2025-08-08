var express = require('express');
var router = express.Router();
var SnippetController = require('../controllers/SnippetController.js');
const {requireAuth, requireNotAuth} = require('../middleware/auth');


router.get('/', requireAuth, SnippetController.list);
router.get('/starred', requireAuth, SnippetController.listStarred);
router.get('/explore', SnippetController.explore);

router.get('/:id', requireAuth, SnippetController.show);


router.post('/add', requireAuth, SnippetController.create);
router.post('/:id/star', requireAuth, SnippetController.star);
router.post('/:id/unstar', requireAuth, SnippetController.unstar);


router.put('/:id', requireAuth, SnippetController.update);


router.delete('/:id', requireAuth, SnippetController.remove);

module.exports = router;
