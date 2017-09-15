const Koa = require('koa');
const router = require('./api');
const { APP } = require('./config');
const db = require('./models');
const expressConfig = require('./middleware/express');

const app = new Koa();
expressConfig(app);

// routing
app.use(router.routes(), router.allowedMethods());

// DB sync
(async () => {
  try {
    await db.sequelize.sync();
    console.log('Success to database syncronize');
  }catch(err) {
    console.log('Fail to database syncronize \n', `${err.name} : ${err.message}`);
  }
})();

app.listen(APP.PORT, () => { console.log(`server start on ${APP.PORT} port.`); });

module.exports = app;
