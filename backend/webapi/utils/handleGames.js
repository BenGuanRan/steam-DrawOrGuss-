const { getWords } = require('./getWords')
function handleGames(rooms, socket, io) {
    // 开始游戏
    socket.on(socket.id + 'startGame', (res) => {
        const r = rooms.get(res.roomID)
        const ifAllOver = r.room.every(i => i.ifOver)
        // 如果有权限则通过
        if (res.userID === r.master.id && r.room.length >= 2 && r.room.length <= r.settings.memberLimits && ifAllOver) {
            r.actionStack = []
            const words = getWords('流行语', r.users.length)
            r.users.forEach((i, index) => {
                // 定义行为栈
                r.actionStack.push([words[index]])
            })

            console.log(r);
            io.emit(res.roomID + 'startGame', { roomInfo: r.room, roomSettings: r.settings, actionStack: r.actionStack })
        } else {
            let msg = ''
            if (res.userID !== r.master.id)
                msg = '您没有此权限！！！'
            else if (!ifAllOver)
                msg = '房间中还有人未准备！'
            else if (r.room.length < 2)
                msg = '房间人数大于等于2才能开启房间！'
            else if (r.room.length > r.settings.memberLimits)
                msg = '房间已超出人数限制！'
            else
                msg = '游戏房间异常！'
            // 禁止开始游戏
            io.emit(socket.id + 'forbidStartGame', msg)
        }

    })
    socket.on(socket.id + 'submitDraw', (res) => {
        // 获取房间
        const r = rooms.get(res.roomID)
        const sumCounts = r.room.length

        // 记录行为栈
        r.actionStack[(Number(res.memberIndex) + Number(res.gameStep) - 2) % sumCounts].push([res.username, res.base64])
        // 统计当前作画总人数
        let drawCounts = 0
        for (let item of r.actionStack) {
            if (item[res.gameStep])
                drawCounts += 1
        }
        io.emit(res.roomID + 'submitDrawSuccess', {
            drawCounts,
            sumCounts,
            actionStack: r.actionStack
        })
        console.log(res.memberIndex, res.gameStep, sumCounts);
        if (drawCounts == sumCounts) {
            if (Number(res.gameStep) < Number(sumCounts))
                io.emit(res.roomID + 'turnToGuss', { actionStack: r.actionStack, sumCounts })
            else {
                io.emit(res.roomID + 'turnToReview', { actionStack: r.actionStack })
                rooms.delete(res.roomID)
            }
        }
    })
    socket.on(socket.id + 'submitWord', (res) => {
        // 获取房间
        const r = rooms.get(res.roomID)
        const sumCounts = r.room.length

        // 记录行为栈
        r.actionStack[(Number(res.memberIndex) + Number(res.gameStep) - 2) % sumCounts].push([res.username, res.gussWord])
        // 统计当前作画总人数
        let drawCounts = 0
        for (let item of r.actionStack) {
            console.log(res.gameStep);
            if (item[Number(res.gameStep)])
                drawCounts += 1
        }
        io.emit(res.roomID + 'submitWordSuccess', {
            drawCounts,
            sumCounts,
            actionStack: r.actionStack
        })
        if (drawCounts == sumCounts) {
            if (Number(res.gameStep) < Number(sumCounts))
                io.emit(res.roomID + 'turnToDraw', { actionStack: r.actionStack, sumCounts })
            else {
                io.emit(res.roomID + 'turnToReview', { actionStack: r.actionStack })
                rooms.delete(res.roomID)
            }

        }
    })
}
module.exports = { handleGames }