/*
 * @Author: xiaohuolong
 * @Date: 2020-06-11 11:31:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-17 09:41:07
 * @FilePath: /blog-app/backend/model/user.js
 */ 
const { dbUser } = require('../db/model/user')
const { dbTag } = require('../db/model/tag')
const { dbComment } = require('../db/model/comment')
const { dbCateGory } = require('../db/model/category')
const { dbBlog } = require('../db/model/blog')
const { userCache } = require('../db/cache/user')
const { BaseModel } = require('../utils/tools')
const { BaseDB } = require('../utils/db.tools.js')

class UserDB extends BaseDB {
    constructor(...arg){
        super(...arg)
    }
}
const db = new UserDB(dbUser)

class UserModel extends BaseModel {
    constructor(...arg){
        super(...arg)
    }
}

const userModel = new UserModel(db, userCache)

module.exports = {
    userModel,
}