const Router = require('koa-router');
const fs = require('fs');

const router = Router({
  prefix: '/api',
});

router.get('/', async ctx => {
  console.log('test');
  const html = fs.readFileSync('./public/index.html', 'utf8');
  ctx.body = html;
});

module.exports = router;
