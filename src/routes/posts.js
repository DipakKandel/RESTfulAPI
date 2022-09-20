const express = require('express');
const router = express.Router();
const postController = require('../modules/posts/postController')
const authorization = require("../modules/customer/customerValidations");

router.post('/newpost',authorization.jwtAuthenticate,postController.newPost);
router.get('/articles',authorization.jwtAuthenticate ,postController.articles);





module.exports = router;