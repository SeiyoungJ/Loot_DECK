const socket = io();

const form = document.querySelector('form');
const createGameButton = document.querySelector('#create-game');

let roomId;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const gameCode = event.target['game-code'].value;
  socket.emit('join game', gameCode);
});

createGameButton.addEventListener('click', () => {
  socket.emit('create game');
});

socket.on('game created', (roomId) => {
  console.log(`Game created with code ${roomId}`);
  window.location.href = `/game.html?room=${roomId}`;
});

socket.on('game joined', (roomId) => {
  console.log(`Joined game with code ${roomId}`);
  window.location.href = `/game.html?room=${roomId}`;
});

socket.on('invalid code', () => {
  alert('Invalid game code');
});

socket.on('player joined', (players) => {
  console.log('Player joined:', players);
});

socket.on('player left', (players) => {
  console.log('Player left:', players);
});

socket.on('room ready', () => {
  console.log('Room is ready');
  roomReadyButton.disabled = true;
});

socket.on('start game', () => {
  console.log('Starting game');
  // TODO: Add logic to start the game
});

const queryParams = new URLSearchParams(window.location.search);
if (queryParams.has('room')) {
  roomId = queryParams.get('room');
  socket.emit('join game', roomId);
}