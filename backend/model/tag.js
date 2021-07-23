/*
 * @Author: xiaohuolong
 * @Date: 2020-06-11 11:31:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-17 09:47:09
 * @FilePath: /blog-app/backend/model/tag.js
 */ 
const { dbTag } = require('../db/model/tag')
const { tagCache } = require('../db/cache/tag')
const { BaseModel } = require('../utils/tools')
const { BaseDB } = require('../utils/db.tools.js')

class TagDB extends BaseDB {
    constructor(...arg){
        super(...arg)
    }
}
const db = new TagDB(dbTag)

class TagModel extends BaseModel {
    constructor(...arg){
        super(...arg)
    }
}

const tagModel = new TagModel(db, tagCache)

module.exports = {
    tagModel,
}