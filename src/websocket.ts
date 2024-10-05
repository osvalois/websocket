import { WebSocket } from 'bun';
import { ClientManager } from './clientManager';

export const handleWebSocket = {
  open(ws: WebSocket, clientManager: ClientManager): void {
    clientManager.addClient(ws);
  },

  message(ws: WebSocket, message: string, clientManager: ClientManager): void {
    console.log('Mensaje recibido:', message);
    clientManager.broadcastMessage(message);
  },

  close(ws: WebSocket, clientManager: ClientManager): void {
    clientManager.removeClient(ws);
  },
};