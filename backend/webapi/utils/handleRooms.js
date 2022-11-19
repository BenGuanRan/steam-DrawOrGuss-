function handleRooms(rooms, socket, io) {
    // 创建房间
    socket.on(socket.id + 'createRoom', (masterName) => {
        // 创建房间逻辑
        // 生成房间号（时间戳＋用户姓名）
        const roomID = masterName + new Date().getTime()
        // 并把房间号返回给前端
        // 返回当前房间情况
        const room = [] // 记录当前房间的情况
        room.push({
            userID: socket.id,
            username: masterName,
            ifOver: true,
            ifMaster: true,
        })
        rooms.set(roomID, {
            master: socket, // 房主socket
            room, // 房间基本情况（包括房主）
            users: [socket], // 存放包括房主在内的用户socket对象
            settings: {
                memberLimits: 10,
                timeLimits: 60,
                wordsSource: '流行语'
            }
        })
        // 返回前端房间信息
        socket.emit(socket.id + 'createRoom', {
            roomID, settings: {
                memberLimits: 10,
                timeLimits: 60,
                wordsSource: '流行语'
            }
        }); // 返回房间号
        io.emit(roomID + 'roomMemberHasChanged', {
            memberNums: 1,
            sumNums: 10
        })
        socket.emit(roomID + 'updateRoom', room); // 更新房间状态
        console.log(rooms);
        // 关闭房间
        socket.on(roomID + "closeRoom", res => {
            rooms.delete(roomID)
            console.log(rooms);
            socket.broadcast.emit(roomID + 'roomHasClosed');// 告知除房主以外所有房间内用户房间已经关闭
        })

    });
    // 加入房间
    socket.on(socket.id + 'joinRoom', res => {
        // 根据房间号寻找相应房间
        const room = rooms.get(res.roomID)
        if (!room || room.room.length >= room.settings.memberLimits) {
            // 加入房间失败
            socket.emit(socket.id + 'joinRoomError')
        } else {
            // 加入房间的成功的回调
            console.log(room.room);
            room.room.push({
                userID: socket.id,
                username: res.username,
                ifOver: false,
                ifMaster: false,
            })
            socket.emit(socket.id + 'joinRoomSuccess', { roomID: res.roomID, settings: room.settings }) // 房间加入成功回调
            io.emit(res.roomID + 'updateRoom', room.room);// 更新房间状态
            io.emit(res.roomID + 'roomMemberHasChanged', {
                memberNums: room.room.length,
                sumNums: room.settings.memberLimits
            })
            room.users.push(socket)
        }
        console.log(rooms);
    })
    // 退出房间
    socket.on(socket.id + 'exitRoom', (res) => {
        const r = rooms.get(res.roomID)
        r.room = r.room.filter(i => {
            return i.userID !== res.userID
        })
        r.users = r.users.filter(i => {
            return i.id !== res.userID
        })
        console.log(rooms);
        io.emit(res.roomID + 'updateRoom', r.room);
        io.emit(res.roomID + 'roomMemberHasChanged', {
            memberNums: r.room.length,
            sumNums: r.settings.memberLimits
        })
    })
    // 准备
    socket.on(socket.id + 'prepare', (res) => {
        const r = rooms.get(res.roomID)
        r.room.forEach(i => {
            if (i.userID === res.userID)
                i.ifOver = true
        })
        io.emit(res.roomID + 'updateRoom', r.room)
    })
    // 取消准备
    socket.on(socket.id + 'cancelPrepare', (res) => {
        const r = rooms.get(res.roomID)
        r.room.forEach(i => {
            if (i.userID === res.userID)
                i.ifOver = false
        })
        io.emit(res.roomID + 'updateRoom', r.room)
    })
    // 修改设置
    socket.on(socket.id + 'saveSettings', (res) => {
        const r = rooms.get(res.roomID)
        if (res.userID === r.master.id) {
            r.settings = res.settings
            io.emit(res.roomID + "settingsHasChanged", r.settings)
            io.emit(res.roomID + 'roomMemberHasChanged', {
                memberNums: r.room.length,
                sumNums: r.settings.memberLimits
            })
        }

    })
}

module.exports = { handleRooms }