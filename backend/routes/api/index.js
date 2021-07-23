/*
 * @Author: xiaohuolong
 * @Date: 2020-06-13 11:23:14
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-13 13:32:16
 * @FilePath: /blog-app/backend/routes/api/index.js
 */ 

const router = require('koa-router')()
const fs = require('fs')
const bluebird = require('bluebird')
bluebird.promisifyAll(fs)

const readCallback = (filename, parent='', parentPath='') => {
    const route = require(parent + '/' + filename)
    if(filename === 'index.js') return
    router.use('/api/:vid/'+filename.replace('.js', ''), route.routes(), route.allowedMethods());
}

const readDir = (dir, parent, parentDir='') => {
    fs.readdir(dir, async (err, list) => {
        list.map(async filename => {
            const path = dir+ '/' +filename
            const stat = await fs.statAsync(path)
            if(stat.isDirectory()){
                readDir(path, path, parentDir + '/' + filename)
            }else{
                readCallback(filename, parent, parentDir)
            }
        })
    })
}

readDir(__dirname, __dirname,  '')

module.exports = router
