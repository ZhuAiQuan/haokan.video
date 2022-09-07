const Koa = require("koa");
const parser = require("koa-bodyparser");
const cors = require("koa-cors");
const router = require("./routes");
const static = require("koa-static");
const path = require("node:path");

const app = new Koa();
app.use(parser()).use(cors());
app.use(router.routes());
app.use(async (ctx) => {
  ctx.body =
    '<div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">文档地址：<a href="https://zhuaiquan.github.io/haokan.video/#/">传送门</a></div>';
});
app.use(static(path.join(__dirname, "../public")));

app.on("error", (err, ctx) => {
  console.log(err, ctx);
});

function run(port = 9000) {
  app.listen(port, () => {
    console.log(`[server]: running at http://localhost:${port}`);
  });
}

module.exports = run;
