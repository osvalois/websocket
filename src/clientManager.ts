import { WebSocket } from 'bun';

export class ClientManager {
  private clients: Set<WebSocket> = new Set();

  addClient(ws: WebSocket): void {
    this.clients.add(ws);
  }

  removeClient(ws: WebSocket): void {
    this.clients.delete(ws);
  }

  broadcastMessage(message: string): void {
    for (const client of this.clients) {
      client.send(message);
    }
  }
}