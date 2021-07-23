/*
 * @Author: xiaohuolong
 * @Date: 2020-06-12 16:48:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-17 09:35:16
 * @FilePath: /blog-app/backend/db/cache/user.js
 */ 
const { redisClient } = require('../redis')
const { BaseCache } = require('../../utils/db.tools.js')
class UserCache extends BaseCache {
    constructor(...arg){
        super(...arg)
    }
}
const prefix = 'u_d_'
const userCache = new UserCache(redisClient, prefix)
module.exports = {
    userCache
}