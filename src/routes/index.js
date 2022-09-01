const Router = require('koa-router');
const recomment = require('./recomment');
const detail = require('./detail');
const like = require('./like');
const search = require('./search');
const router = new Router();

router.use('/recomment', recomment.routes(), recomment.allowedMethods());
router.use('/detail', detail.routes(), detail.allowedMethods());
router.use('/like', like.routes(), like.allowedMethods());
router.use('/search', search.routes(), search.allowedMethods());

module.exports = router;