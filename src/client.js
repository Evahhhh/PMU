const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001'); // Assurez-vous de modifier l'URL en fonction de votre configuration

// Rejoindre une salle lorsqu'une connexion est établie
socket.on('connect', () => {
    console.log('Connecté au serveur Socket.IO');

    // Envoyer un événement 'joinRoom' avec le nom de la salle
    socket.emit('joinRoom', 'test');
});

// Écouter les messages du serveur
socket.on('message', (message) => {
    console.log('Message du serveur:', message);
});

// Gérer l'événement 'showpopup'
socket.on('showpopup', (data) => {
    console.log('Popup affichée:', data);
});

// Gérer les erreurs de connexion
socket.on('connect_error', (error) => {
    console.error('Erreur de connexion au serveur Socket.IO:', error);
});

// Déclencher l'événement 'lancerParis' avec les données appropriées
socket.emit('lancerParis', { room: 'room', message: 'Le joueur a lancé les paris' });