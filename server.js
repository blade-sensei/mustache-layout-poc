const express = require('express');
const contentController = require('./controller/content.controller');
const indexController = require('./controller/index.controller')
const config = require('./config');
const mustacheExpress = require('mustache-express');

const app = express();

module.exports = app;

// set template engine
app.engine('html', mustacheExpress());
 app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// serve static files
app.use(express.static('public'));

// adding routes modules
app.use('/', indexController);
app.use('/content', contentController);
app.use((req, res) => {
  res.send(404);
});

// config server
const port = process.env.PORT || config.server.port;
app.listen(port, () => {
  console.info(`server api is running on : ${port} port ...`);
});
