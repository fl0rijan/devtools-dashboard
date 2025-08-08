var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController.js');

const {requireAuth, requireNotAuth} = require('../middleware/auth');

router.get('/', UserController.list);
router.get('/show', requireAuth, UserController.showSelf);

//router.get('/:id', UserController.show);


router.post('/register', requireNotAuth, UserController.registerSelf);
router.post('/login', requireNotAuth, UserController.loginSelf);
router.post('/logout', requireAuth, UserController.logoutSelf);

router.put('/:id', UserController.update);


router.delete('/:id', UserController.remove);

module.exports = router;
