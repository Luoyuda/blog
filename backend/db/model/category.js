/*
 * @Author: xiaohuolong
 * @Date: 2020-06-14 22:21:36
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-19 18:07:09
 * @FilePath: /blog-app/backend/db/model/category.js
 */ 
const { defineModel } = require('../mysql')
const Sequelize = require('sequelize');

const dbCategory = defineModel('category', {
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
    },
    pid: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
    },
})
dbCategory.sync({
    // force: true  // 强制同步，先删除表，然后新建
});

// (async()=>{
//     console.log(await dbCategory.findAll(
//         {
//             include: [{
//                 model: dbCategory,
//                 as: 'c2',
//                 where: { pid: Sequelize.col('category.id') },
//                 attributes: [
//                     ['name', 'name'],
//                 ],
//             }],
//             attributes: [
//                 ['name', 'name'],
//             ],
//             raw:true
//         }
//     ))
// })()
module.exports = {
    dbCategory
}