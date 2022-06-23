const Koa = require('koa')
const Router = require('@koa/router')
const app = new Koa()
const server = require('http').Server(app.callback())
const router = new Router()
const io = require('socket.io')(server, { cors: true }) // 使用socketio
const {startSocket} = require('./utils/startSocket')
app.use(router.routes()).use(router.allowedMethods())

router.get('/', ctx => {
    ctx.body = 'get'
})
router.post('/', ctx => {
    ctx.body = 'post'
})
router.get('/foo', ctx => {
    ctx.body = 'foo get'
})

startSocket(io)

server.listen(3001, () => {
    console.log('listening on *:3001');
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
})

