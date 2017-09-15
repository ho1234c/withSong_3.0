const Router = require('koa-router');
const passport = require('koa-passport');
const db = require('../models');

const router = Router({
  prefix: '/user'
});

router.get('/create', async ctx => {
  let res;

  try {
    res = await db.User.create({ email: 'test@test.com', nickname: 'test', password: 'test' });
    console.log('test');
  }catch(error) {
    console.log(error);
  }
  ctx.body = res;
});

router.post('/login', (ctx, next) => passport.authenticate('local', async (err, user, info, status) => {
  if(err) {
    return next(err);
  }
  if(!user || info) {
    ctx.status = 400;
    ctx.body = { error: info };
  }
  const userData = {
    id: user.id,
    nickname: user.nickname,
    email: user.email,
    list: user.listFavor,
    comment: user.commentFavor
  };
  ctx.logIn(userData);
  ctx.body = { user: userData };
})(ctx, next));

router.get('/destroy', async ctx => {
  let res;
  try {
    const user = await db.User.find({ email: 'test@test.com' });
    await user.destroy();
  }catch(error) {
    res = error;
  }

  ctx.body = res;
});

module.exports = router;
