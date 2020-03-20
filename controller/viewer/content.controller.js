const express = require('express');
const articlesMock = require('../../data/article.fake');
const router = express.Router();
const util = require('util');



router.get('/', async (req, res) => {
    const  article = articlesMock[0];
    return res.send('content soon');

});

module.exports = router;