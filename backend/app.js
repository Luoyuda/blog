/*
 * @Author: xiaohuolong
 * @Date: 2020-06-10 20:49:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-16 10:11:01
 * @FilePath: /blog-app/backend/app.js
 */ 
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const bouncer = require('koa-bouncer')
const onerror = require('koa-onerror')
const body = require('koa-body')
const logger = require('koa-logger')
const session = require('koa-session')
const rest = require('./middleware/rest')
const { init, checkLogin } = require('./middleware/login')
const { RedisStore } = require('./db/redis.session')
const { COMMON_CONF: { LOGIN_EXPIRE_TIME } } = require('./conf/common')

const index = require('./routes/index')
const api = require('./routes/api/index')

// error handler
onerror(app)
app.keys = ['some secret', 'another secret'];

// middlewares
app.use(body({
  multipart: true,
}))
app.use(bouncer.middleware());
app.use(session({
  store: new RedisStore(),
  maxAge: LOGIN_EXPIRE_TIME
}, app));
// app.use(session(SESS_CONFIG, app));


app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(rest.restify())

// app.use(login())
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

// routes
app.use(init())
app.use(checkLogin.unless({
  path:[/login/, '/']
}))
app.use(index.routes(), index.allowedMethods())
app.use(api.routes(), api.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
