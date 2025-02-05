import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager.js';

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager()

wss.on('connection', function connection(ws) {
  ws.on('error', console.error)
  gameManager.addUser(ws)
  gameManager.activeUser()
  ws.on("disconnect", () => {
    gameManager.removeUser(ws)
  })  
});

