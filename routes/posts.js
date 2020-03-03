const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');

router.get('/users/posts/new', postsCtrl.new);
router.get('/users/posts', postsCtrl.show);
router.post('/users/posts', postsCtrl.create);

module.exports = router;