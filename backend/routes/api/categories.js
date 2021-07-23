/*
 * @Author: xiaohuolong
 * @Date: 2020-06-10 22:41:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-18 23:58:22
 * @FilePath: /blog-app/backend/routes/api/categories.js
 */ 
const router = require('koa-router')()
const { categoriesController: { getList, find, insert, del, update, getSubList } } = require('../../controller/categories')

// 获取分类列表
router.get('/', getList)
// 获取分类列表
router.get('/list', getList)
// 获取子类列表
router.get('/getSubList', getSubList)
// get 查询分类
router.get('/:id', find)
// post 创建分类
router.post('/', insert)
// delete 删除分类
router.delete('/:id', del)
// put 更新分类信息
router.put('/:id', update)
// patch 更新部分分类信息
router.patch('/:id', update)

module.exports = router
