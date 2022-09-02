const Router = require('koa-router');
const tv = new Router();
const { detail } = require('../../modules')

tv.get('/', async ctx => {
  ctx.body = {
    error: 'tv电视剧...'
  }
});

tv.post('/detail', async ctx => {
  const id = ctx.request.body.id;
  if (id) {
    const data = await detail(id);
    ctx.body = data;
  } else {
    ctx.body = {
      errno: 500,
      error: '缺少剧集id'
    }
  }
})

module.exports = tv;