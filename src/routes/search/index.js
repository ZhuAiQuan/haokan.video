const Router = require("koa-router");
const search = new Router();
const { searchWord, hotword } = require("../../modules");

search.get("/", async (ctx) => {
  ctx.state = 500;
  ctx.body = {
    code: 500,
    msg: `请使用Post请求 参数为query/type/pn/rn`,
  };
  // ctx.throw(500, `请使用Post请求 参数为query/type/pn/rn`)
});
search.post("/", async (ctx) => {
  const params = {
    query: "",
    type: "video",
    pn: 1,
    rn: 10,
  };
  for (const key in ctx.request.body) {
    params[key] = ctx.request.body[key];
  }
  if (params.query.length) {
    const data = await searchWord(params);
    ctx.body = {
      ...data,
    };
  } else {
    ctx.body = {
      errno: 500,
      error: '输入关键词!'
    }
  }
});
search.get("/hot", async (ctx) => {
  const data = await hotword();
  ctx.body = data;
});

module.exports = search;
