const { handelRooms } = require("./handleRooms");


function startSocket(io) {
    const rooms = new Map() // 记录现存的房间
    // 有用户连接
    io.on('connection', (socket) => {
        // 用户上线逻辑
        console.log(socket.id + ' connected');
        io.emit('connection', socket.id)
        handelRooms(rooms, socket, io)
        // 检测用户断开
        socket.on('disconnect', function () {
            console.log(socket.id + ' disconnected');
        });

    });
}

module.exports = { startSocket }