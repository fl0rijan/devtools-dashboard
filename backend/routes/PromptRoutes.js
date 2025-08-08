var express = require('express');
var router = express.Router();
var PromptController = require('../controllers/PromptController.js');
const {requireAuth, requireNotAuth} = require('../middleware/auth');


router.get('/', requireAuth, PromptController.list);
router.get('/explore', PromptController.explore)
router.get('/starred', requireAuth, PromptController.starred)

router.get('/:id', requireAuth, PromptController.show);

router.post('/add', requireAuth, PromptController.create);
router.post('/:id/star', requireAuth, PromptController.star);
router.post('/:id/unstar', requireAuth, PromptController.unstar);

router.put('/:id', requireAuth, PromptController.update);


router.delete('/:id', requireAuth, PromptController.remove);

module.exports = router;
