const router = require('koa-router')()
const {SuccessModel,ErrorModel} = require('../model/resModel')
const { getDetail,getLikeStatus,getComments,postComment,getHot,getSearch } = require('../controller/book')

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

router.post('/add/short_comment', async (ctx, next)=> {
    const id =  ctx.request.body.book_id
    const content =  ctx.request.body.content
    console.log(id,content)
    const listData = await postComment(id,content)
   
    ctx.body = new SuccessModel(listData)
})

router.get('/hot_keyword', async (ctx, next)=> {
    const listData = await getHot()
    ctx.body = new SuccessModel(listData)
})

router.get('/search', async (ctx, next)=> {
    let q =  ctx.request.query.q
    let start =  ctx.request.query.start
    const listData = await getSearch(q,start)
    ctx.body = new SuccessModel(listData)
})

module.exports = router