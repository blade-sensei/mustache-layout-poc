const express = require('express');
const router = express.Router();
const mustacheLayout = require('../../../utils/mustache-layout');

router.get('/edit', async (req, res) => {
    const sections = ['create', 'delete', 'edition', 'analytics']
    const pages = {
        main: 'admin/edition/editor.view.html',
        'admin/edition/editor.view.html': { parent: 'admin/admin.view.html', data: {} },
        'admin/admin.view.html': { parent: 'layout/base.view.html', data: { sections } },
        'layout/base.view.html': { data: { headTitle: 'Mustache Layout POC' } }
    }
    const html = await mustacheLayout.build(res, pages);
    return res.send(html);

});

router.post('save', (req, res) => {
    return res.send('save edition');
})

module.exports = router;