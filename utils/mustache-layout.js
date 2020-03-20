async function buildLeyout(layers) {
    const app = this.req.app;
    let previousLayer = '';
    let combinedLayout = '';
    for (layer of layers ) {
        const { name: layerName, ...layerData } = layer;
        if (!layerData) layerData = {};
        layerData.child = previousLayer;
        combinedLayout = await renderHtml(layerName, layerData, app);
        previousLayer = combinedLayout
    }

    return combinedLayout;
}

function renderHtml(viewName, data, expressInstance) {
    return new Promise((s, f) => {
        expressInstance.render(viewName, data, (error, html) => {
            if (error) f(error)
            s(html);
        })
    })
}

function injectLayoutBuilder(app) {
    app.response.buildLeyout = buildLeyout;
}

module.exports = {
    injectLayoutBuilder
}
