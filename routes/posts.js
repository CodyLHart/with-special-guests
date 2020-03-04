const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');

router.get('/posts/new', postsCtrl.new);
router.get('/posts', postsCtrl.show);
router.get('/posts/index', postsCtrl.index);
router.get('/posts/:id/edit', postsCtrl.edit);
router.post('/posts', postsCtrl.create);
router.delete('/posts/:id', postsCtrl.delete);
router.put('/posts/:id', postsCtrl.update);

module.exports = router;