const Router = require('koa-router');
const fs = require('fs');
const db = require('../models');

const router = Router({
  prefix: '/user',
});

router.get('/create', async ctx => {
  const user = await db.User.create({ email: 'test@test.com', nickname: 'test', password: 'test' });
  ctx.body = user
});

module.exports = router;
