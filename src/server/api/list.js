const Router = require('koa-router');
const db = require('../models');
// const fs = require('fs');

const router = Router({
  prefix: '/list'
});

router.get('/', async ctx => {
  const { word = '', num = 10 } = ctx.query;
  const list = await db.List.findAll(
    {
      where: { name: { $ilike: `%${word}%` } },
      attributes: ['id', 'name', 'detail', 'like', 'createdAt', 'thumbnail'],
      order: [db.Sequelize.fn('RANDOM')],
      // offset: count,
      limit: num,
      include: {
        model: db.User,
        as: 'maker',
        attributes: ['id', 'nickname']
      }
    });

  ctx.body = list;
});

router.get('/song', async ctx => {
  const { id } = ctx.query;

  const song = await db.List.findOne(
    {
      where: { id },
      attributes: ['id', 'songInfo', 'like', 'name', 'createdAt']
    });

  song.songInfo = JSON.parse(song.songInfo);
  ctx.body = song;
});

module.exports = router;
