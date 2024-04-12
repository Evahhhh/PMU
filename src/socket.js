const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const fetch = require('node-fetch');

module.exports = function (server) {

    const io = new Server(server)

    io.on('connection', (socket) => {
        // affiche un message lorsqu'un joueur arrive dans le salon
        socket.on('joinRoom', async (room) => {
            socket.join(room);
            io.to(room).emit('message', `Le joueur ${socket.id} a rejoint la partie`);
            console.log(`Le joueur ${socket.id} a rejoint la partie`);
            try {
                // Faire un appel de la route /api/room/:id
                const response = await fetch(`http://localhost:3001/api/room/${room}`);
                /* const data = await response.json();
                console.log(data); */
            } catch (error) {
                console.error('Erreur lors de la requête à la route /api/room/:id:', error);
            }
        });
        // affiche un message lorsqu'un joueur quitte le salon
        socket.on('disconnect', () => {
            console.log(`Le joueur ${socket.id} a quitté la partie`);
        });
        // affiche une popup lorsque l'utilisateur clique sur lancer paris

        socket.on('lancerParis', (data) => {
            console.log(`Le joueur ${socket.id} a lancé les paris dans la salle ${data.room}`);
            io.to(data.room).emit('showpopup', data.message);
        });
    });
};
