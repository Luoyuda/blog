

const { apiCatch } = require('../utils/tools.js')
const userFields = {
    'name': (ctx) => {
        ctx.validateBody("name")
        .required("用户名为空")
        .isString()
        .trim()
        .isLength(6, 16, "用户名长度为6~16位")
        return userFields
    },
    'password': (ctx) => {
        ctx.validateBody("password")
        .required("密码为空")
        .isString()
        .trim()
        .isLength(6, 16, "密码长度为6~16位")
        return userFields
    },
    'email': (ctx) => {
        ctx.validateBody('email')
        .required("email 不能为空")
        .isString()
        .trim()
        .isEmail('email 格式不对')
        return userFields
    },
    'password2': (ctx) => {
        ctx.validateBody('password2')
        .required('Password confirmation required')
        .isString()
        .eq(ctx.vals.password, '两次密码不一致')
        return userFields
    }
}

const tagFields = {
    'name': (ctx) => {
        ctx.validateBody("name")
        .required("标签名为空")
        .isString()
        .trim()
        .isLength(0, 16, "标签名长度为0~16位")
        return tagFields
    },
    'sort': (ctx) => {
        ctx.validateBody("sort")
        .required("排序值为空")
        .trim()
        return tagFields
    },
}

const categoryFields = {
    'name': (ctx) => {
        ctx.validateBody("name")
        .required("分类名为空")
        .isString()
        .trim()
        .isLength(0, 16, "标签名长度为0~16位")
        return categoryFields
    },
    'pid': (ctx) => {
        ctx.validateBody("pid")
        .required("父id为空")
        .trim()
        return categoryFields
    },
}

const inputFilter = (ctx, fields, filters=[]) => {
    filters.forEach(key => {
        let fn = () => {}
        if(typeof key === 'string') {
            if(typeof fields[key] === 'function') fn = fields[key]
        }else if(typeof key === 'function'){
            fn = key
        }
        apiCatch(fn)(ctx)
    })
    return ctx
}

const userFilter = (ctx, filters=['name', 'email', 'password', 'password2']) => {
    inputFilter(ctx, userFields, filters)
    return ctx
}

const tagFilter = (ctx, filters=['name', 'sort']) => {
    inputFilter(ctx, tagFields, filters)
    return ctx
}

const categoryFilter = (ctx, filters=['name', 'pid']) => {
    inputFilter(ctx, categoryFields, filters)
    return ctx
}

module.exports = {
    userFilter,
    tagFilter,
    categoryFilter
}