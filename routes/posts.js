const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');

router.get('/posts', isLoggedIn, postsCtrl.show);
router.get('/posts/new', isLoggedIn, postsCtrl.new);
router.get('/posts/index', isLoggedIn, postsCtrl.index);
router.get('/posts/:id', isLoggedIn, postsCtrl.view);
router.get('/posts/:id/edit', isLoggedIn, postsCtrl.edit);
router.get('/posts/:id/view', isLoggedIn, postsCtrl.viewMine);
router.put('/posts/:id/submit', isLoggedIn, postsCtrl.submit);
router.post('/posts', isLoggedIn, postsCtrl.create);
router.delete('/posts/:id', isLoggedIn, postsCtrl.delete);
router.put('/posts/:id', isLoggedIn, postsCtrl.update);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
  }

module.exports = router;