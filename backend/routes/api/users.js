/*
 * @Author: xiaohuolong
 * @Date: 2020-06-10 22:41:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-17 16:20:40
 * @FilePath: /blog-app/backend/routes/api/users.js
 */ 
const router = require('koa-router')()
const { usersController: { getList, find, insert, del, update } } = require('../../controller/users')

// GET（SELECT）：从服务器取出资源（一项或多项）
// POST（CREATE）：在服务器新建一个资源
// PUT（UPDATE）：在服务器更新资源（客户端提供完整资源数据）
// PATCH（UPDATE）：在服务器更新资源（客户端提供需要修改的资源数据）
// DELETE（DELETE）：从服务器删除资源

// 获取用户列表
router.get('/', getList)
// 获取用户列表
router.get('/list', getList)
// get 查询用户
router.get('/:id', find)
// post 创建用户
router.post('/', insert)
// delete 删除用户
router.delete('/:id', del)
// put 更新用户信息
router.put('/:id', update)
// patch 更新部分用户信息
router.patch('/:id', update)

module.exports = router
