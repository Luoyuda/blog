/*
 * @Author: xiaohuolong
 * @Date: 2020-06-13 16:02:21
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-14 08:57:57
 * @FilePath: /blog-app/backend/db/redis.session.js
 */ 
const { redisClient } = require('./redis.js')
class RedisStore{
    constructor() {
        this.redis = redisClient;
    }
    async get(key, maxAge, options) {
        let data = await this.redis.get(key);
        return JSON.parse(data);
    }
    async set(key, sess, maxAge, options) {
        try {
            // Use redis set EX to automatically drop expired sessions
            console.log(`session-time: ${(maxAge/1000)}`)
            await this.redis.set(key, JSON.stringify(sess), 'EX', (maxAge/1000) | 0);
        } catch (e) {
            console.log('redis set error:', e);
        }
        return key;
    }
    async destroy(key) {
        return await this.redis.del(key);
    }
}
module.exports = {
    RedisStore
};