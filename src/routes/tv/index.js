const Router = require('koa-router');
const tv = new Router();
const { detail, tvCategory } = require('../../modules')

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
});

tv.post('/category', async ctx => {
  const { type = 0, pn = 1, rn = 20 } = ctx.request.body;
  const data = await tvCategory(type, pn, rn);
  ctx.body = data
})

module.exports = tv;