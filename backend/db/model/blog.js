/*
 * @Author: xiaohuolong
 * @Date: 2020-06-14 22:25:11
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-14 22:40:26
 * @FilePath: /blog-app/backend/db/model/blog.js
 */ 
const { defineModel } = require('../mysql')
const Sequelize = require('sequelize');

const dbBlog = defineModel('blog', {
    title: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
    },
    tag_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
    },
    category_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
})
dbBlog.sync({
    // force: true  // 强制同步，先删除表，然后新建
});

module.exports = {
    dbBlog
}