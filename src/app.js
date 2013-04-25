
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./api/routes'),
    user = require('./api/routes/user'),
    http = require('http'),
    path = require('path');

global.logger = require('./api/logger');
var app = express(),
    server = http.createServer(app);
app.configure(function(){
  app.set('port', process.env.PORT || 3001);

  app.set('views', __dirname + '/web/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'web/public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
