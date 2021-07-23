/*
 * @Author: xiaohuolong
 * @Date: 2020-06-14 22:33:50
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-14 22:38:02
 * @FilePath: /blog-app/backend/db/model/comment.js
 */ 
const { defineModel } = require('../mysql')
const Sequelize = require('sequelize');

const dbComment = defineModel('comment', {
    user_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
    },
    p_id:{
        type: Sequelize.INTEGER(10),
        allowNull: false,
    },
    content: {
        type: Sequelize.STRING(2550),
        allowNull: false,
    },
})
dbComment.sync({
    // force: true  // 强制同步，先删除表，然后新建
});

module.exports = {
    dbComment
}