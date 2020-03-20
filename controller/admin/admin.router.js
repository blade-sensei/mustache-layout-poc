const express = require('express');
const router = express.Router();
const editorController = require('./edition/editor.controller');

router.use('/editor', editorController);


module.exports = router;