const Router = require('koa-router');
const passport = require('koa-passport');
const db = require('../models');

const router = Router({
  prefix: '/user'
});

router.post('/create', async ctx => {
  const { email, password, nickname } = ctx.request.body;

  try {
    const isDuplicate = !!(await db.User.count({ where: { email } }));

    if(isDuplicate > 0) {
      ctx.status = 409;
      ctx.body = { error: 'duplicate email' };
      return;
    }
    const user = await db.User.create({ email, password, nickname });

    ctx.logIn(user);
    ctx.body = { user: user.serialize() };
  }catch(error) {
    ctx.throw(500);
  }
});

router.post('/login', (ctx, next) =>
  passport.authenticate('local', async (err, user, info, status) => {
    if(err) {
      return next(err);
    }
    console.log(user);
    console.log(info);
    if(!user || info) {
      ctx.body = { error: info };
      ctx.throw(401);
    }

    ctx.body = { user: user.serialize() };
    return ctx.logIn(user);
  })(ctx, next)
);

router.get('/logout', ctx => {
  ctx.logout();
  ctx.status = 200;
});

module.exports = router;
