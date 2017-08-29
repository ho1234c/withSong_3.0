const Router = require('koa-router');
const db = require('../models');
// const fs = require('fs');

const router = Router({
  prefix: '/list'
});

router.get('/', async ctx => {
  const { word, num } = ctx.query;
  const list = await db.List.findAll(
    {
      where: { name: { $ilike: `%${word}%` } },
      attributes: ['id', 'name', 'detail', 'like', 'createdAt', 'thumbnail'],
      order: [db.Sequelize.fn('RANDOM')],
      // offset: count,
      // limit: 10,
      include: {
        model: db.User,
        as: 'maker',
        attributes: ['id', 'nickname']
      }
    });

  ctx.body = list;
});

module.exports = router;
