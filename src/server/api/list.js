const Router = require('koa-router');
// const fs = require('fs');

const router = Router({
  prefix: '/list'
});

router.get('/', async ctx => {
  // console.log('test');
  // const html = fs.readFileSync('./public/index.html', 'utf8');
  console.log(ctx.query);
  ctx.body = { list: 'test list' };
});

module.exports = router;
