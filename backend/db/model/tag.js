/*
 * @Author: xiaohuolong
 * @Date: 2020-06-14 22:23:02
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-17 09:56:29
 * @FilePath: /blog-app/backend/db/model/tag.js
 */ 
const { defineModel } = require('../mysql')
const Sequelize = require('sequelize');

const dbTag = defineModel('tag', {
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
    },
    sort: {
        type: Sequelize.STRING(255),
        allowNull: false,
        // unique: true,
    },
})
dbTag.sync({
    // force: true  // 强制同步，先删除表，然后新建
});

module.exports = {
    dbTag
}