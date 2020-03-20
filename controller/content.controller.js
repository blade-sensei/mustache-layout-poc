const express = require('express');
const articlesMock = require('../data/article.fake');
const router = express.Router();
const util = require('util');
const mustache = require('mustache');



router.get('/:id?', async (req, res) => {
    const  article = articlesMock[0];
    let render = util.promisify(res.render);
    const html = await build(res);
    console.log(html);
    return res.send(html);

});

async function build(res) {
    let html = '';
    const pages = {
        main: 'editor.view.html',
        'editor.view.html': { parent: 'admin.view.html', data: { title: 'editor title'} },
        'admin.view.html': { parent: 'base.view.html', data: { role: 'admin'} },
        'base.view.html': { data: { logo: 'logo' } }
    }

    let pageToBuildName = pages.main;
    while(pages[pageToBuildName]) {
        let pageToBuildInfo = pages[pageToBuildName];
        pageToBuildInfo.data.content = html;
        html = await rend(res, pageToBuildName, pageToBuildInfo.data);
        pageToBuildName = pageToBuildInfo.parent;
    }
    return html;

}

const rend = (res, view, data) => {
return new Promise((s, f) => {
        res.render(view, data, (err, html) => {
            s(html);
        })
    })
}

module.exports = router;