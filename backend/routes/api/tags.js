/*
 * @Author: xiaohuolong
 * @Date: 2020-06-10 22:41:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-17 16:19:10
 * @FilePath: /blog-app/backend/routes/api/tags.js
 */ 
const router = require('koa-router')()
const { tagsController: { getList, find, insert, del, update } } = require('../../controller/tags')

// 获取标签列表
router.get('/', getList)
// 获取标签列表
router.get('/list', getList)
// get 查询标签
router.get('/:id', find)
// post 创建标签
router.post('/', insert)
// delete 删除标签
router.delete('/:id', del)
// put 更新标签信息
router.put('/:id', update)
// patch 更新部分标签信息
router.patch('/:id', update)

module.exports = router
