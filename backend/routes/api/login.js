/*
 * @Author: xiaohuolong
 * @Date: 2020-06-10 22:41:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-17 19:37:07
 * @FilePath: /blog-app/backend/routes/api/login.js
 */ 
const router = require('koa-router')()
const { loginController: { loginIn } } = require('../../controller/login')

router.post('/', loginIn)

module.exports = router
