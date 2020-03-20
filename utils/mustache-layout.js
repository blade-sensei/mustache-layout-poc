async function build(res, layers) {
    let previousLayer = '';
    let combinedLayout = '';
    for (layer of layers ) {
        const { name: layerName, ...layerData } = layer;
        if (!layerData) layerData = {};
        layerData.child = previousLayer;
        combinedLayout = await render(res, layerName, layerData);
        previousLayer = combinedLayout
    }

    return combinedLayout;
}

const render = (res, viewName, data) => {
    return new Promise((s, f) => {
        res.render(viewName, data, (err, html) => {
            s(html);
        })
    })
}

module.exports = {
    build
};

