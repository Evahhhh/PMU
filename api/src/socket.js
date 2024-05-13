const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const fetch = require('node-fetch');

module.exports = function (server) {

    let nombreDePari = 0; // Variable pour suivre le nombre de joueurs ayant parié
    let joueurs = {};

    const io = new Server(server)

    io.on('connection', (socket) => {
        // affiche un message lorsqu'un joueur arrive dans le salon
        socket.on('joinRoom', async (room) => {
            socket.join(room);
            io.to(room).emit('message', `Le joueur ${socket.id} a rejoint la partie "${room}"`);
            console.log(`Le joueur ${socket.id} a rejoint la partie ${room}`);

            // Ajouter le joueur à une liste
            joueurs[socket.id] = { room, nom: socket.id, aParié: false }; // Initialiser le joueur avec le statut "aParié" à false

            // Stocker la salle dans une variable
            socket.room = room;

            try {
                // Faire un appel à la route /api/room/:id pour récupérer l'ID de la salle
                const response = await fetch(`http://localhost:3000/api/room/${room}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération de l\'ID de la salle');
                }
                const roomId = await response.text(); // Récupérer l'ID de la salle sous forme de texte brut
                io.to(room).emit('miseAJourListeJoueurs', Object.values(joueurs).filter(joueur => joueur.room === roomId));
            } catch (error) {
                console.error('Erreur lors de la requête à la route /api/room/:id:', error);
            }
        });

        // Affiche un message lorsqu'un joueur quitte le salon
        socket.on('disconnect', async () => {
            // Supprimer le joueur de la liste des joueurs
            delete joueurs[socket.id];

            // Récupérer la salle à partir de laquelle le joueur se déconnecte
            const room = socket.room;

            // Quitter la salle
            socket.leave(room);
            io.to(room).emit('message', `Le joueur ${socket.id} a quitté la partie "${room}"`);
            console.log(`Le joueur ${socket.id} a quitté la partie ${room}`);

            // Mettre à jour la liste des joueurs dans la salle
            io.to(room).emit('miseAJourListeJoueurs', Object.values(joueurs).filter(joueur => joueur.room === room));
        });


        // affiche un message lorsque l'admin clique sur lancer la partie
        socket.on('lancerPartie', async () => {
            console.log(`La partie va bientôt commencer`);
            try {
                // Effectuer une action via la websocket, par exemple :
                io.emit('message', 'La partie va bientôt commencer'); // Envoyer un message à tous les clients
            } catch (error) {
                console.error('Erreur lors de l\'envoi de données via la websocket :', error);
            }
        });

        // augmente de 1 le nombre de joueur ayant parier sur l'écran de l'admin
        socket.on('parier', async () => {
            // Mettre à jour le drapeau "aParié" du joueur
            joueurs[socket.id].aParié = true;

            // Mettre à jour la liste des joueurs
            io.to(joueurs[socket.id].roomId).emit('miseAJourListeJoueurs', Object.values(joueurs).filter(joueur => joueur.roomId === joueurs[socket.id].roomId));

            // Augmenter le nombre de joueurs ayant parié
            nombreDePari++;
            io.emit('miseAJourNombrePari', nombreDePari);

            // Vérifier si tous les joueurs ont validé leur pari
            const room = joueurs[socket.id].roomId;
            try {
                // Vérifiez si tous les joueurs de la salle ont validé leur pari
                const response1 = await fetch(`http://localhost:3000/api/round/${room}/bet`);
                const response2 = await fetch(`http://localhost:3000/api/room/${room}`);
                const data1 = await response1.json();
                const data2 = await response2.json();

                // Vérifiez si tous les joueurs ont validé leur pari en comparant les données obtenues
                const tousLesJoueursOntParié = data1.some(joueur => joueur.aParié) && data1.length === data2.nombreDeJoueurs;

                // Si tous les joueurs ont validé leur pari, effectuez l'action nécessaire
                if (tousLesJoueursOntParié) {
                    // Faites quelque chose...
                    console.log("Tous les joueurs ont validé leur pari !");
                }
            } catch (error) {
                console.error('Erreur lors de la vérification des paris des joueurs:', error);
            }
        });

        socket.on('retour_carte', (carte) => {
            // Émettre l'événement à tous les autres joueurs
            socket.broadcast.emit('carte_retournee', carte);
            // Appeler un autre WebSocket pour mettre à jour la position du pion en fonction de la couleur de la carte
            io.emit('mettreAJourPositionPion');
        });


        // Lorsque le serveur reçoit un appel pour mettre à jour la position du pion
        let positionCheval = 0;
        socket.on('mettreAJourPositionPion', (nouvellePosition) => {
            positionCheval = nouvellePosition;
            io.broadcast.emit('mettreAJourPosition', (positionCheval));
            io.emit('tableauPartie'(positionCheval));
        });

        //Verif si gagner
        // Lorsque les joueurs reçoivent l'événement avec le tableau de la partie
        socket.on('tableauPartie', async (positionCheval) => {
            // Vérifier s'il y a un cheval gagnant
            socket.round = round;
            try {
                const idPartie = await fetch(`http://localhost:3001/api/round/${round}`); // Supposons que vous avez une fonction pour obtenir l'ID de la partie à partir du tableau de la partie
                const taillTableau = await fetch(`http://localhost:3001/api/round/${idPartie}/duration`);
                if (!taillTableau.ok) {
                    throw new Error('Erreur lors de la récupération de la taille du plateau');
                }

                // Vérifier s'il y a un cheval gagnant en fonction de la taille du plateau
                if (positionCheval == taillTableau) {
                    // S'il y a un cheval gagnant, récupérer les joueurs gagnants
                    const responseJoueurs = await fetch(`http://localhost:3001/api/round/bet/${idPartie}`);
                    if (!responseJoueurs.ok) {
                        throw new Error('Erreur lors de la récupération des joueurs gagnants');
                    }
                    const joueursGagnants = await responseJoueurs.json();

                    // Transmettre les joueurs gagnants à tous les joueurs
                    io.emit('joueursGagnants', joueursGagnants);
                }
            } catch (error) {
                console.error('Erreur lors de la vérification des chevaux gagnants:', error);
            }
        });
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            io.emit('chat message', msg);
        });

        //coté client admin
        socket.broadcast.emit('retourAccueil');
        socket.broadcast.emit('retourRoom');

        //coté client user
        socket.on('retourAccueil', () => {
            // Rediriger les joueurs vers la page d'accueil
            window.location.href = '/';
        });
        socket.on('retourRoom', () => {
            // Rediriger les joueurs vers la page d'accueil
            window.location.href = '/room';
        });

    });
};
