const express = require('express');
const contentController = require('./controller/viewer/content.controller');
const indexController = require('./controller/index.controller')
const adminController = require('./controller/admin/admin.router');
const config = require('./config');
const mustacheExpress = require('mustache-express');
const mustacheLayout = require('./utils/mustache-layout');

const app = express();

mustacheLayout.injectLayoutBuilder(app);

// set template engine
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


// serve static files
app.use(express.static('public'));

// adding routes modules
app.use('/', indexController);
app.use('/content', contentController);
app.use('/admin', adminController);
app.use((req, res) => {
  res.send(404);
});

// config server
const port = process.env.PORT || config.server.port;
app.listen(port, () => {
  console.info(`server api is running on : ${port} port ...`);
});


module.exports = app;
