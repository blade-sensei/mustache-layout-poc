async function build(res, pages) {
    let html = '';
    let pageToBuildName = pages.main;
    while(pages[pageToBuildName]) {
        let pageToBuildInfo = pages[pageToBuildName];
        pageToBuildInfo.data.content = html;
        html = await render(res, pageToBuildName, pageToBuildInfo.data);
        pageToBuildName = pageToBuildInfo.parent;
    }
    return html;

}

const render = (res, view, data) => {
    return new Promise((s, f) => {
        res.render(view, data, (err, html) => {
            s(html);
        })
    })
}

module.exports = {
    build
};

