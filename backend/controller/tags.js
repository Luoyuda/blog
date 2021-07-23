/*
 * @Author: xiaohuolong
 * @Date: 2020-06-11 11:34:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-17 18:05:24
 * @FilePath: /blog-app/backend/controller/tags.js
 */ 
const { tagModel } = require('../model/tag')
const { tagFilter } = require('../filter/input')

class TagsController {
    constructor(model){
        this.model = model
        this.getList = this.getList.bind(this)
        this.insert = this.insert.bind(this)
        this.update = this.update.bind(this)
        this.del = this.del.bind(this)
        this.find = this.find.bind(this)
    }
    async getList(ctx, next) {
        const list = await this.model.getList(ctx.query)
        ctx.rest({ list })
    }
    async insert(ctx, next) {
        tagFilter(ctx)
        const data = await this.model.insert({
            name: ctx.vals.name,
            sort: ctx.vals.sort,
            create_time: new Date().getTime(),
            update_time: new Date().getTime(),
        })
        ctx.rest(data)
    }
    async update(ctx, next) {
        const id = ctx.params.id
        const body = ctx.request.body
        if(id <= 0) return ctx.error.req()
        tagFilter(ctx)
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
const tagsController = new TagsController(tagModel)

module.exports = {
    tagsController,
}