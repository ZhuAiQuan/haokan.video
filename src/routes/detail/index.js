const Router = require('koa-router');
const detail = new Router();
const { detail: info, author, aboutRecomment } = require("../../modules");

detail.get('/', async ctx => {
  const data = await info(ctx.request.query.id);
  ctx.body = {
    code: 0,
    data,
    msg: 'success'
  }
});
detail.post('/author', async ctx => {
  const data = await author(ctx.request.body.id);
  ctx.body = {
    ...data,
    code: 0,
    msg: 'success'
  }
});
detail.post('/recomment', async ctx => {
  const params = {
    title: '',
    id: 0
  };
  for(const key in ctx.request.body) {
    params[key] = ctx.request.body[key]
  }
  const data = await aboutRecomment(params);
  ctx.body = {
    ...data,
    code: 0,
    msg: 'success'
  }
})

module.exports = detail;