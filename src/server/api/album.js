const Router = require('koa-router');
const db = require('../models');
const multerConfig = require('../middleware/multer');
// const fs = require('fs');

const router = Router({ prefix: '/api/album' });

router.get('/', async (ctx) => {
  const {
    word = '', num = 10
  } = ctx.query;
  const album = await db.Album.findAll({
    where: {
      name: {
        $ilike: `%${word}%`
      }
    },
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

  ctx.body = album;
});

router.post('/', multerConfig('thumbnail'), async (ctx) => {
  const { body } = ctx.request;

  if (ctx.req.file && ctx.req.file.filename) {
    body.thumbnail = ctx.req.file.filename;
  }
  body.contents = JSON.stringify(body.contents);
  db.Album.create(body)
    .then(() => {
      ctx.status = 200;
      ctx.body = 'OK';
    })
    .catch(() => {
      ctx.throw(500);
    });
});

router.get('/song', async (ctx) => {
  const {
    id
  } = ctx.query;

  const song = await db.Album.findOne({
    where: {
      id
    },
    attributes: ['id', 'contents', 'like', 'name', 'createdAt']
  });

  song.contents = JSON.parse(song.contents);
  ctx.body = song;
});

router.get('/like', async (ctx) => {
  console.log(ctx.state);
});

module.exports = router;
