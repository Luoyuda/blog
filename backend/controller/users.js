/*
 * @Author: xiaohuolong
 * @Date: 2020-06-11 11:34:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-17 20:47:52
 * @FilePath: /blog-app/backend/controller/users.js
 */ 
const { userModel } = require('../model/user')
const { userFilter } = require('../filter/input')

class UsersController {
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
        userFilter(ctx)
        const data = await this.model.insert({
            email: ctx.vals.email,
            name: ctx.vals.name,
            password: ctx.vals.password,
            info: ctx.request.body.info,
            pic: ctx.request.body.pic,
            gender: ctx.request.body.gender,
            create_time: new Date().getTime(),
            update_time: new Date().getTime(),
        })
        ctx.rest(data)
    }
    async update(ctx, next) {
        const id = ctx.params.id
        const body = ctx.request.body
        if(id <= 0) return ctx.error.req()
        userFilter(ctx, Object.keys(body))
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
const usersController = new UsersController(userModel)

module.exports = {
    usersController,
}