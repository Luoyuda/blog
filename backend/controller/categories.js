/*
 * @Author: xiaohuolong
 * @Date: 2020-06-11 11:34:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-19 18:21:28
 * @FilePath: /blog-app/backend/controller/categories.js
 */ 
const { categoryModel } = require('../model/category')
const { categoryFilter } = require('../filter/input')

class CategoriesController {
    constructor(model){
        this.model = model
        this.getList = this.getList.bind(this)
        this.insert = this.insert.bind(this)
        this.update = this.update.bind(this)
        this.del = this.del.bind(this)
        this.find = this.find.bind(this)
        this.getSubList = this.getSubList.bind(this)
    }
    async getList(ctx, next) {
        const list = await this.model.getList(ctx.query)
        ctx.rest({ list })
    }
    async getSubList(ctx, next){
        const list = await this.model.getSubList()
        ctx.rest({ list })
    }
    async insert(ctx, next) {
        categoryFilter(ctx)
        const data = await this.model.insert({
            name: ctx.vals.name,
            pid: ctx.vals.pid,
            create_time: new Date().getTime(),
            update_time: new Date().getTime(),
        })
        ctx.rest(data)
    }
    async update(ctx, next) {
        const id = ctx.params.id
        const body = ctx.request.body
        if(id <= 0) return ctx.error.req()
        categoryFilter(ctx)
        const data = await this.model.update({
            ...body,
            ...ctx.vals,
            update_time: new Date().getTime(),
        }, id, {
            where: { id }
        })
        ctx.rest(data)
    }
    async del(ctx, next){
        const id = ctx.params.id
        if(id <= 0) return ctx.error.req()
        const data = await this.model.del({ id })
        ctx.rest({ ok: data[0] })
    }
    async find(ctx, next){
        const id = ctx.params.id
        if(id <= 0) return ctx.error.req()
        const data = await this.model.getResp({ id })
        ctx.rest(data)
    }
}
const categoriesController = new CategoriesController(categoryModel)

module.exports = {
    categoriesController,
}