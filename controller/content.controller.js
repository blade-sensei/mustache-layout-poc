const express = require('express');
const articlesMock = require('../data/article.fake');
const router = express.Router();
const util = require('util');
const mustache = require('mustache');



router.get('/:id?', async (req, res) => {
    const  article = articlesMock[0];
    let render = util.promisify(res.render);
    const data = { title: 'this is content'}
    const content = await rend(res, 'content.view.html', data)
    
    return res.render('base.view.html', { content })
    
    const editor = await render(res, 'editor.view.html', data)

});

async function build(res) {
    const html = '';
    const pages = {
        'editor.view.html': { parent: 'admin.view.html', data: {} },
        'admin.view.html': { parent: 'base.view.html', data: {} }
    }

    for (let page in pages) {
        const pageInfo = pages[page];
        let content = await render(res, page, pageInfo.data);
        html = await render(res, pageInfo.parent, { content } )
    }

}

const rend = (res, view, data) => {
return new Promise((s, f) => {
        res.render(view, data, (err, html) => {
            s(html);
        })
    })
}

module.exports = router;