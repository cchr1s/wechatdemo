const Koa =  require('koa')
const sha1 = require('sha1')

const config = {
    wechat: {
        appID: '',
        appsecret: '',
        token: 'clipperswaschampionthisseason',
    }
}

const app = new Koa()

// 加载认证中间件
// ctx 是 Koa 的应用上下文
// next 是串联中间件的钩子函数
app.use(async (ctx, next) => {
    console.log(ctx.query)
    const {
        signature,
        timestamp,
        nonce,
        echostr
    } = ctx.query

    const token = config.wechat.token
    let str = [token, timestamp, nonce].sort().join('')

    const sha = sha1(str)

    if (sha === signature) {
        ctx.body = echostr
    } else { 
        ctx.body = 'wrong'
    }
})

app.listen(3007)
console.log(`listen on : 3007`)