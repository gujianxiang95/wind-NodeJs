const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
//引入morgan写日志
const fs = require('fs')
const path = require('path')
const morgan = require('koa-morgan')
const index = require('./routes/index')
const users = require('./routes/users')
//引入session和redis做临时存储
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF }   =require('./conf/db')

const magazine = require('./routes/magazine')
const like = require('./routes/like')
const book = require('./routes/book')
// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
//根据环境判断
const ENV = process.env.NODE_ENV
if(ENV === 'development'){
  const fileName = path.join(__dirname,'logs','access.log')
  const writeStream = fs.createWriteStream(fileName,{
    flags:'a'
  })
  app.use(morgan('combined',{
    stream:writeStream
  }))
}else{
  app.use(morgan('dev'));
}

//session配置
app.keys = ['s1A1Gd/_a']
app.use(session({
  cookie:{
    path:'/',
    httpOnly:true,
    maxAge:24*60*60
  },
   //配置Redismj
  store:redisStore({
    all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(magazine.routes(), magazine.allowedMethods())
app.use(like.routes(), like.allowedMethods())
app.use(book.routes(), book.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
module.exports = app