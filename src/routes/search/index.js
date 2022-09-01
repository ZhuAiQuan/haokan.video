const Router = require('koa-router');
const search = new Router();
const { searchWord, hotword } = require('../../modules')

search.get('/', async ctx => {
  ctx.body = `请使用Post请求 参数为query/type/pn/rn`
})
search.post('/', async ctx => {
  const params = {
    query: '',
    type: 'video',
    pn: 1,
    rn: 10
  };
  for(const key in ctx.request.body) {
    params[key] = ctx.request.body[key];
  }
  const data = await searchWord(params);
  ctx.body = {
    ...data
  }
});
search.get('/hot', async ctx => {
  const data = await hotword();
  ctx.body = data
})

module.exports = search;