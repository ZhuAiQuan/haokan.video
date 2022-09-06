const Router = require("koa-router");
const { getRecomment } = require('../../modules')
const recomment = new Router();

recomment.get('/', async ctx => {
  const params = {
    tab: 'recomment',
    pageSize: 20,
    shuaxin_id: '',
  }
  for(const key in ctx.request.query) {
    params[key] = ctx.request.query[key]
  }
  const data = await getRecomment(params);
  ctx.body = data
});

module.exports = recomment