const express = require('express');
const router = express.Router();

router.get('/edit', async (_, res) => {
    const sections = ['create', 'delete', 'edition', 'analytics']
    const html = await res.build([
        { name: 'admin/edition/editor.view.html' },
        { name: 'admin/admin.view.html', sections },
        { name:'layout/base.view.html', headTitle: 'Mustache Layout POC' }
    ]);
    return res.send(html);

});

router.post('save', (req, res) => {
    return res.send('save edition');
})

module.exports = router;