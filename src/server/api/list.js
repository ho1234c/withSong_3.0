const Router = require('koa-router');
const db = require('../models');
// const fs = require('fs');

const router = Router({
  prefix: '/list'
});

router.get('/', async ctx => {
  // console.log('test');
  // const html = fs.readFileSync('./public/index.html', 'utf8');
  const scope = '';
  const word = '';
  const list = await db.List.findAll(
    {
      // where: { name: { $ilike: `%${scope == 'listname' ? word : ''}%` } },
      attributes: ['id', 'name', 'detail', 'like', 'createdAt', 'thumbnail'],
      // order: [[order, 'DESC']],
      // offset: count,
      limit: 10,
      include: {
        model: db.User,
        as: 'maker',
        where: {
          nickname: { $ilike: `%${scope === 'nickname' ? word : ''}%` } 
        },
        attributes: ['id', 'nickname'] 
      }
    });
  // console.log(list);
  ctx.body = list;
});

module.exports = router;
