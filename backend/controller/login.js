/*
 * @Author: xiaohuolong
 * @Date: 2020-06-11 11:34:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-17 19:39:15
 * @FilePath: /blog-app/backend/controller/login.js
 */ 
const { login } = require('../model/login')
const { err } = require('../middleware/rest')
const { userFilter } = require('../filter/input')

class LoginController {
    async loginIn(ctx, next){
        userFilter(ctx, ['email', 'password'])
        const data = await login({
            email: ctx.vals.email, 
            password: ctx.vals.password
        })
        const token = await ctx.jwt.signToken(data.id, ctx)
        ctx.rest(data)
    }
}

const loginController = new LoginController()
module.exports = {
    loginController,
}