const Router = require('koa-router');
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
