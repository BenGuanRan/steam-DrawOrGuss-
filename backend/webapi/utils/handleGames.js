const { getWords } = require('./getWords')
function handleGames(rooms, socket, io) {
    // 开始游戏
    socket.on(socket.id + 'startGame', (res) => {
        const r = rooms.get(res.roomID)
        const ifAllOver = r.room.every(i => i.ifOver)
        // 如果有权限则通过
        if (res.userID === r.master.id && r.room.length >= 4 && r.room.length <= r.settings.memberLimits && ifAllOver) {
            io.emit(res.roomID + 'startGame', { roomInfo: r.room, roomSettings: r.settings })
        } else {
            let msg = ''
            if (res.userID !== r.master.id)
                msg = '您没有此权限！！！'
            else if (!ifAllOver)
                msg = '房间中还有人未准备！'
            else if (r.room.length < 4)
                msg = '房间人数大于等于4才能开启房间！'
            else if (r.room.length > r.settings.memberLimits)
                msg = '房间已超出人数限制！'
            else
                msg = '游戏房间异常！'
            // 禁止开始游戏
            io.emit(socket.id + 'forbidStartGame', msg)
        }

    })
}
module.exports = { handleGames }