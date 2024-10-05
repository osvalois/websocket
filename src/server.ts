import { serve } from 'bun';
import { join } from 'path';
import { handleWebSocket } from './websocket';
import { handleHTTP } from './http';
import { ClientManager } from './clientManager';

const port = process.env.PORT || 3000;
const clientManager = new ClientManager();

const server = serve({
  port: port,
  fetch(req, server) {
    const url = new URL(req.url);
    
    if (server.upgrade(req)) {
      return; // Conexión actualizada a WebSocket
    }
    
    return handleHTTP(req, url, clientManager);
  },
  websocket: {
    open: (ws) => handleWebSocket.open(ws, clientManager),
    message: (ws, message) => handleWebSocket.message(ws, message, clientManager),
    close: (ws) => handleWebSocket.close(ws, clientManager),
  },
});

console.log(`Servidor ejecutándose en http://localhost:${port}`);