/*
 * @Author: xiaohuolong
 * @Date: 2020-06-11 11:31:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-19 20:56:51
 * @FilePath: /blog-app/backend/model/category.js
 */ 
const { dbCategory } = require('../db/model/category')
const { categoryCache } = require('../db/cache/category')
const { BaseModel } = require('../utils/tools')
const { BaseDB } = require('../utils/db.tools.js')
const { Err } = require('../middleware/rest')
const Sequelize = require('sequelize');

class CategoryDB extends BaseDB {
    constructor(...arg){
        super(...arg)
    }
}
const db = new CategoryDB(dbCategory)

class CategoryModel extends BaseModel {
    constructor(...arg){
        super(...arg)
    }
    // 获取列表
    async getList (query, ...arg) {
        console.log('CategoryModel')
        const { startTime, endTime, pid } = query
        const [ err, data ] = await this.db.find({
            areas: [{
                start: startTime,
                end: endTime,
                key: 'create_time'
            },
            {
                equal: pid,
                key: 'pid'
            }],
            ...query
        })
        if(err) return Err.req({ message: '查询报错'})
        return data.map(data => this.resp(data.dataValues, ...arg))
    }
    // 获取子类列表
    async getSubList (...arg) {
        console.log('getSubList')
        const [ err, data ] = await this.db.find({ no:0, size:0, status:'0', areas:[], sortby:'id' })
        if(err) return Err.req({ message: '查询报错'})
        const list = data.map(data => this.resp(data.dataValues, ...arg))
        return this.dealList(list)
        // return list
    }
    // 分析列表
    dealList(list){
        console.log(list)
        const category = {}
        let pid = 0
        let level = 0
        let num = 0
        list = list.filter((item, index) => {
            num++
            if(item.pid == pid){
                if(!category[level]) category[level] = {}
                category[level][item.id] = item
                return false
            }
            return true
        })
        console.log(num)
        let lastNum = list.length
        while (list.length){
            if(!category[++level]) category[level] = {}
            lastNum = list.length
            list = list.filter((item, index) => {
                num++
                if(category[level-1][item.pid]){
                    if(!category[level-1][item.pid].child) category[level-1][item.pid].child = []
                    category[level-1][item.pid].child.push(item)
                    category[level][item.id] = item
                    return false
                }
                return true
            })
            if(lastNum == list.length) {
                console.log('break while')
                break
            }
        }
        console.log(num)
        return category
    }
}

const categoryModel = new CategoryModel(db, categoryCache)

module.exports = {
    categoryModel,
}