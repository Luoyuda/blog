/*
 * @Author: xiaohuolong
 * @Date: 2020-06-13 18:05:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-18 09:27:29
 * @FilePath: /blog-app/backend/middleware/login.js
 */ 
//编写token验证中间件
const jwt = require('jsonwebtoken')
const bluebird = require('bluebird')
const verify = bluebird.promisify(jwt.verify)
const unless = require('koa-unless')
const { redisClient } = require('../db/redis')
const secret = "xhl secret";
const { COMMON_CONF: { LOGIN_EXPIRE_TIME, LOGIN_EXPIRE_END_TIME } } = require('../conf/common')

const signToken = async (id, ctx) => {
    let Token = await redisClient.get(`token_${id}`);
    let time = await redisClient.ttl(`token_${Token}`);
    let token = ''
    let liveTime = LOGIN_EXPIRE_TIME / 1000
    if(time > LOGIN_EXPIRE_END_TIME / 1000){
        // 如果签名未过期，返回当前未过期的签名
        token = Token
    }else{
        // 签名过期，新建签名
        token = jwt.sign(
            {
                data: id,
                exp: new Date().getTime() + liveTime * 1000
            },
            secret
        )
        // 写入 redis
        await redisClient.set(`token_${token}`, liveTime, 'EX', liveTime)
        await redisClient.set(`token_${id}`, token, 'EX', liveTime)
    }
    delete ctx.session.uid
    // 设置 session
    ctx.session.uid = id
    // 设置 response headers
    ctx.set('token', token)
    console.log(`time-${liveTime}-uid-${id}`)
    console.log(`-now-token-`)
    console.log(token)
    return token
}

const getToken = async (id, ctx) => {
    return await redisClient.set(`token_${id}`, token, 'EX', liveTime)
}

const checkLogin = async (ctx, next) => {
    const token = ctx.header.token;
    let uid = ''
    // const uid = ctx.session.uid
    // console.log(ctx.session)
    console.log(token)
    try {
        if (!!token) {
            let payload = await verify(token, secret);
            let exp = (payload.exp - new Date().getTime()) / 1000
            uid = payload.data
            let time = await redisClient.ttl(`token_${token}`);
            let Token = await redisClient.get(`token_${uid}`);
            console.log(payload)
            console.log(Token)
            console.log(`
                uid: ${uid}-
                exp: ${exp}-
                time: ${time}
                endTime: ${LOGIN_EXPIRE_TIME}`)
            // 过期后令其失效
            if(time < 0 && exp < -60) return ctx.error.auth()
            // 提取不到uid报错
            if(!uid) return ctx.error.auth()
            // 小于快过期的时间，给一个新的token
            if(exp <= LOGIN_EXPIRE_END_TIME / 1000){
                console.log(`---update-token---`)
                await signToken(uid, ctx)
            }
            await next()
        }else{
            ctx.error.auth()
        }
    } catch (err) {
        if(err.name == 'TokenExpiredError' && uid){
            await signToken(uid, ctx)
            await next()
        }
        ctx.error.err(err)
    }
}
checkLogin.unless = unless
module.exports = {
    signToken,
    getToken,
    checkLogin,
    init: () => {
        return async (ctx, next) => {
            // 写入jwt
            ctx.jwt = {
                signToken,
                getToken,
                checkLogin
            }
            await next()
        }
    }
}