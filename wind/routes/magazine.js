const router = require('koa-router')()
const {SuccessModel,ErrorModel} = require('../model/resModel')
const { getLatest,getPre ,getNext,getFavor,getHotList } = require('../controller/magazine')
router.prefix('/classic')

router.get('/latest', async (ctx, next)=> {
    const listData = await getLatest()
    ctx.body = new SuccessModel(listData)
})

router.get('/:index/previous', async (ctx, next)=> {
    // console.log(ctx.params)
    const index = ctx.params.index
    // console.log(index)
    const listData = await getPre(index)
    ctx.body = new SuccessModel(listData)
})
router.get('/:index/next', async (ctx, next)=> {
    // console.log(ctx.params)
    const index = ctx.params.index
    // console.log(index)
    const listData = await getNext(index)
    ctx.body = new SuccessModel(listData)
})


router.get('/:category/:artID/favor', async (ctx, next)=> {
    // console.log(ctx.params)
    const id = ctx.params.artID
    // console.log(index)
    const listData = await getFavor(id)
    ctx.body = new SuccessModel(listData)
})
router.get('/hot_list', async (ctx, next)=> {
    const listData = await getHotList()
    ctx.body = new SuccessModel(listData)
})



module.exports = router
