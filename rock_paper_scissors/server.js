const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const moniker = require('moniker');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');

// Palvelin näyttää index-sivun
app.get('/', (req, res) => {
    res.render('index');
});

let players = {};

function roundWinner(move1, move2) {
    if (move1 === move2) return 0;
    if (
        (move1 === 'rock' && move2 === 'scissors') ||
        (move1 === 'scissors' && move2 === 'paperi') ||
        (move1 === 'paper' && move2 === 'rock')
    ) {
        return move1;
    }
    return move2;
}

function gameWinner1(player1, player2) {
    if (player1.wins === 3) {
        return player1.name;
    } else if (player2.wins === 3) {
        return player2.name;
    } else {
        return null;
    }
}

io.sockets.on('connection', (socket) => {
    const user = moniker.choose();

    // tallennetaan pelaajan tiedot
    players[socket.id] = { name: user, move: null, wins: 0 };

    socket.emit('player', user);

    socket.on('makeMove', (move) => {
        players[socket.id].move = move;

        // Kuinka monta pelaajaa on tehnyt liikkeen
        let activePlayers = Object.values(players).filter(
            (p) => p.move !== null
        );

        if (activePlayers.length === 2) {
            let winnerMove = roundWinner(
                activePlayers[0].move,
                activePlayers[1].move
            );
            let result = {
                player1: activePlayers[0],
                player2: activePlayers[1],
                winner: null,
            };

            if (winnerMove === 0) {
                result.winner = 'Draw!';
            } else {
                let winner = activePlayers.find((p) => p.move === winnerMove);
                winner.wins += 1;
                result.winner = winner.name;
            }

            io.sockets.emit('roundResult', result);

            // Tarkistetaan, onko joku voittanut pelin
            let gameWinner = gameWinner1(activePlayers[0], activePlayers[1]);
            if (gameWinner) {
                io.sockets.emit('gameWinner', gameWinner); // Lähetetään voittaja kaikille
            }

            Object.values(players).forEach((p) => (p.move = null));
        }
    });
});

server.listen(3000, () => {
    console.log('Palvelin käynnissä portissa 3000');
});
