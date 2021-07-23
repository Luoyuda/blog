/*
 * @Author: xiaohuolong
 * @Date: 2020-06-12 16:48:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-17 09:46:00
 * @FilePath: /blog-app/backend/db/cache/tag.js
 */ 
const { redisClient } = require('../redis')
const { BaseCache } = require('../../utils/db.tools.js')
class TagCache extends BaseCache {
    constructor(...arg){
        super(...arg)
    }
}
const prefix = 'u_t_'
const tagCache = new TagCache(redisClient, prefix)
module.exports = {
    tagCache
}