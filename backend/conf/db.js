/*
 * @Author: xiaohuolong
 * @Date: 2020-06-10 22:57:17
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-12 15:47:39
 * @FilePath: /blog-app/backend/conf/db.js
 */ 
const env = process.env.NODE_ENV   //环境变量
console.log(env)
let MYSQL_CONF
let REDIS_CONF

if (env === 'test') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'blog'
    }
    REDIS_CONF = {
        port: 6380,
        host: 'localhost',
        password: ''
    }
}

if (env === 'dev') {
    MYSQL_CONF = {
    }
    REDIS_CONF = {
    }
}

if (env === 'production') {
    MYSQL_CONF = {
        
    }
    REDIS_CONF = {

    }
}
module.exports = {
    MYSQL_CONF,
    REDIS_CONF,
}