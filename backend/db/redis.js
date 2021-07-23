/*
 * @Author: xiaohuolong
 * @Date: 2020-06-10 23:01:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-14 08:57:36
 * @FilePath: /blog-app/backend/db/redis.js
 */ 
// const redis = require('redis')
const redis = require('ioredis');
const bluebird = require('bluebird')
const print = redis.print
const { REDIS_CONF } = require('../conf/db')
console.log(REDIS_CONF)
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host, {auth_pass:REDIS_CONF.password})

// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);

redisClient.on('error', err => {
    console.log(err)
})
redis.client = redisClient;

module.exports = {
    redis,
    redisClient,
    print,
}