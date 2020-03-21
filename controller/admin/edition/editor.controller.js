const express = require('express');
const router = express.Router();

router.get('/edit', async (_, res) => {
    const sections = ['create', 'delete', 'edition', 'analytics']
    const adminData = { sections };
    const baseData = { headTitle: 'Mustache Layout POC'};
    const html = await res.layoutBuilder([
        { name: 'admin/edition/editor.view.html' },
        { name: 'admin/admin.view.html', data : adminData },
        { name:'layout/base.view.html', data: baseData }
    ]);
    return res.send(html);

});

router.post('save', (req, res) => {
    return res.send('save edition');
})

module.exports = router;