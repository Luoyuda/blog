/*
 * @Author: xiaohuolong
 * @Date: 2020-06-10 22:41:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-14 18:34:20
 * @FilePath: /blog-app/backend/routes/index.js
 */ 
const router = require('koa-router')()
const { exec } = require('../db/mysql')
const { redisClient } = require('../db/redis')

router.get('/', async (ctx, next) => {
	await ctx.render('index', {
		title: ctx.session.uid
	})
})

router.get('/string', async (ctx, next) => {
	ctx.body = 'koa2 string'
})

// router.get('/json', async (ctx, next) => {
//   const value = await redisClient.getAsync('key6')
//   const data = await exec('select ?? from ??', [['studentname', 'studentno'],'student'])
//   ctx.body = {
//     data
//   }
// })

module.exports = router
