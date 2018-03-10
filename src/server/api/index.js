/* eslint global-require: "off" */
/* eslint import/no-dynamic-require: "off" */

const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

const db = require('../models');

const basename = path.basename(module.filename);
const router = Router();
const indexPage = fs.readFileSync(('public/index.html'), 'utf8');

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const route = require(path.join(__dirname, file));
    router.use(route.routes(), route.allowedMethods());
  });

router.get('/', async (ctx) => {
  ctx.body = indexPage;
});

router.get('/api/session', async (ctx) => {
  const { user } = ctx.session.passport;
  let info = '';
  if (user) {
    info = await db.User.findOne({
      where: { id: user.id },
      include: [
        { model: db.Album, as: 'albumFavor', attributes: ['id', 'name'] },
        { model: db.Comment, as: 'commentFavor', attributes: ['id'] }
      ]
    });
  }
  ctx.body = info;
});

module.exports = router;
