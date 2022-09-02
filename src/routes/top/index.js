const Router = require('koa-router');
const top = new Router();
const { list } = require("../../modules")

top.get('/', async ctx => {
  ctx.body = {
    error: '排行榜'
  }
});
top.post('/list', async ctx => {
  const params = {
    type: 'hotperson',
    tab: 'zh',
    _format: 'json',
    page: 1,
    pageSize: 20,
  };
  for(const key in ctx.request.body) {
    params[key] = ctx.request.body[key];
  }
  const data = await list(params);
  ctx.body = {
    ...data,
  }
})

module.exports = top;