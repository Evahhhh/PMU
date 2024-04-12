const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

module.exports = function (server) {

    const io = new Server(server)

    io.on('connection', (socket) => {
        // affiche un message lorsqu'un joueur arrive dans le salon
        socket.on('joinRoom', (room) => {
            socket.join(room);
            io.to(room).emit('message', `Le joueur ${socket.id} a rejoint la partie`);
            console.log(`Le joueur ${socket.id} a rejoint la partie`);
        });
        // affiche un message lorsqu'un joueur quitte le salon
        socket.on('leaveRoom', (room) => {
            socket.leave(room);
            io.to(room).emit('message', `Le joueur ${socket.id} a quitté la partie`);
            console.log(`Le joueur ${socket.id} a quitté la salle`);
        });
        // affiche une popup lorsque l'utilisatuer clique sur lancer paris
        socket.on('lancerParis', (data) => {
            socket.on(data.room).emit('showpopup', data.message);
        });
    });
};