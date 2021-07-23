/*
 * @Author: xiaohuolong
 * @Date: 2020-06-12 20:48:56
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-19 18:18:55
 * @FilePath: /blog-app/backend/utils/db.tools.js
 */ 
const { Op } = require('Sequelize')
const { Err } = require('../middleware/rest')
const { asyncCatch } = require('./tools')

const areaTool = (areas, where) => {
    areas.forEach(({ start, end, key, equal='' }) => {
        const option = {}
        if(equal) where[key] = equal
        if(!start && !end){
            return where
        }else{
            if(start) option[Op.gte] = start
            if(end) option[Op.lte] = end
            where[key] = option
        }
        return where
    })
}

const orderTool = (orders='', orderType='') => {
    const orderBys = orders.split(',')
    const orderTypes = orderType.split(',')
    if(orderBys.length != orderTypes.length || orderBys.length == 0) return null
    return orderBys.map((order, index) => [order, orderTypes[index]])
}

const attrTool = (attr) => {
    if(attr != '') return attr.split(',')
    return null
}

const pageTool = (no=1, size=20) => {
    if(size == 0) return {}
    size = parseInt(size)
    no = parseInt(no)
    return {
        limit: size, //返回个数
        offset:  (no-1) * size, //起始位置,跳过数量
    }
}
// { id: 1 } => [ 'id', 1 ]
const data2Array = data => {
    const lst = []
    Object.keys(data).forEach(key => {
        lst.push(key, data[key])
    })
    return lst
}

const Cache = async (cacheFn, dbFn, updateCacheFn, ...args) => {
    let cache = await cacheFn(...args)
    if(cache !== false && cache !== null) {
        return cache
    }else{
        cache = await dbFn(...args)
        await updateCacheFn(cache)
        return cache
    }
}
// cache 基础类
class BaseCache {
    constructor(redis, prefix='xhl'){
        this.redis = redis
        this.prefix = `xhl_${prefix}`
        this.setData = this.setData.bind(this)
        this.getData = this.getData.bind(this)
        this.rm = this.rm.bind(this)
    }
    getKey(id){
        return `${this.prefix}${id}`
    }
    error(message='cache error'){
        Err.res({ message })
    }
    async cache(cacheFn, dbFn, updateCacheFn, ...args){
        let cache = await cacheFn(...args)
        if(cache !== false && cache !== null) {
            return cache
        }else{
            cache = await dbFn(...args)
            await updateCacheFn(cache)
            return cache
        }
    }
    async setData(data) {
        if(!data['id']) return false
        const res = await this.redis.set(this.getKey(data['id']), JSON.stringify(data))
        return res
    }
    async getData({ id }){
        if(!id) return false
        const data = await this.redis.get(this.getKey(id))
        console.log(this.getKey(id))
        try {
            return JSON.parse(data)
        } catch (error) {
            return data
        }
    }
    async rm({ id }){
        console.log(id)
        const data = await this.redis.del(this.getKey(id))
        return data
    }
}
// db 基础类
class BaseDB {
    constructor(db){
        this.db = db
        this.find = asyncCatch(this.find.bind(this))
        this.insert = asyncCatch(this.insert.bind(this))
        this.update = asyncCatch(this.update.bind(this))
        this.del = asyncCatch(this.del.bind(this))
        this.select = asyncCatch(this.select.bind(this))
        this.findAll = asyncCatch(this.findAll.bind(this))
    }
    // 数据表基本操作
    async find({ no, size, status, areas=[], sortby='create_time', order='ASC',  attr='' }){
        const attributes = attrTool(attr)
        const orders = orderTool(sortby, order)
        const where = {}
        areaTool(areas, where)
        if(status) where.status = status
        const data = await this.db.findAll({
            where,
            order: orders,
            ...pageTool(no, size),
            attributes, //返回的字段
        })
        return data
    }
    async insert(query){
        console.log(query)
        const data = await this.db.create(query)
        return data
    }
    async update(query, opt){
        const data = await this.db.update(query, opt)
        return data
    }
    async del({ id }){
        const data = await this.db.update({
            'status': '2'
        }, {
            where: { id }
        })
        return data
    }
    async select(where,  attributes){
        const data = await this.db.findOne({
            where,
            attributes,
        })
        return data
    }
    async findAll(...args){
        const data = await this.db.findAll(...args)
        return data
    }
}
module.exports = {
    areaTool,
    pageTool,
    orderTool,
    attrTool,
    data2Array,
    Cache,
    BaseCache,
    BaseDB
}