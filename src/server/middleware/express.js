const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const logger = require('koa-morgan');
const favicon = require('koa-favicon');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const path = require('path');
const passportConfig = require('./passport');
const { DATABASE } = require('../config');

function expressConfig(app) {
  app.use(logger('dev'));
  app.use(serve('public'));

  app.use(bodyParser()); // Default encoding is utf-8
  app.use(favicon(path.join('public', 'favicon.ico')));

  // set session
  app.keys = [DATABASE.REDIS.SECRETKEY];
  const [host, port] = [DATABASE.REDIS.HOST, DATABASE.REDIS.PORT];
  app.use(session({
    store: redisStore({ host, port })
  }));

  // set passport
  passportConfig(app);
}

module.exports = expressConfig;
