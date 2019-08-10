const router = require('koa-router')()
const {SuccessModel,ErrorModel} = require('../model/resModel')
const { isLike  } = require('../controller/like')

router.prefix('/like')


router.post('/like', async (ctx, next)=> {
    let id = ctx.request.body.artID
    let behavior = ctx.request.body.behavior
    behavior = behavior === 'like'?1:0
    const listData = await isLike(id,behavior)
    ctx.body = new SuccessModel(listData)
})
router.post('/cancel', async (ctx, next)=> {
    let id = ctx.request.body.artID
    let behavior = ctx.request.body.behavior
    behavior = behavior === 'like'?1:0
    const listData = await isLike(id,behavior)
    ctx.body = new SuccessModel(listData)
})



module.exports = router
