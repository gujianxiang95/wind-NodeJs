const router = require('koa-router')()
const {SuccessModel,ErrorModel} = require('../model/resModel')
const { getDetail,getLikeStatus,getComments  } = require('../controller/book')

router.prefix('/book')

router.get('/:bid/detail', async (ctx, next)=> {
    const id = ctx.params.bid
    const listData = await getDetail(id)
    ctx.body = new SuccessModel(listData)
})
router.get('/:bid/favor', async (ctx, next)=> {
    const id = ctx.params.bid
    const listData = await getLikeStatus(id)
    ctx.body = new SuccessModel(listData)
})
router.get('/:bid/short_comment', async (ctx, next)=> {
    const id = ctx.params.bid
    let listData = await getComments(id)
    let data = {
        id:id,
        comment:[]
    }
    listData.forEach(item => {
        data.comment.push({
            content:item.content,
            nums:item.nums
        })
    });
    // console.log(listData)
    ctx.body = new SuccessModel(data)
})

module.exports = router
