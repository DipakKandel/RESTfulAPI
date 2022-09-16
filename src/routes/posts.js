const express = require('express');
const router = express.Router();
const postController = require('../modules/posts/postController')

router.post('/newpost',postController.newPost);
router.get('/articles',postController.articles);





module.exports = router;