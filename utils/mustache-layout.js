/**
 * Layer
 * @typedef {Object} Layer of html
 * @property {string} layer name, this is the path to the view - myview.html
 * @property {object} [data] optionals - the properties add will be considered and passed to the build of the view
 */

/**
 * 
 * @param {Layer[]} layers
 * @async
 */
async function buildLeyout(layers) {
    const app = this.req.app;
    let previousLayer = '';
    let combinedLayout = '';
    for (layer of layers ) {
        let { name: layerName, data: layerData } = layer;
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

/**
 * 
 * @param {ExpressApp} app express app instance 
 */
function injectLayoutBuilder(app) {
    Reflect.set(app.response, 'layoutBuilder', buildLeyout )
}

module.exports = injectLayoutBuilder;
