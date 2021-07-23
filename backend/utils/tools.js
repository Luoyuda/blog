/*
 * @Author: xiaohuolong
 * @Date: 2020-06-11 12:13:24
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-19 18:21:00
 * @FilePath: /blog-app/backend/utils/tools.js
 */ 
const { Err } = require('../middleware/rest')

// try catch async function
const asyncCatch = (fn) => {
    return async (...args) => {
        try {
            let res = await fn(...args)
            return [null, res]
        } catch (error) {
            return [error, null]
        }
    }
}
// option[key] = asyncCatch(option[key])
const asyncCatchAll = (option) => {
    Object.keys(option).forEach(key => {
        let fn = option[key]
        if(Object.prototype.toString.call(fn).indexOf('AsyncFunction') > -1){
            option[key] = asyncCatch(fn)
        }
    })
}
// catch => api
const apiCatch = (fn) => {
    return (...args) => {
        try {
            return fn(...args)
        }catch (error){
            return Err.req({ message: error.message })
        }
    }
}
// BaseModel
class BaseModel {
    constructor(db, cache){
        this.db = db
        this.cache = cache
        this.getByDb = this.getByDb.bind(this)
    }
    // 获取用户信息(查数据库)
    async getByDb(where, attributes){
        console.log(where, attributes)
        const [ err, data ] = await this.db.select(where, attributes)
        if(err) return Err.req({ message: '查询报错'})
        let target = data && data.dataValues
        if(!target) {
            target = { status:2, empty: 1, ...where }
        }
        return target
    }
    // 获取列表
    async getList (query, ...arg) {
        const { startTime, endTime, } = query
        const [ err, data ] = await this.db.find({
            areas: [{
                start: startTime,
                end: endTime,
                key: 'create_time'
            }],
            ...query
        })
        if(err) return Err.req({ message: '查询报错'})
        return data.map(data => this.resp(data.dataValues, ...arg))
    }
    async getResp(where, attributes, ...arg){
        return this.resp(
            await this.cache.cache(this.cache.getData, this.getByDb, this.cache.setData, where, attributes),
            ...arg
        )
    }
    // 更新用户
    async update(query, id, opt) {
        const [err, data] = await this.db.update(query, opt)
        if(err) return Err.req({ message: '更新报错'})
        const target = await this.getByDb({ id })
        this.cache.setData(target)
        return target
    }
    async del(...arg){
        const [ err, data ] = await this.db.del(...arg)
        if(err) return Err.req({ message: '删除报错'})
        this.cache.rm(...arg)
        return data
    }
    // 增加用户
    async insert(query, ...arg) {
        const [err, data] = await this.db.insert(query)
        if(err) return Err.req({ message: '插入报错'})
        const target = this.resp(data.dataValues, ...arg)
        this.cache.setData(target)
        return target
    }
    // 格式化用户信息
    resp(data, filter=['password'], formats=[]){
        const res = { ...data }
        filter.forEach(key => {
            if(res[key]) delete res[key]
        })
        formats.forEach(({ key, fn }) => {
            if(!res[key]) return
            res[key] = fn(res[key])
        })
        return res
    }
}
module.exports = {
    asyncCatchAll,
    asyncCatch,
    apiCatch,
    BaseModel
}