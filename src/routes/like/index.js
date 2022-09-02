const Router = require('koa-router');
const like = new Router();
const { videolandfeed } = require('../../modules')

like.get('/', async ctx => {
  const data = await videolandfeed();
  ctx.body = {
    ...data,
  }
})

module.exports = like;