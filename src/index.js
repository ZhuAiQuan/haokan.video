const Koa = require('koa');
const parser = require('koa-bodyparser');
const cors = require('koa-cors');
const router = require('./routes');

const app = new Koa();
app.use(parser()).use(cors());
app.use(router.routes());
app.use(async ctx => {
  ctx.body = '好看视频 api解析'
})
app.on('error', (err, ctx) => {
  console.log(err, ctx)
})

function run(port = 9000) {
  app.listen(port, () => {
    console.log(`[server]: running at http://localhost:${port}`)
  })
}

module.exports = run