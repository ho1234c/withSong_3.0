const Koa = require('koa');
require('dotenv').config({ path: './config/.env' });
const logger = require('koa-morgan');
const serve = require('koa-static');
const router = require('./api');
const CONFIG = require('./config');
const db = require('./models');

const app = new Koa();

app.use(logger('dev'));
app.use(serve('public'));

/* app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
}); */

app.use(router.routes(), router.allowedMethods());

(async () => {
  try {
    await db.sequelize.sync();
    console.log('Success to database syncronize');
  }catch(err) {
    console.log('Fail to database syncronize \n', `${err.name} : ${err.message}`);
  }
})();

app.listen(CONFIG.INFO.PORT, () => { console.log(`server start on ${CONFIG.INFO.PORT} port.`); });

module.exports = app;
