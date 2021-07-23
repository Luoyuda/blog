/*
 * @Author: xiaohuolong
 * @Date: 2020-06-11 18:41:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-18 09:26:12
 * @FilePath: /blog-app/backend/middleware/rest.js
 */ 
const Errors = {
    auth: {
        code: 51,
        message: '用户鉴权失败'
    },
    req: {
        code: 400,
        message: '请求参数报错'
    },
    res: {
        code: 500,
        message: '系统繁忙'
    },
    err: {
        
    }
}

const Err = {}
Object.keys(Errors).forEach(key => {
    const { code: baseCode, message: baseMessage } = Errors[key]
    Err[`${key}`] = (error = {}) => {
        return (({ code = baseCode, message = baseMessage }) => {
            throw {
                code,
                message
            }
        })(error)
    }
})
module.exports = {
    Err,
    restify: (pathPrefix) => {
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next) => {
            console.log(pathPrefix)
            console.log(ctx.request.path)
            console.log(ctx.request.path.startsWith(pathPrefix))
            // 绑定rest()方法:
            ctx.rest = (data) => {
                ctx.response.type = 'application/json';
                ctx.response.body = data;
            }
            ctx.error = Err
            if (ctx.request.path.startsWith(pathPrefix)) {
                try {
                    await next();
                } catch (e) {
                    // console.log(e)
                    // 返回错误:
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: e.code || 'internal:unknown_error',
                        message: e.message || ''
                    };
                }
            } else {
                try {
                    await next();
                } catch (e) {
                    // console.log(e)
                    // 返回错误:
                    ctx.response.status = 401;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: e.code || 'internal:unknown_error',
                        message: e.message || ''
                    }
                }
            }
        };
    }
};