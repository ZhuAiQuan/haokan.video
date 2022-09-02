const Router = require("koa-router");
const detail = new Router();
const { detail: info, author, aboutRecomment } = require("../../modules");

detail.get("/", async (ctx) => {
  if (ctx.request.query.id) {
    const data = await info(ctx.request.query.id);
    ctx.body = {
      ...data,
    };
  } else {
    ctx.body = {
      errno: 500,
      error: "缺少参数！",
    };
  }
});
detail.post("/author", async (ctx) => {
  if (ctx.request.body.id) {
    const data = await author(ctx.request.body.id);
    ctx.body = {
      ...data,
    };
  } else {
    ctx.body = {
      errno: 500,
      error: "缺少参数！",
    };
  }
});
detail.post("/recomment", async (ctx) => {
  const params = {
    title: "",
    id: 0,
  };
  for (const key in ctx.request.body) {
    params[key] = ctx.request.body[key];
  }
  if (params.title && params.id) {
    const data = await aboutRecomment(params);
    ctx.body = {
      ...data,
    };
  } else {
    ctx.body = {
      errno: 500,
      error: "缺少参数！",
    };
  }
});

module.exports = detail;
