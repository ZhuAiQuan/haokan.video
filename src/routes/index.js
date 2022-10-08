const Router = require("koa-router");
const recomment = require("./recomment");
const detail = require("./detail");
const like = require("./like");
const search = require("./search");
const top = require("./top");
const tv = require("./tv");
const router = new Router();

router.use("/recomment", recomment.routes(), recomment.allowedMethods());
router.use("/detail", detail.routes(), detail.allowedMethods());
router.use("/like", like.routes(), like.allowedMethods());
router.use("/search", search.routes(), search.allowedMethods());
router.use("/top", top.routes(), top.allowedMethods());
router.use("/tv", tv.routes(), tv.allowedMethods());
// 首页
router.get("/", async (ctx) => {
  ctx.body =
    '<div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">文档地址：<a href="https://zhuaiquan.github.io/haokan.video/#/">传送门</a></div>';
});

module.exports = router;
