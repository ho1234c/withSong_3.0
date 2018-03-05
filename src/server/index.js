/* eslint no-console: "off" */
const Koa = require('koa');
const router = require('./api');
const { APP } = require('./config');
const db = require('./models');
const koaConfig = require('./middleware/koa');
const catchError = require('./middleware/catchError');

const app = new Koa();
koaConfig(app);

// error handling
app.use(catchError);

// routing
app.use(router.routes());

// DB sync
(async () => {
  try {
    await db.sequelize.sync();
    console.log('Success to database syncronize');
  } catch (err) {
    console.log('Fail to database syncronize \n', `${err.name} : ${err.message}`);
  }
})();

app.listen(APP.PORT, () => { console.log(`server start on ${APP.PORT} port.`); });

module.exports = app;
