var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');

router.get('/', usersCtrl.index);
router.get('/home', usersCtrl.home);
router.get('/profile', usersCtrl.new);
router.get('/edit', usersCtrl.edit)
router.post('/home', usersCtrl.create);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;
