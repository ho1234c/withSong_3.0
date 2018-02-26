/* eslint global-require: "off" */
/* eslint import/no-dynamic-require: "off" */

const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

const basename = path.basename(module.filename);
const router = Router({ prefix: '/api' });

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const route = require(path.join(__dirname, file));
    router.use(route.routes(), route.allowedMethods());
  });

module.exports = router;
