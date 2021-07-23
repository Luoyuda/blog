/*
 * @Author: xiaohuolong
 * @Date: 2020-06-12 16:48:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-17 20:55:05
 * @FilePath: /blog-app/backend/db/cache/category.js
 */ 
const { redisClient } = require('../redis')
const { BaseCache } = require('../../utils/db.tools.js')
class CategoryCache extends BaseCache {
    constructor(...arg){
        super(...arg)
    }
}
const prefix = 'u_c_'
const categoryCache = new CategoryCache(redisClient, prefix)
module.exports = {
    categoryCache
}