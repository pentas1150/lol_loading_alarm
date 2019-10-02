const SocketIO = require('socket.io');
const LOL_api = require('./lol_api/api');
require('dotenv').config();

module.exports = (server) => {
    const io = SocketIO(server, { path: '/socket.io' });

    io.on('connection', (socket) => {
        const req = socket.request;
        console.log(`새로운 클라이언트 접속 : ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`클라이언트 접속 해제 : ${socket.id}`);
        });
        socket.on('error', (error) => {
            console.log(error);
        });
        socket.on('summoner', async(data) => {
            let msg;
            console.log(data);
            const result = await LOL_api(data);

            if(typeof result === 'undefined') {
                msg='게임 중이 아닙니다.';
            } else if(result.data.gameLength!=='0') {
                msg='게임 중입니다.';
            } else {
                msg='로딩 중입니다.';
            }

            socket.emit('reply', msg);
        });
    });
};