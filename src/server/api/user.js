const Router = require('koa-router');
const passport = require('koa-passport');
const db = require('../models');

const router = Router({ prefix: '/api/user' });

router.post('/create', async (ctx) => {
  const { email, password, nickname } = ctx.request.body;

  try {
    const isDuplicate = !!(await db.User.count({ where: { email } }));

    if (isDuplicate > 0) {
      ctx.status = 409;
      ctx.body = { error: 'duplicate email' };
      return;
    }
    const user = await db.User.create({ email, password, nickname });

    ctx.logIn(user);
    ctx.body = { user };
  } catch (error) {
    ctx.throw(500);
  }
});

router.post('/login', (ctx, next) =>
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user || info) {
      ctx.throw(401, info);
    }

    ctx.body = { user };
    return ctx.logIn(user);
  })(ctx, next));

router.get('/logout', (ctx) => {
  ctx.logout();
  ctx.body = 'OK';
});

module.exports = router;
