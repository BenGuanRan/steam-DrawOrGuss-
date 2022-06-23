function handelRooms(rooms, socket, io) {
    // 创建房间
    socket.on(socket.id + 'createRoom', (masterName) => {
        // 创建房间逻辑
        // 生成房间号（时间戳＋用户姓名）
        const roomID = masterName + new Date().getTime()
        // 并把房间号返回给前端
        // 返回当前房间情况
        const room = [] // 记录当前房间的情况
        room.push({
            username: masterName,
            ifOver: true,
            ifMaster: true,
        })
        rooms.set(roomID, {
            masterName: socket, // 房主socket
            room, // 房间基本情况（包括房主）
            users: [socket], // 存放包括房主在内的用户socket对象
        })
        // 返回前端房间信息
        socket.emit(socket.id + 'createRoom', roomID); // 返回房间号
        socket.emit(roomID + 'updateRoom', room); // 更新房间状态
        console.log(rooms);
        // 关闭房间
        socket.on(roomID + "closeRoom", res => {
            rooms.delete(roomID)
            console.log(rooms);
        })
    });

}

module.exports = { handelRooms }