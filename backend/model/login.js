/*
 * @Author: xiaohuolong
 * @Date: 2020-06-11 11:34:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-17 19:29:15
 * @FilePath: /blog-app/backend/model/login.js
 */ 
const { userModel } = require('../model/user')
const { Err } = require('../middleware/rest')

// 登陆校验
const login = async (...arg) => {
    const data = await userModel.getResp(...arg)
    if(data.empty) return Err.req({ message: '密码或者账号不一致' })
    return data
}

module.exports = {
    login,
}